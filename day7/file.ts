export class File {
  private name: string;
  private size: number;

  constructor(name: string, size = 0) {
    this.name = name;
    this.size = size;
  }

  getSize = (): number => {
    return this.size;
  };

  toString = (): string => {
    return `${this.name} (file, size=${this.size})`;
  };
}
