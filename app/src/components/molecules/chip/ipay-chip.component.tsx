import Shield from '@app/assets/svgs/shield';
import { variants } from '@app/utilities/enums';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import { IPayImage, IPaySubHeadlineText, IPayView } from '@components/atoms/index';
import React from 'react';
import { IPayChipProps } from './ipay-chip.stories.interface';
import styles, { getColorsStyle } from './ipay-chip.style';

const IPayChip: React.FC<IPayChipProps> = ({
  testID,
  textValue = '',
  containerStyle = {},
  headingStyles,
  imageSource,
  variant = variants.NEUTRAL,
  isShowIcon = true,
  icon
}: IPayChipProps): JSX.Element => {
  const { textStyle, backgroundStyle } = getColorsStyle(variant, headingStyles);

  return (
    <IPayView testID={testID} style={[backgroundStyle, containerStyle]}>
      <IPayImage image={imageSource} style={styles.imageStyle} />
      {isShowIcon ? icon || <Shield color={getForegroundColor(variant)} /> : <></>}
      <IPaySubHeadlineText style={textStyle} regular text={textValue} />
    </IPayView>
  );
};

export default IPayChip;
