const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('data-sentiment-analysis-training-data.csv')
  .pipe(csv())
  .on('data', results.push)
  .on('end', () => {
    console.log(results);
  });