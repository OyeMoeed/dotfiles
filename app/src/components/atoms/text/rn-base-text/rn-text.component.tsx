import useFonts from '@app/styles/theming/fonts.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { RNTextProps } from './rn-text.interface';
import styles from './rn-text.style';

/**
 * A component to display localized text.
 * @param {RNTextProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNText: React.FC<RNTextProps> = ({
  testID,
  text,
  style,
  fontFamily,
  numberOfLines,
  children
}: RNTextProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const selectedFonts: Record<string, string | undefined> = useFonts();
  const getFontFamily: string | undefined = fontFamily !== undefined ? selectedFonts[fontFamily] : undefined;

  return (
    <Text
      testID={testID}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style, { fontFamily: getFontFamily }]}
    >
      {text ? t(`${text}`) : children}
    </Text>
  );
};

export default RNText;
