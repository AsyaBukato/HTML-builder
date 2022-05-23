const { readdir } = require("fs/promises");
const path = require('node:path');
const fs = require('fs');

readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
  .then(filenames => {
    for (let filename of filenames) {
      if (filename.isFile()){
        let file_fd = fs.openSync(path.join(__dirname, 'secret-folder', filename.name), 'r');
        fs.fstat(file_fd, (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
            const extName = path.extname(filename.name);
            const fileName = path.basename(filename.name, extName);
            console.log(`${fileName} - ${extName.replace(/\./g, '')} - ${stats.size}b`);
          }
        });
      }
    }
  })
  .catch(err => {
    console.log(err)
  })
