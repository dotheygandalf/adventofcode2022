export const findCommonLetter = (inputs: string[]): string => {
  let obj: {
    [key: string]: number;
  } = {};

  for (const [index, input] of inputs.entries()) {
    for (const letter of input.split('')) {
      if (index === 0) {
        obj[letter] = 1;
      } else {
        if (obj.hasOwnProperty(letter) && obj[letter] === index) {
          obj[letter] = obj[letter] + 1;
        }
      }
    }
  }
  // console.table(obj);

  for (const [key, value] of Object.entries(obj)) {
    if (value === inputs.length) {
      return key;
    }
  }

  return '';
};

export const charToPriority = (input: string): number => {
  const asciiCode = input.charCodeAt(0);

  if (asciiCode >= 97) {
    return asciiCode - 96;
  } else if (asciiCode >= 65) {
    return asciiCode - 38;
  }
  return 0;
};
