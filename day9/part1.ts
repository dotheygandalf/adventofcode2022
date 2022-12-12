import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

type Command = [Direction, number];
type Direction = 'U' | 'D' | 'L' | 'R';
type Position = [number, number];

const parseCommand = (input: string): Command => {
  const raw = input.split(' ');
  return [raw[0] as Direction, parseInt(raw[1])];
};

const move = (command: Command, position: Position): Position => {
  if (command[0] === 'R') {
    return [position[0] + 1, position[1]];
  } else if (command[0] === 'L') {
    return [position[0] - 1, position[1]];
  } else if (command[0] === 'D') {
    return [position[0], position[1] - 1];
  } else if (command[0] === 'U') {
    return [position[0], position[1] + 1];
  }
  return [0, 0];
};

const shouldNotMoveTail = (
  tailPosition: Position,
  headPosition: Position
): boolean => {
  const isOverlapping = (
    tailPosition: Position,
    headPosition: Position
  ): boolean => {
    return (
      tailPosition[0] === headPosition[0] && tailPosition[1] === headPosition[1]
    );
  };

  const isAdjacent = (
    tailPosition: Position,
    headPosition: Position
  ): boolean => {
    return (
      (tailPosition[0] === headPosition[0] - 1 &&
        tailPosition[1] === headPosition[1] - 1) ||
      (tailPosition[0] === headPosition[0] - 1 &&
        tailPosition[1] === headPosition[1] + 1) ||
      (tailPosition[0] === headPosition[0] + 1 &&
        tailPosition[1] === headPosition[1] + 1) ||
      (tailPosition[0] === headPosition[0] + 1 &&
        tailPosition[1] === headPosition[1] - 1)
    );
  };

  const wasOverlapping = (
    tailPosition: Position,
    headPosition: Position
  ): boolean => {
    return (
      (tailPosition[0] === headPosition[0] - 1 &&
        tailPosition[1] === headPosition[1]) ||
      (tailPosition[0] === headPosition[0] + 1 &&
        tailPosition[1] === headPosition[1]) ||
      (tailPosition[0] === headPosition[0] &&
        tailPosition[1] === headPosition[1] + 1) ||
      (tailPosition[0] === headPosition[0] &&
        tailPosition[1] === headPosition[1] - 1)
    );
  };

  return (
    isOverlapping(tailPosition, headPosition) ||
    isAdjacent(tailPosition, headPosition) ||
    wasOverlapping(tailPosition, headPosition)
  );
};

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
