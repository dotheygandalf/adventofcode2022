import * as fs from 'fs';
import * as path from 'path';

export const getDataFromFile = (inputFile: string): string => {
   const buffer = fs.readFileSync(inputFile);
   return buffer.toString();
};

export const splitLines = (data: string): string[] => {
  return data.split('\n');
};