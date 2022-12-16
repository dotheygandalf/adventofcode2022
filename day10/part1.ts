import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

let clockCounter = 1;
let total = 1;

let lineCounter = 0;
let waitCounter = 0;

let sumOfSignalStrength = 0;

while (lineCounter < lines.length) {
  if (
    clockCounter === 20 ||
    clockCounter === 60 ||
    clockCounter === 100 ||
    clockCounter === 140 ||
    clockCounter === 180 ||
    clockCounter === 220
  ) {
    console.log(clockCounter, total);
    sumOfSignalStrength += clockCounter * total;
  }

  const line = lines[lineCounter];
  if (line.startsWith('addx')) {
    if (waitCounter === 1) {
      const lineParts = line.split(' ');
      total += parseInt(lineParts[1]);
      waitCounter = 0;
      clockCounter++;
      lineCounter++;
      console.log(line, clockCounter, total);
    } else {
      clockCounter++;
      waitCounter++;
      console.log(line, clockCounter, total);
    }
  } else if (line.startsWith('noop')) {
    console.log(line, clockCounter, total);
    clockCounter++;
    lineCounter++;
  }
}

console.log('sumOfSignalStrength', sumOfSignalStrength);
