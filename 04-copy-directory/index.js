const fs = require('fs');
const path = require('node:path');

function copyDir(srcDir) {
  const destDir = path.join(__dirname, `${srcDir}-copy`);
  srcDir = path.join(__dirname, srcDir);

  fs.promises.rm(destDir, {recursive: true, force: true})
    .then(() => {
      fs.promises.mkdir(destDir, {recursive: true})
        .then(() => {
          console.log(`Directory has been successfully created.`);
          fs.promises.readdir(srcDir)
            .then(filenames => {
              for (let filename of filenames) {
                const srcFilePath = path.join(srcDir, filename);
                const destFilePath = path.join(destDir, filename);
                fs.promises.copyFile(srcFilePath, destFilePath)
                  .then(() => {
                    console.log(`File ${filename} has been successfully copied.`)
                  })
                  .catch(err => {
                    console.log(`Cannot copy file ${filename} with error:`, err)
                  })
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log('Cannot create directory with error', err)
        })
    })
    .catch(err => {
      console.log('Cannot remove directory with error', err)
    })
}

copyDir('files')