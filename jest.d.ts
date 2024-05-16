declare namespace jest {
    interface Matchers<R> {
      toHaveStyle(style: object): R;
      toHaveProp(propName: string, propValue?: any): R;
    }
  }