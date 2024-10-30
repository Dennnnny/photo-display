const fs = require('fs');
const process = require('process');
const path = require('path');
const glob = require("glob")
const sharp = require('sharp');

const dir = process.argv[2];

const input_path = path.join(dir, 'images', '*.jpg');
const output_path = path.join(dir, "blur");


glob(input_path, function (err, files) {
  if (err != null) { throw err; }
  fs.mkdirSync(output_path, { recursive: true });
  files.forEach(function (inputFile) {
    sharp(inputFile)
      .jpeg({ mozjpeg: true, quality: 30, force: true })
      .toFile(path.join(output_path, path.basename(inputFile, path.extname(inputFile)) + '.jpg'), (err, info) => {
        console.log(`clone ${inputFile} finish.`)
      });
  });
});