const insertLineBreaks = (text: string, maxLength: number = 20): string =>
  text.split(' ').reduce(
    (acc, word) => {
      const { result, lineLength } = acc;
      if (lineLength + word.length + 1 > maxLength) {
        return {
          result: `${result}\n${word}`,
          lineLength: word.length,
        };
      }
      return {
        result: `${result}${lineLength ? ' ' : ''}${word}`,
        lineLength: lineLength + word.length + (lineLength ? 1 : 0),
      };
    },
    { result: '', lineLength: 0 },
  ).result;

export default insertLineBreaks;
