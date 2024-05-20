import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { IPayTextProps } from './ipay-text.interface';
import styles from './ipay-text.style';

/**
 * A component to display localized text.
 * @param {IPayTextProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayText: React.FC<IPayTextProps> = ({
  testID,
  text,
  style,
  numberOfLines,
  children
}: IPayTextProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Text testID={testID} numberOfLines={numberOfLines} style={[styles.textStyle, style]}>
      {text ? t(`${text}`) : children}
    </Text>
  );
};

export default IPayText;
