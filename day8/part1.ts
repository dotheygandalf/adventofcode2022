import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

const checkHeight = (posY: number, posX: number, grid: number[][]): boolean => {
  const desiredTree = grid[posY][posX];

  if (
    posY > 0 &&
    posX < grid[posY].length - 1 &&
    posX > 0 &&
    posY < grid.length - 1 &&
    ((): number => {
      // going up
      let max = 0;
      for (let i = posY - 1; i >= 0; i--) {
        if (grid[i][posX] > max) {
          max = grid[i][posX];
        }
      }
      return max;
    })() >= desiredTree &&
    ((): number => {
      // going down
      let max = 0;
      for (let i = posY + 1; i < grid.length; i++) {
        if (grid[i][posX] > max) {
          max = grid[i][posX];
        }
      }
      return max;
    })() >= desiredTree &&
    ((): number => {
      // going to the right
      let max = 0;
      for (let i = posX + 1; i < grid[posY].length; i++) {
        if (grid[posY][i] > max) {
          max = grid[posY][i];
        }
      }
      return max;
    })() >= desiredTree &&
    ((): number => {
      // going to the left
      let max = 0;
      for (let i = posX - 1; i >= 0; i--) {
        if (grid[posY][i] > max) {
          max = grid[posY][i];
        }
      }
      return max;
    })() >= desiredTree
  ) {
    return false;
  }
  return true;
};

const linesToGrid = (lines: string[]) => {
  const grid: number[][] = [];

  for (const [index, line] of lines.entries()) {
    grid[index] = line.split('').map((val) => {
      return parseInt(val);
    });
  }

  return grid;
};

const grid = linesToGrid(lines);
console.table(grid);

const checkedGrid: boolean[][] = [];
for (let i = 0; i < grid.length; i++) {
  checkedGrid[i] = [];
  for (let j = 0; j < grid[i].length; j++) {
    checkedGrid[i].push(checkHeight(i, j, grid));
  }
}

console.table(checkedGrid);

const countVisibleTrees = (grid: boolean[][]) => {
  return grid.reduce((prev, current) => {
    return (
      prev +
      current.filter((value) => {
        return value;
      }).length
    );
  }, 0);
};
const visibleTrees = countVisibleTrees(checkedGrid);

console.log('visible trees: ' + visibleTrees);
