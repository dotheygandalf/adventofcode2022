import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';
import { charToPriority, findCommonLetter, findCommonLetter2 } from './utils';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './test.txt'));
const lines = splitLines(data);

const groupsOfElves: string[][] = [];
let groupIndex = 0;

for (const [index, line] of lines.entries()) {
  if (groupsOfElves[groupIndex]) {
    groupsOfElves[groupIndex].push(line);
  } else {
    groupsOfElves[groupIndex] = [line];
  }
  if (index !== 0 && (index + 1) % 3 === 0) {
    groupIndex++;
  }
}

const sum = groupsOfElves
  .map((group) => {
    return findCommonLetter2(group);
  })
  .reduce((prev, current) => {
    return prev + charToPriority(current);
  }, 0);

console.log(sum);
