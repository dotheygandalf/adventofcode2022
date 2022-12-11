import path from 'path';
import { getDataFromFile, splitLines } from '../utils/parseFile';
import { Directory } from './directory';
import { File } from './file';

const data = getDataFromFile(path.resolve(__dirname, './input.txt'));
// const data = getDataFromFile(path.resolve(__dirname, './input-test.txt'));
const lines = splitLines(data);

const parseCommand = (input: string, node: Directory): Directory => {
  if (input.startsWith('$')) {
    if (input.startsWith('$ cd ..')) {
      const parentNode = node.getParent();
      if (parentNode) {
        return parentNode;
      }
    } else if (input.startsWith('$ cd')) {
      const found = input.match(/(\$ cd )(.*)/);
      if (found) {
        const directory = node.getDirectory(found[2]);
        if (directory) {
          return directory;
        }
      }
    }
  } else if (input.startsWith('dir')) {
    const directoryName = input.split(' ')[1];
    if (!node.hasDirectory(input)) {
      const directory = new Directory(directoryName, node);
      node.addDirectory(directory);
    }
  } else if (input.match(/(\d+) ([A-Za-z.]+)/)) {
    const found = input.match(/(\d+) ([A-Za-z.]+)/);
    if (found) {
      node.addFile(new File(found[2], parseInt(found[1])));
    }
  }
  return node;
};

const parseLines = (lines: string[]): Directory => {
  const rootNode = new Directory('/');
  let node = rootNode;
  for (const line of lines) {
    node = parseCommand(line, node);
  }

  return rootNode;
};

const printNode = (node: Directory, indentation = 1): string => {
  const nextIndentation = indentation++;
  const files = node
    .getFiles()
    .map((file) => {
      return `${Array(nextIndentation * 2)
        .fill(' ')
        .join('')}— ${file.toString()}`;
    })
    .join('\n');
  const directories: string = node
    .getDirectories()
    .map((directory) => {
      return `${Array(nextIndentation * 2)
        .fill(' ')
        .join('')}${printNode(directory, nextIndentation + 1)}`;
    })
    .join('\n');

  let output = `— ${node.getName()} (dir)`;

  if (files) {
    output += `\n${files}`;
  }
  if (directories) {
    output += `\n${directories}`;
  }

  return output;
};

const directory = parseLines(lines);

console.log(printNode(directory));
