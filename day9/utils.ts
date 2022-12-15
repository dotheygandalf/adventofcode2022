export type Command = [Direction, number];
export type Direction = 'U' | 'D' | 'L' | 'R';
export type Position = [number, number];

export const parseCommand = (input: string): Command => {
  const raw = input.split(' ');
  return [raw[0] as Direction, parseInt(raw[1])];
};

export const move = (command: Command, position: Position): Position => {
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

const isAdjacent = (
  tailPosition: Position,
  headPosition: Position
): boolean => {
  return (
    positionComparison(tailPosition, headPosition, [-1, -1]) ||
    positionComparison(tailPosition, headPosition, [-1, 1]) ||
    positionComparison(tailPosition, headPosition, [1, 1]) ||
    positionComparison(tailPosition, headPosition, [1, -1])
  );
};

export const shouldNotMoveTail = (
  tailPosition: Position,
  headPosition: Position
): boolean => {
  const isOverlapping = (
    tailPosition: Position,
    headPosition: Position
  ): boolean => {
    return positionComparison(tailPosition, headPosition, [0, 0]);
  };

  const wasOverlapping = (
    tailPosition: Position,
    headPosition: Position
  ): boolean => {
    return (
      positionComparison(tailPosition, headPosition, [-1, 0]) ||
      positionComparison(tailPosition, headPosition, [1, 0]) ||
      positionComparison(tailPosition, headPosition, [0, -1]) ||
      positionComparison(tailPosition, headPosition, [0, 1])
    );
  };

  console.log(
    isOverlapping(tailPosition, headPosition),
    isAdjacent(tailPosition, headPosition),
    wasOverlapping(tailPosition, headPosition)
  );

  return (
    isOverlapping(tailPosition, headPosition) ||
    isAdjacent(tailPosition, headPosition) ||
    wasOverlapping(tailPosition, headPosition)
  );
};

const positionComparison = (
  tailPosition: Position,
  headPosition: Position,
  offset: Position
): boolean => {
  return (
    tailPosition[0] + offset[0] === headPosition[0] &&
    tailPosition[1] + offset[1] === headPosition[1]
  );
};

const positionSumation = (
  tailPosition: Position,
  offset: Position
): Position => {
  return [tailPosition[0] + offset[0], tailPosition[1] + offset[1]];
};

export const getNextPosition = (
  tailPosition: Position,
  headPosition: Position
): Position => {
  // console.log(tailPosition, headPosition);
  if (positionComparison(tailPosition, headPosition, [-2, 2])) {
    return positionSumation(tailPosition, [-1, 1]);
  } else if (positionComparison(tailPosition, headPosition, [-1, 2])) {
    return positionSumation(tailPosition, [-1, 1]);
  } else if (positionComparison(tailPosition, headPosition, [0, 2])) {
    return positionSumation(tailPosition, [0, 1]);
  } else if (positionComparison(tailPosition, headPosition, [1, 2])) {
    return positionSumation(tailPosition, [1, 1]);
  } else if (positionComparison(tailPosition, headPosition, [2, 2])) {
    return positionSumation(tailPosition, [1, 1]);
  } else if (positionComparison(tailPosition, headPosition, [2, 1])) {
    return positionSumation(tailPosition, [1, 1]);
  } else if (positionComparison(tailPosition, headPosition, [2, 0])) {
    return positionSumation(tailPosition, [1, 0]);
  } else if (positionComparison(tailPosition, headPosition, [2, -1])) {
    return positionSumation(tailPosition, [1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [2, -2])) {
    return positionSumation(tailPosition, [1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [1, -2])) {
    return positionSumation(tailPosition, [1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [0, -2])) {
    return positionSumation(tailPosition, [0, -1]);
  } else if (positionComparison(tailPosition, headPosition, [-1, -2])) {
    return positionSumation(tailPosition, [-1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [-2, -2])) {
    return positionSumation(tailPosition, [-1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [-2, -1])) {
    return positionSumation(tailPosition, [-1, -1]);
  } else if (positionComparison(tailPosition, headPosition, [-2, 0])) {
    return positionSumation(tailPosition, [-1, 0]);
  } else if (positionComparison(tailPosition, headPosition, [-2, 1])) {
    return positionSumation(tailPosition, [-1, 1]);
  }

  return tailPosition;
};

export const printGrid = (snake: Position[]) => {
  const grid: string[] = [];
  for (let i = 0; i < 30; i++) {
    let row = '';
    for (let j = 0; j < 30; j++) {
      let found = '.';
      let char = '.';
      if (j === 12 && i === 12) {
        found = 'S';
      }
      for (const [index, section] of snake.entries()) {
        if (section[0] === j && section[1] === i) {
          if (index === 0) {
            char = 'H';
          } else {
            char = index + '';
          }
          found = char;
          break;
        }
      }
      row += found;
    }
    grid.unshift(row);
  }
  return grid.join('\n');
};
