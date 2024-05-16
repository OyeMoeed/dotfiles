import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import styles from './rn-text.style';
import { RNTextProps } from './rn-text.interface';

/**
 * A component to display localized text.
 * @param {RNTextProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNText: React.FC<RNTextProps> = ({ testID, text, style, numberOfLines, children }: RNTextProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <Text testID={testID} numberOfLines={numberOfLines} style={[styles.textStyle, style]}>
      {text ? t(`${text}`) : children}
    </Text>
  );
};

export default RNText;
