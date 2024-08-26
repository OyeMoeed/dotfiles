const getInitialLetterOfName = (name: string): string => {
  const words = name.split(' ');
  return `${words[0][0]}${words[1] ? words[1][0] : ''}`;
};

export default getInitialLetterOfName;
