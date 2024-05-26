import { IPayView } from '@components/atoms';
import { IPayButton, IPayTextInputWithHeading } from '@components/molecules';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayTextInputWithBtnProps } from './ipay-textinput-with-btn.interface';
import styles from './ipay-textinput-with-btn.style';

/**
 * A component consisting of a text input field and a submit button.
 * @param {IPayTextInputWithBtnProps} props - The props for the RNTextInputWithSubmitBtn component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTextInputWithBtn: React.FC<IPayTextInputWithBtnProps> = ({
  testID,
  inputTextHeading = '',
  onPressBtn,
  containerStyles = {},
  inputTextContainerStyles = {},
  inputTextHeadingStyles = {},
  inputTextStyles = {},
  btnStyle,
  btnTextStyles
}: IPayTextInputWithBtnProps): JSX.Element => {
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

export default IPayTextInputWithBtn;
