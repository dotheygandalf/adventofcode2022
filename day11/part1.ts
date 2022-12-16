/* eslint-disable @typescript-eslint/ban-types */
import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

type Monke = {
  items: number[];
  operation: Function;
  test: Function;
  inspected: number;
};

let lineCounter = 0;

const monkes: {
  [key: number]: Monke;
} = {};

let allDivisible = 1;

let items: number[] | undefined,
  operation: Function | undefined,
  test: Function | undefined;

while (lineCounter < lines.length) {
  const currentMonkeNumber = Math.floor(lineCounter / 7);
  if (lineCounter % 7 === 1) {
    items =
      lines[lineCounter]
        .replace('Starting items: ', '')
        .split(', ')
        .map((items) => {
          return parseInt(items);
        }) || [];
  } else if (lineCounter % 7 === 2) {
    operation = new Function(
      'old',
      `return ${lines[lineCounter].replace('Operation: new = ', '')}`
    );
  } else if (lineCounter % 7 === 3) {
    allDivisible *= parseInt(
      lines[lineCounter].replace('Test: divisible by ', '')
    );
    test = new Function(
      'input',
      'allDivisible',
      `let nextWorryLevel = input % allDivisible;
      
      if(nextWorryLevel % ${parseInt(
        lines[lineCounter].replace('Test: divisible by ', '')
      )} === 0) {
        return [nextWorryLevel, ${parseInt(
          lines[lineCounter + 1].replace('If true: throw to monkey ', '')
        )}]
      } else { return [nextWorryLevel, ${parseInt(
        lines[lineCounter + 2].replace('If false: throw to monkey ', '')
      )}]}`
    );
  } else if (lineCounter % 7 === 4 && items && operation && test) {
    monkes[currentMonkeNumber] = {
      items,
      operation,
      test,
      inspected: 0,
    };
  }

  lineCounter++;
}

for (let i = 0; i < 10000; i++) {
  for (const monkeNumber in monkes) {
    while (monkes[monkeNumber].items.length > 0) {
      const firstItem = monkes[monkeNumber].items.shift();
      const worryLevel = monkes[monkeNumber].operation(firstItem);
      monkes[monkeNumber].inspected++;
      const testedWorry = monkes[monkeNumber].test(worryLevel, allDivisible);
      monkes[testedWorry[1]].items.push(testedWorry[0]);
    }
  }
}

const sortedTosses = Object.values(monkes)
  .map((monke) => monke.inspected)
  .sort((a, b) => {
    return b - a;
  });

console.log(sortedTosses[0] * sortedTosses[1]);
