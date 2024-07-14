export const PERMISSIONS = {
    IOS: { CAMERA: 'ios.permission.CAMERA' },
    ANDROID: { CAMERA: 'android.permission.CAMERA' },
  };
  
  export const RESULTS = {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  };
  
  export const check = jest.fn();
  export const request = jest.fn();