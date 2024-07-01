const mockDeviceInfo = {
  getDeviceId: jest.fn(() => 'mockDeviceId'),
  getSystemName: jest.fn(() => 'mockSystemName'),
  getSystemVersion: jest.fn(() => 'mockSystemVersion'),
  getDeviceName: jest.fn(() => Promise.resolve('mockDeviceName')),
};

export default mockDeviceInfo;
