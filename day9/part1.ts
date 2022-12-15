import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';
import {
  Command,
  move,
  parseCommand,
  Position,
  shouldNotMoveTail,
} from './utils';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

let remainingTicks = 0;
const numberOfCommands = lines.length;
let i = 0;
let currentCommand: Command | null = null;

let headPosition: Position = [0, 0];
let tailPosition: Position = [0, 0];

const tailPositions: {
  [key: string]: number;
} = {};

while (remainingTicks > 0 || i < numberOfCommands) {
  if (remainingTicks === 0) {
    currentCommand = parseCommand(lines[i]);
    remainingTicks = currentCommand[1];
    i++;
  }
  if (currentCommand) {
    // console.log(currentCommand[0], remainingTicks);
    const priorHeadPosition = headPosition;
    headPosition = move(currentCommand, headPosition);
    console.log('head: ' + headPosition);
    if (shouldNotMoveTail(tailPosition, headPosition)) {
      // console.log('should not move tails');
    } else {
      tailPosition = priorHeadPosition;
      // console.log('should move tails');
    }
    tailPositions[`${tailPosition[0]},${tailPosition[1]}`] = 1;
    console.log('tails: ' + tailPosition);
  }

  remainingTicks--;
}

console.log(Object.values(tailPositions).length);
