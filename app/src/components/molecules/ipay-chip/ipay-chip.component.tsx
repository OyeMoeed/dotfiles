import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interface-utils';
import { IPayIcon, IPayImage, IPaySubHeadlineText, IPayView } from '@components/atoms/index';
import React from 'react';
import { IPayChipProps } from './ipay-chip.interface';
import styles, { getColorsStyle } from './ipay-chip.style';

const IPayChip: React.FC<IPayChipProps> = ({
  testID,
  textValue = '',
  containerStyle = {},
  headingStyles,
  imageSource,
  variant = variants.NEUTRAL,
  isShowIcon = true,
  isShowRightIcon,
  icon,
  rightIcon,
}: IPayChipProps): JSX.Element => {
  const { colors } = useTheme();
  const { textStyle, backgroundStyle } = getColorsStyle(colors, variant, headingStyles);
  const renderIcon = (): React.ReactNode => {
    if (isShowIcon) {
      return icon || <IPayIcon icon={icons.shield_tick} color={getForegroundColor(variant, colors)} size={16} />;
    }
    return null;
  };

  const renderRightIcon = (): React.ReactNode => {
    if (isShowRightIcon) {
      return rightIcon || <IPayIcon icon={icons.remove} color={getForegroundColor(variant, colors)} size={16} />;
    }
    return null;
  };

  return (
    <IPayView testID={`${testID}-view-chip`} style={[backgroundStyle, containerStyle]}>
      {imageSource && <IPayImage image={imageSource} style={styles.imageStyle} />}
      {renderIcon()}
      <IPaySubHeadlineText style={textStyle} regular text={textValue} />
      {renderRightIcon()}
    </IPayView>
  );
};

export default IPayChip;
