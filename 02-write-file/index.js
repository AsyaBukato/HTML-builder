const fs = require('fs');
const readline = require('readline');

function write(filePath) {
  const writableStream = fs.createWriteStream(filePath);

  writableStream.on('error',  (error) => {
    console.log(`An error occured while writing to the file. Error: ${error.message}`);
    process.exit(0);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a sentence: '
  });

  rl.prompt();
    
  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'exit':
          rl.close();
          break;
      default:
          writableStream.write(line + '\n');
          rl.prompt();
          break;
    }
  }).on('close', () => {
    writableStream.end();
    writableStream.on('finish', () => {
      console.log(`All your sentences have been written to ${filePath}`);
    })
  });
}

write('test.txt')
