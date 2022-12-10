import * as fs from 'fs';
import * as path from 'path';

import type { play } from './types'


const opponentPlays: {
  [key: string]: play
} = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS'
}

const myPlays: {
  [key: string]: play
} = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS'
}

const points = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3
}

const wins = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER'
};

const comparePlays = (a: play, b: play) => {
  if (a === b) {
    return 3 + points[b];
  } else if (wins[b] === a) {
    return 6 + points[b];
  }
  return points[b];
}

const getData = () => {
  fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', (err, data) => {
    if(err) {
      console.log(err)
      return;
    }

    const plays = data.split('\n');

    const result = plays.map(play => {
      const [opponent, me] = play.split(' ');
      return comparePlays(opponentPlays[opponent], myPlays[me]);
    }).reduce((prev, current) => {
      console.log(current)
      return prev + Number(current);
    }, 0);

    console.log(result)
  });
};

getData();