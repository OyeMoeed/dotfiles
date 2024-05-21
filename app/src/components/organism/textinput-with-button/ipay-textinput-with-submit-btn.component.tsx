import { IPayView } from '@components/atoms';
import { IPayButton, IPayTextInputWithHeading } from '@components/molecules';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayTextInputWithSubmitBtnProps } from './ipay-textinput-with-submit-btn.interface';
import styles from './ipay-textinput-with-submit-btn.style';

/**
 * A component consisting of a text input field and a submit button.
 * @param {IPayTextInputWithSubmitBtnProps} props - The props for the RNTextInputWithSubmitBtn component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTextInputWithSubmitBtn: React.FC<IPayTextInputWithSubmitBtnProps> = ({
  testID,
  inputTextHeading = '',
  onPressBtn,
  containerStyles = {},
  inputTextContainerStyles = {},
  inputTextHeadingStyles = {},
  inputTextStyles = {},
  btnStyle,
  btnTextStyles
}: IPayTextInputWithSubmitBtnProps): JSX.Element => {
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');

  /**
   * Handles the submit button press event.
   */
  const onPress = () => {
    onPressBtn(text);
  };

  return (
    <IPayView testID={testID} style={[styles.container, containerStyles]}>
      <IPayTextInputWithHeading
        heading={inputTextHeading}
        onChangeTextCallback={setText}
        containerStyle={inputTextContainerStyles}
        headingStyles={inputTextHeadingStyles}
        inputTextStyles={inputTextStyles}
      />
      <IPayButton onPress={onPress} btnText={t('submit')} btnStyle={btnStyle} textStyle={btnTextStyles} />
    </IPayView>
  );
};

export default IPayTextInputWithSubmitBtn;
