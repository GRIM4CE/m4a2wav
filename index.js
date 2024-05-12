const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Input and output directories
const inputDir = './src';
const outputDir = './dist';

// Read files from the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(`Error reading input directory: ${err}`);
    return;
  }

  // Filter out only M4A files
  const m4aFiles = files.filter(file => path.extname(file).toLowerCase() === '.m4a');

  // Convert each M4A file to WAV
  m4aFiles.forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, path.parse(file).name + '.wav');
    const command = `ffmpeg -i "${inputFilePath}" "${outputFilePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting file ${file}: ${error}`);
        return;
      }
      console.log(`File ${file} converted successfully`);
    });
  });
});