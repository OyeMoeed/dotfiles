import { Shield } from '@app/assets/svgs';
import useTheme from '@app/styles/hooks/theme.hook';
import { variants } from '@app/utilities/enums.util';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { IPayImage, IPaySubHeadlineText, IPayView } from '@components/atoms/index';
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
  icon,
}: IPayChipProps): JSX.Element => {
  const { colors } = useTheme();
  const { textStyle, backgroundStyle } = getColorsStyle(colors, variant, headingStyles);
  const renderIcon = (): React.ReactNode => {
    if (isShowIcon) {
      return icon || <Shield fill={getForegroundColor(variant, colors)} />;
    }
    return null;
  };

  return (
    <IPayView testID={`${testID}-view-chip`} style={[backgroundStyle, containerStyle]}>
      {imageSource && <IPayImage image={imageSource} style={styles.imageStyle} />}
      {renderIcon()}
      <IPaySubHeadlineText style={textStyle} regular text={textValue} />
    </IPayView>
  );
};

export default IPayChip;