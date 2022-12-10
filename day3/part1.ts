import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';
import { findCommonLetter } from './utils';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './test.txt'));
const lines = splitLines(data);

const splitCompartments = (lines: string[]): string[][] => {
  return lines.map((line) => {
    const a = line.substring(0, line.length / 2);
    const b = line.substring(line.length / 2);

    return [a, b];
  });
};

const output = splitCompartments(lines).map((line) => {
  const commonLetter = findCommonLetter(line);
  const asciiCode = commonLetter.charCodeAt(0);

  if (asciiCode >= 97) {
    return asciiCode - 96;
  } else if (asciiCode >= 65) {
    return asciiCode - 38;
  }
  return 0;
});

const sum = output.reduce((prev, current) => {
  return prev + current;
}, 0);

console.log(sum);
