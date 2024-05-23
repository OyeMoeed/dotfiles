import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { ActionSheetStyles, CalculateHeightProps } from './ipay-actionsheet-interface';

const MAX_HEIGHT = Dimensions.get('window').height * 0.7;
export function isset(prop: any) {
  return typeof prop !== 'undefined'
}

export const calculateHeight = ({
  options,
  title,
  message,
  cancelButtonIndex,
  colors,
  styles2,
  showIcon,
  showCancel,
  scrollEnabledRef,
}: CalculateHeightProps): number => {

  const getStyles = (): Record<keyof ActionSheetStyles, any[]> => {
    const obj = {} as Record<keyof ActionSheetStyles, any[]>;
    (Object.keys(styles2) as Array<keyof ActionSheetStyles>).forEach((key) => {
      const arr = [styles2[key]];
      // Assuming `styles` is defined somewhere else in your code
      if (styles && styles[key]) {
        arr.push(styles[key]);
      }
      obj[key] = arr;
    });
    return obj;
  };
  const styles = getStyles();

  const getHeight = (name: keyof ActionSheetStyles): number => {

    const style = styles[name][styles[name].length - 1];
    let h = moderateScale(0);
    ['height', 'marginTop', 'marginBottom', 'padding', 'paddingVertical'].forEach((attrName) => {
      if (typeof style[attrName] !== 'undefined') {
        h += style[attrName];
      }
    });
    return h;
  };

  let height = 0;
  if (title) height += getHeight('titleBox');
  if (message) height += getHeight('messageBox');
  if (message || title) height += getHeight('messageFrame');
  if (options.length) height += getHeight('body');
  if (showIcon) height += getHeight('rightSvg');
  if (showCancel) height += getHeight('body2');
  if (isset(cancelButtonIndex)) {
    height += getHeight('cancelButtonBox');
    height += (options.length - 1) * getHeight('buttonBox');
  } else {
    height += options.length * getHeight('buttonBox');
  }

  if (height > MAX_HEIGHT) {
    scrollEnabledRef.current = true;
    height = MAX_HEIGHT;
  } else {
    scrollEnabledRef.current = false;
  }

  return height;
};

