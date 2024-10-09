import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import { States } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interface-utils';
import { IPayIcon, IPayImage, IPaySubHeadlineText, IPayView } from '@components/atoms/index';
import React, { JSX } from 'react';
import { IPayChipProps } from './ipay-chip.interface';
import { getColorsStyle, styles } from './ipay-chip.style';

const IPayChip: React.FC<IPayChipProps> = ({
  testID,
  textValue = '',
  containerStyle = {},
  headingStyles,
  imageSource,
  variant = States.NEUTRAL,
  isShowIcon = true,
  icon,
  textElement,
  fullWidth,
  chipTextStyle,
  shouldTranslatedText = true,
}: IPayChipProps): JSX.Element => {
  const { colors } = useTheme();
  const { textStyle, backgroundStyle } = getColorsStyle(colors, variant, headingStyles);
  const renderIcon = (): React.ReactNode => {
    if (isShowIcon) {
      return icon || <IPayIcon icon={icons.shield_tick} color={getForegroundColor(variant, colors)} size={16} />;
    }
    return null;
  };

  return (
    <IPayView testID={`${testID}-view-chip`} style={[backgroundStyle, fullWidth && styles.width100, containerStyle]}>
      {imageSource && <IPayImage image={imageSource} style={styles.imageStyle} />}
      {renderIcon()}
      {textElement || (
        <IPaySubHeadlineText
          style={[textStyle, chipTextStyle]}
          regular
          text={textValue}
          shouldTranslate={shouldTranslatedText}
        />
      )}
    </IPayView>
  );
};

export default IPayChip;
