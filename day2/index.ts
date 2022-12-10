import * as fs from 'fs';
import * as path from 'path';

import type { Play, Strat} from './types'


const opponentPlays: {
  [key: string]: Play
} = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS'
}

const myWinningPlays: {
  [key: string]: Play
} = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS'
}

const myStrategicPlays: {
  [key: string]: Strat
} = {
  X: 'LOSE',
  Y: 'TIE',
  Z: 'WIN'
}

const points = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3
}

const wins: {
  [key: string]: Play
} = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER'
};

const beatsInput: {
  [key: string]: Play
} = {
  ROCK: 'PAPER',
  PAPER: 'SCISSORS',
  SCISSORS: 'ROCK'
};

const comparePlays = (a: Play, b: Play) => {
  if (a === b) {
    return 3 + points[b];
  } else if (wins[b] === a) {
    return 6 + points[b];
  }
  return points[b];
};

const transformStrategicPlay = (a: Play, b: Strat): Play => {
  if (b === 'WIN') {
    return beatsInput[a];
  } else if (b === 'LOSE') {
    return wins[a];
  }
  return a;
};

const getData = () => {
  fs.readFile(path.resolve(__dirname, './input.txt'), 'utf8', (err, data) => {
    if(err) {
      console.log(err)
      return;
    }

    const plays = data.split('\n');

    const start1 = plays.map(play => {
      const [opponent, me] = play.split(' ');
      return comparePlays(opponentPlays[opponent], myWinningPlays[me]);
    }).reduce((prev, current) => {
      return prev + Number(current);
    }, 0);

    console.log(start1);
    
    const start2 = plays.map(play => {
      const [opponent, me] = play.split(' ');
      return comparePlays(opponentPlays[opponent], transformStrategicPlay(opponentPlays[opponent], myStrategicPlays[me]));
    }).reduce((prev, current) => {
      return prev + Number(current);
    }, 0);

    console.log(start2);
  });
};

getData();