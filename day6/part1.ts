import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

// const MARKER_LENGTH = 4;
const MARKER_LENGTH = 14;

const findMarker = (input: string): number => {
  let marker = '';
  console.log(input);
  for (let i = 1; i < input.length - MARKER_LENGTH; i++) {
    const currentCandidate = input.substring(i, i + MARKER_LENGTH);
    for (const [index, char] of currentCandidate.split('').entries()) {
      if (
        Array.from(currentCandidate.matchAll(new RegExp(char, 'g'))).length > 1
      ) {
        break;
      } else if (index === MARKER_LENGTH - 1) {
        marker = currentCandidate;
      }
    }
    if (marker !== '') {
      break;
    }
  }
  console.log(marker);
  return input.indexOf(marker) + MARKER_LENGTH;
};

const parseLines = (lines: string[]) => {
  for (const line of lines) {
    const marker = findMarker(line);
    console.log(marker);
  }
};

parseLines(lines);
