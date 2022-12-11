import { File } from './file';

export class Directory {
  private name: string;
  private files: File[];
  private directories: Directory[];
  private parent: Directory | null;

  constructor(
    name: string,
    parent: Directory | null = null,
    files: File[] = [],
    directories: Directory[] = []
  ) {
    this.name = name;
    this.files = files;
    this.directories = directories;
    this.parent = parent;
  }

  addFile = (file: File) => {
    this.files.push(file);
  };

  addDirectory = (directory: Directory) => {
    this.directories.push(directory);
  };

  getName = (): string => {
    return this.name;
  };

  getFiles = (): File[] => {
    return this.files;
  };

  getDirectories = (): Directory[] => {
    return this.directories;
  };

  getDirectory = (directoryName: string): Directory | null => {
    for (const directory of this.directories) {
      if (directory.name === directoryName) {
        return directory;
      }
    }
    return null;
  };

  getParent = (): Directory | null => {
    return this.parent;
  };

  hasDirectory = (directoryName: string): boolean => {
    for (const directory of this.directories) {
      if (directory.name === directoryName) {
        return true;
      }
    }
    return false;
  };

  public getSize = (): number => {
    return 0;
  };
}
