import { Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ActionSheetStyles, CalculateHeightProps } from './ipay-actionsheet-interface';

// Maximum height for the action sheet, set to 70% of the screen height
const MAX_HEIGHT = Dimensions.get('window').height * 0.7;

// Utility function to check if a property is defined
export function isset(prop: any): boolean {
  return typeof prop !== 'undefined';
}

// Function to calculate the total height of the action sheet based on its components
export const calculateHeight = ({
  options,
  title,
  message,
  cancelButtonIndex,
  sheetStyles,
  showIcon,
  showCancel,
  scrollEnabledRef,
}: CalculateHeightProps): number => {
  // Function to combine styles from sheetStyles and any additional styles
  const getStyles = (): Record<keyof ActionSheetStyles, any[]> => {
    const combinedStyles: Record<keyof ActionSheetStyles, any[]> = {} as Record<keyof ActionSheetStyles, any[]>;
    (Object.keys(sheetStyles) as Array<keyof ActionSheetStyles>).forEach((key) => {
      combinedStyles[key] = [sheetStyles[key]];
      // TODO: Fix styles no-use-before-define
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (styles && styles[key]) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        combinedStyles[key].push(styles[key]);
      }
    });
    return combinedStyles;
  };

  // Combined styles for the action sheet
  const styles = getStyles();

  // Function to calculate the height of a specific style component
  const getHeight = (styleName: keyof ActionSheetStyles): number => {
    const style = styles[styleName][styles[styleName].length - 1];
    const attributes = ['height', 'marginTop', 'marginBottom', 'padding', 'paddingVertical', 'marginVertical'];

    return attributes.reduce((totalHeight, attrName) => totalHeight + (style[attrName] || 0), moderateScale(0));
  };

  // Initial height set to 0
  let height = 0;

  // Helper function to add height of a specific component to the total height
  const addHeight = (name: keyof ActionSheetStyles) => {
    height += getHeight(name);
  };

  // Define the sections to add height based on their conditions
  const sectionsToAddHeight = [
    { condition: title, styleName: 'titleBox' },
    { condition: message, styleName: 'messageBox' },
    { condition: message || title, styleName: 'messageFrame' },
    { condition: options.length, styleName: 'body' },
    { condition: showIcon, styleName: 'rightSvg' },
    { condition: showCancel, styleName: 'cancelBody' },
    { condition: showCancel, styleName: 'innerSpacing' },
    { condition: showCancel, styleName: 'cancelSpacing' },
  ];

  // Loop through each section and add its height if the condition is met
  sectionsToAddHeight.forEach((section) => {
    if (section.condition) {
      addHeight(section.styleName as keyof ActionSheetStyles);
    }
  });

  // Handle cancel button height separately
  if (isset(cancelButtonIndex)) {
    addHeight('cancelButtonBox');
    height += (options.length - 1) * getHeight('buttonBox');
  } else {
    height += options.length * getHeight('buttonBox');
  }

  // Check if the calculated height exceeds the maximum height and adjust if necessary
  if (height > MAX_HEIGHT) {
    // TODO: Fix props reassign
    // eslint-disable-next-line no-param-reassign
    scrollEnabledRef.current = true;
    height = MAX_HEIGHT;
  } else {
    // TODO: Fix props reassign
    // eslint-disable-next-line no-param-reassign
    scrollEnabledRef.current = false;
  }

  // Return the calculated height
  return height;
};
