import useTheme from '@app/styles/hooks/theme.hook';
import useFonts from '@app/styles/theming/fonts.hook';

import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { JSX } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { isNumber, isUpperCase } from '@app/utilities';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { IPayTextProps } from './ipay-text.interface';
import styles from './ipay-text.style';

/**
 * A component to display localized text.
 * @param {RNTextProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayText: React.FC<IPayTextProps> = ({
  testID,
  text,
  style,
  fontFamily,
  numberOfLines,
  children,
  isAmount,
  varient = 'primary',
  fontWeight,
  shouldTranslate = true,
  isLoading,
}: IPayTextProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const selectedFonts: Record<string, string | undefined> = useFonts();
  const getFontFamily: string | undefined = fontFamily !== undefined ? selectedFonts[fontFamily] : undefined;
  const baseTextStyles = styles(getFontFamily as string, colors);

  const isChildrenString = typeof children === 'string' || typeof text === 'string';
  const mainText = children ? String(children) : text || '';
  const formattedText = isAmount ? formatNumberWithCommas(mainText || '') : mainText;
  const isNeedTranslate =
    !isNumber(formattedText) && isUpperCase(formattedText) && formattedText?.length !== 0 && formattedText?.length > 1;
  const showText = isNeedTranslate && shouldTranslate ? t(formattedText) : formattedText;

  if (isLoading) {
    return <IPaySkeletonBuilder variation={IPaySkeletonEnums.TEXT} isLoading={isLoading} />;
  }

  return (
    <Text
      testID={`${testID}-base-text`}
      numberOfLines={numberOfLines}
      style={[baseTextStyles.textStyle, baseTextStyles[varient], { fontFamily: getFontFamily }, { fontWeight }, style]}
    >
      {isChildrenString ? showText : children}
    </Text>
  );
};

export default IPayText;
