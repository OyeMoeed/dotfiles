import { RNView } from '@components/atoms';
import { RNButton, RNTextInputWithHeading } from '@components/molecules';
import React, { useState } from 'react';
import { RNTextInputWithSubmitBtnProps } from './rn-textinput-with-submit-btn.interface';
import styles from './rn-textinput-with-submit-btn.style';

/**
 * A component consisting of a text input field and a submit button.
 * @param {RNTextInputWithSubmitBtnProps} props - The props for the RNTextInputWithSubmitBtn component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNTextInputWithSubmitBtn: React.FC<RNTextInputWithSubmitBtnProps> = ({
  testID,
  inputTextHeading = 'Enter your name',
  onPressBtn,
  containerStyles = {},
  inputTextContainerStyles = {},
  inputTextHeadingStyles = {},
  inputTextStyles = {},
  btnStyle,
  btnTextStyles
}: RNTextInputWithSubmitBtnProps): JSX.Element => {
  const [text, setText] = useState<string>('');

  /**
   * Handles the submit button press event.
   */
  const onPress = () => {
    onPressBtn(text);
  };

  return (
    <RNView testID={testID} style={[styles.container, containerStyles]}>
      <RNTextInputWithHeading
        heading={inputTextHeading}
        onChangeTextCallback={setText}
        containerStyle={inputTextContainerStyles}
        headingStyles={inputTextHeadingStyles}
        inputTextStyles={inputTextStyles}
      />
      <RNButton onPress={onPress} btnText="Submit" btnStyle={btnStyle} textStyle={btnTextStyles} />
    </RNView>
  );
};

export default RNTextInputWithSubmitBtn;
