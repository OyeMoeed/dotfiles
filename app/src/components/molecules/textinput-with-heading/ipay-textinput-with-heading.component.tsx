import { IPayText, IPayTextInput, IPayView } from '@components/atoms/index';
import React, { useState } from 'react';
import { IPayTextInputWithHeadingProps } from './ipay-textinput-with-heading.interface';
import styles from './ipay-textinput-with-heading.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayTextInputWithHeadingProps} props - The props for the RNTextInputWithHeading component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTextInputWithHeading: React.FC<IPayTextInputWithHeadingProps> = ({
  testID,
  heading = '',
  containerStyle = {},
  headingStyles = {},
  inputTextStyles = {},
  onChangeTextCallback
}: IPayTextInputWithHeadingProps): JSX.Element => {
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
    <IPayView testID={`${testID}-view-textinput`} style={[styles.container, containerStyle]}>
      <IPayText text={heading} style={[headingStyles]} />
      <IPayTextInput text={text} onChangeText={onChangeText} style={[inputTextStyles]} />
    </IPayView>
  );
};

export default IPayTextInputWithHeading;
