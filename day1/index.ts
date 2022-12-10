import * as fs from 'fs';
import * as path from 'path';

const getData = () => {
  fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', (err, data) => {
    if(err) {
      console.log(err)
      return;
    }
    // console.log(data);

    const split = data.split('\n');

    const loads: number[] = [];
    let currentSum = 0;

    split.forEach(line => {
      if(line !== '') {
        currentSum += parseInt(line, 10);
      } else {
        loads.push(currentSum);
        currentSum = 0;
      }
    });

    
    loads.sort((a, b) => {
      return b - a;
    })

    console.log(loads[0] + loads[1] + loads[2])
  });
}

getData();