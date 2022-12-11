import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

const findMarker = (input: string): number => {
  let marker = '';
  console.log(input);
  for (let i = 1; i < input.length - 4; i++) {
    let currentCandidate = input.substring(i, i + 4);
    for (const [index, char] of currentCandidate.split('').entries()) {
      if (
        Array.from(currentCandidate.matchAll(new RegExp(char, 'g'))).length > 1
      ) {
        break;
      } else if (index === 3) {
        marker = currentCandidate;
      }
    }
    if (marker !== '') {
      break;
    }
  }
  console.log(marker);
  return input.indexOf(marker) + 4;
};

const parseLines = (lines: string[]) => {
  for (const line of lines) {
    const marker = findMarker(line);
    console.log(marker);
  }
};

parseLines(lines);
