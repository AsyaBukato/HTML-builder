// const { readdir } = require("fs/promises");
const path = require('node:path');
const fs = require('fs');

const srcDir = path.join(__dirname, 'styles');
const destFile = path.join(__dirname, 'project-dist', 'bundle.css');

let result = [];
fs.promises.readdir(srcDir, {withFileTypes: true})
  .then(filenames => {
    for (let filename of filenames) {
      const extName = path.extname(filename.name);
      if (filename.isFile() && extName === '.css') {
          // const extName = path.extname(filename.name);
          // const fileName = path.basename(filename.name, extName);
          console.log(filename.name);
          const srcFilePath = path.join(srcDir, filename.name);
          // console.log(srcFilePath)
          // fs.promises.createReadStream
          const readableStream = fs.createReadStream(srcFilePath, 'utf8');

          readableStream.on('error', function (error) {
            console.log(`error: ${error.message}`);
          })

          readableStream.on('data', (chunk) => {
            // console.log(chunk);
            // result.push(chunk);
            const writableStream = fs.createWriteStream(destFile);

            writableStream.on('error',  (error) => {
              console.log(`An error occured while writing to the file. Error: ${error.message}`);
              process.exit(0);
            });

            // writableStream.write(result.join('\n'));
            writableStream.write(chunk + '\n');
            writableStream.end();
            writableStream.on('finish', () => {
              console.log(`All styles have been written to ${destFile}`);
            })
          })
      }
    }
    
  })
  .catch(err => {
    console.log(err)
  })