const shortString = (text: string, length: number = 0) => {
  if (text?.length < length) {
    return text;
  }
  return `${text?.slice(0, length)}...`;
};

export default shortString;
