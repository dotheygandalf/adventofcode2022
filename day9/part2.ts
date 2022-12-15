import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';
import {
  Command,
  getNextPosition,
  move,
  parseCommand,
  Position,
} from './utils';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test-2.txt'));
const lines = splitLines(data);

let remainingTicks = 0;
const numberOfCommands = lines.length;
let i = 0;
let currentCommand: Command | null = null;

const snake: Position[] = [];

for (let i = 0; i < 10; i++) {
  snake.push([12, 12]);
}

const tailPositions: {
  [key: string]: number;
} = {};

let totalSteps = 0;

// if there is a command we will want to act on it on the head of the snake.
while (remainingTicks > 0 || i < numberOfCommands) {
  // if we have run out of moves from the last command, get the next one
  if (remainingTicks === 0) {
    // console.log(currentCommand);
    // console.log(printGrid(snake));
    currentCommand = parseCommand(lines[i]);
    remainingTicks = currentCommand[1];
    i++;
  }

  if (currentCommand) {
    snake[0] = move(currentCommand, snake[0]);

    for (let j = 1; j < snake.length && j <= totalSteps; j++) {
      const nextPosition = getNextPosition(snake[j], snake[j - 1]);

      snake[j] = nextPosition;
    }

    tailPositions[
      `${snake[snake.length - 1][0]},${snake[snake.length - 1][1]}`
    ] = 1;
  }

  totalSteps++;
  remainingTicks--;
}

console.table(tailPositions);
console.log(Object.values(tailPositions).length);
