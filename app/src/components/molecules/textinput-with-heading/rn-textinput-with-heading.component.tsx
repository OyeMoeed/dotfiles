import React, { useState } from 'react';
import { RNText, RNTextInput, RNView } from '@components/atoms/index';
import styles from './rn-textinput-with-heading.style';
import { RNTextInputWithHeadingProps } from './rn-textinput-with-heading.stories.interface';

/**
 * A component consisting of a heading and an input field.
 * @param {RNTextInputWithHeadingProps} props - The props for the RNTextInputWithHeading component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNTextInputWithHeading: React.FC<RNTextInputWithHeadingProps> = ({
  testID,
  heading = 'Enter Name',
  containerStyle,
  headingStyles,
  inputTextStyles,
  onChangeTextCallback
}: RNTextInputWithHeadingProps): JSX.Element => {
  const [text, setText] = useState<string>('');

  /**
   * Handles the text change event in the input field.
   * @param {string} txt - The new text entered in the input field.
   */
  const onChangeText = (txt: string): void => {
    setText(txt);
    onChangeTextCallback && onChangeTextCallback(txt);
  };

  return (
    <RNView testID={testID} style={[styles.container, containerStyle]}>
      <RNText text={heading} style={[headingStyles]} />
      <RNTextInput text={text} onChangeText={onChangeText} style={[inputTextStyles]} />
    </RNView>
  );
};

export default RNTextInputWithHeading;
