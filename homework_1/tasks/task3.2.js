console.log('task2');

import csvtojsonV2 from 'csvtojson';
import pathUtil from 'path';

const csvFilePath = pathUtil.join(__dirname, '.csv/node_mentoring_t1_2_input_example.csv');
const outputFilePath = pathUtil.join(__dirname, '/output/', `${pathUtil.parse(csvFilePath).name}.txt`);

import fileUtil from 'fs';

const readStream = fileUtil.createReadStream(csvFilePath);
const writeStream = fileUtil.createWriteStream(outputFilePath);

readStream.on('error', (err) => {
 if (err.code === 'ENOENT') {
	 console.log(`File No found on path ${csvFilePath}`);
 } else {
	 console.log(err);
 }
});

writeStream.on('error', (err) => {
	console.log('Errors occurred while writing a file');
	console.log(err);
});

readStream.pipe(csvtojsonV2()).pipe(writeStream);

readStream.on('end', () => {
	console.log('Convertation is succesfull');
	console.log(`Result saved by path: ${outputFilePath}`);
});