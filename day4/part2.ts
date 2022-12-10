import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';

const data = getDataFromFile(path.resolve(__dirname, './part1-input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './part1-test.txt'));
const lines = splitLines(data);

const getAssignmentPairs = (lines: string[]): string[][] => {
  return lines.map((line) => {
    const sections = line.split(',');
    return sections;
  });
};

const getOverlappingAssignments = (assignmentPairs: string[][]): string[][] => {
  return assignmentPairs
    .map((assignment) => {
      const groupA = assignment[0].split('-').map((number) => {
        return parseInt(number);
      });
      const groupB = assignment[1].split('-').map((number) => {
        return parseInt(number);
      });
      // console.log(groupA, groupB);
      if (
        (groupA[0] <= groupB[0] && groupA[1] >= groupB[1]) ||
        (groupA[0] <= groupB[0] && groupA[1] >= groupB[0]) ||
        (groupB[0] <= groupA[0] && groupB[1] >= groupA[1]) ||
        (groupB[0] <= groupA[0] && groupB[1] >= groupA[0])
      ) {
        return assignment;
      }
    })
    .filter((overlappingAssignment): overlappingAssignment is string[] => {
      return !!overlappingAssignment;
    });
};

const assignmentPairs = getAssignmentPairs(lines);
const overlappingAssignments = getOverlappingAssignments(assignmentPairs);
console.log(overlappingAssignments.length);

// console.table(overlappingAssignments);
