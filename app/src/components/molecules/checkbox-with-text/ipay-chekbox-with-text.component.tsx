import { IPayCheckbox, IPayTitleWithText, IPayView } from '@app/components/atoms';
import React from 'react';
import { IPayCheckboxWithTextProps } from './ipay-chekbox-with-text.interface';
import styles from './ipay-chekbox-with-text.style';

const IPayCheckboxWithText: React.FC<IPayCheckboxWithTextProps> = ({
  checkBoxStyle,
  checkboxBackgroundColor,
  onPress,
  heading,
  text,
  testID,
  isCheck
}) => {
  return (
    <IPayView style={styles.container}>
      <IPayCheckbox
        style={checkBoxStyle}
        checkboxBackgroundColor={checkboxBackgroundColor}
        onPress={onPress}
        testID={testID ? `${testID}-checkbox` : undefined}
        isCheck={isCheck}
      />
      <IPayTitleWithText heading={heading} text={text} />
    </IPayView>
  );
};

export default IPayCheckboxWithText;
