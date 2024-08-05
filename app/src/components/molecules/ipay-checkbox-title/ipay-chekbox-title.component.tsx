import { IPayCheckbox, IPayTitleAssistive, IPayView } from '@app/components/atoms';
import React from 'react';
import { IPayCheckboxTitleProps } from './ipay-chekbox-title.interface';
import styles from './ipay-chekbox-title.style';

const IPayCheckboxTitle: React.FC<IPayCheckboxTitleProps> = ({
  checkBoxStyle,
  checkboxBackgroundColor,
  onPress,
  heading,
  text,
  testID,
  isCheck,
  style,
}) => (
  <IPayView style={[styles.container, style]}>
    <IPayCheckbox
      style={checkBoxStyle}
      checkboxBackgroundColor={checkboxBackgroundColor}
      onPress={onPress}
      testID={testID ? `${testID}-checkbox` : undefined}
      isCheck={isCheck}
    />
    <IPayTitleAssistive heading={heading} text={text} />
  </IPayView>
);

export default IPayCheckboxTitle;
