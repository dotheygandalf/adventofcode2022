import path, { parse } from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

let firstMoveLine = 0;

const getStacks = (
  lines: string[]
): {
  [key: string]: string[];
} => {
  const numberOfColumns = Math.floor(lines[0].length / 4) + 1;

  let stacks: {
    [key: string]: string[];
  } = {};

  for (const [index, line] of lines.entries()) {
    // console.log(line);
    if (line === '') {
      firstMoveLine = index + 1;
      break;
    }
    for (let i = 0; i < numberOfColumns; i++) {
      const item = line[1 + 4 * i];

      // console.log(numberOfColumns, i, 1 + 4 * i, item);

      if (item === '1') {
        break;
      } else if (item === ' ') {
      } else if (stacks.hasOwnProperty(i)) {
        stacks[i].unshift(item);
      } else {
        stacks[i] = [item];
      }
    }
  }
  return stacks;
};

const getMoves = (firstMoveLine: number, lines: string[]): number[][] => {
  const moves: number[][] = [];
  for (let i = firstMoveLine; i < lines.length; i++) {
    // console.log(lines[i]);

    let move: number[] = [];
    for (const match of lines[i].matchAll(/\d+/g)) {
      // console.log(match[0]);
      move.push(parseInt(match[0]));
    }
    moves.push(move);
  }
  return moves;
};

const stacks = getStacks(lines);

// console.table(stacks);
// console.log(firstMoveLine);

const moves = getMoves(firstMoveLine, lines);

// console.table(moves);

const performMoves = (
  moves: number[][],
  stacks: { [key: string]: string[] }
): { [key: string]: string[] } => {
  for (const [index, move] of moves.entries()) {
    // console.log(`move ${index + 1}`);

    const quantity = move[0];
    const from = move[1] - 1;
    const to = move[2] - 1;

    const lift = stacks[from].slice(quantity * -1);
    stacks[from] = stacks[from].slice(0, stacks[from].length - quantity);
    // stacks[to] = stacks[to].concat(lift.reverse()); // only reverse for part 1
    stacks[to] = stacks[to].concat(lift);
  }
  return stacks;
};

const finalStack = performMoves(moves, { ...stacks });
console.table(stacks);
console.table(finalStack);

const answer: string[] = [];
for (const column in finalStack) {
  answer.push(finalStack[column].pop() as string);
}

console.log(answer.join(''));
