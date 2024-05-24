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
  colors,
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
      if (styles && styles[key]) {
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
    const attributes = ['height', 'marginTop', 'marginBottom', 'padding', 'paddingVertical'];
    
    return attributes.reduce((totalHeight, attrName) => {
      return totalHeight + (style[attrName] || 0);
    }, moderateScale(0));
  };

  // Helper function to add height of a specific component to the total height
  const addHeight = (name: keyof ActionSheetStyles) => {
    height += getHeight(name);
  };

  // Initial height set to 0
  let height = 0;

  // Define the sections to add height based on their conditions
  const sectionsToAddHeight = [
    { condition: title, styleName: 'titleBox' },
    { condition: message, styleName: 'messageBox' },
    { condition: message || title, styleName: 'messageFrame' },
    { condition: options.length, styleName: 'body' },
    { condition: showIcon, styleName: 'rightSvg' },
    { condition: showCancel, styleName: 'cancelBody' },
  ];
  
  // Loop through each section and add its height if the condition is met
  sectionsToAddHeight.forEach(section => {
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
    scrollEnabledRef.current = true;
    height = MAX_HEIGHT;
  } else {
    scrollEnabledRef.current = false;
  }

  // Return the calculated height
  return height;
};
