const fs = require('fs');
const path = require('node:path');

function read(filePath) {
  const readableStream = fs.createReadStream(filePath, 'utf8');

  readableStream.on('error', function (error) {
    console.log(`error: ${error.message}`);
  })

  readableStream.on('data', (chunk) => {
    console.log(chunk);
  })
}

read(path.join(__dirname, 'text.txt'))
