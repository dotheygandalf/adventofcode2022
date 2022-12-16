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
    test = new Function(
      'input',
      `let worryLevel = Math.floor(input / 3);
      
      if(worryLevel % ${parseInt(
        lines[lineCounter].replace('Test: divisible by ', '')
      )} === 0) {
        return [worryLevel, ${parseInt(
          lines[lineCounter + 1].replace('If true: throw to monkey ', '')
        )}]
      } else { return [worryLevel, ${parseInt(
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

console.log(monkes);

for (let i = 0; i < 20; i++) {
  for (const monkeNumber in monkes) {
    while (monkes[monkeNumber].items.length > 0) {
      const firstItem = monkes[monkeNumber].items.shift();
      const worryLevel = monkes[monkeNumber].operation(firstItem);
      monkes[monkeNumber].inspected++;
      const testedWorry = monkes[monkeNumber].test(worryLevel);
      monkes[testedWorry[1]].items.push(testedWorry[0]);
    }
  }
}

console.log(monkes);
