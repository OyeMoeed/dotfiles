import { TextStyle } from 'react-native';

export interface HeaderProps {
  testID?: string;
  // A unique identifier for testing purposes

  title?: string;
  // The title to be displayed in the header

  onBackPress?: () => void;
  // Function to be called when the back button is pressed

  titleStyle?: TextStyle;
  // Style object for customizing the title text

  leftComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  // Custom component to be displayed on the left side of the header

  rightComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  // Custom component to be displayed on the right side of the header

  languageHeader?: boolean;
  // Indicates whether the header is a language header

  backHeader?: boolean;
  // Indicates whether the header is a back header

  doneText?: string;
  // Text for the done button

  doneOnPress?: () => void;
  // Function to be called when the done button is pressed

  cancelText?: string;
  // Text for the cancel button

  cancelOnPress?: () => void;
  // Function to be called when the cancel button is pressed

  isRight?: boolean;
  // Indicates whether the component is on the right side

  isLeft?: boolean;
  // Indicates whether the component is on the left side

  onPressLeft?: () => void;
  // Function to be called when the left component is pressed

  onPressRight?: () => void;
  // Function to be called when the right component is pressed

  leftText?: string;
  // Text for the left component

  rightText?: string;
  // Text for the right component

  isDelink?: boolean;
  // Indicates whether the component is a delink

  onPress?: () => void;
  // Function to be called when the component is pressed

  backIconOnly?: boolean;
  // Indicates whether only the back icon should be displayed
}
