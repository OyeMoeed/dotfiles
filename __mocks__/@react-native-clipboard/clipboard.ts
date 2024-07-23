const Clipboard = {
  getString: jest.fn().mockResolvedValue('Mocked clipboard content'),
  setString: jest.fn(),
  hasString: jest.fn().mockResolvedValue(true),
};

export default Clipboard;
