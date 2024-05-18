import React from 'react';
import { RNImage, RNSubHeadlineText, RNView } from '@components/atoms/index';
import styles, { getColorsStyle } from './rn-chip.style';
import { RNChipProps } from './rn-chip.stories.interface';
import { variants } from '@app/utilities/enums';
import { getForegroundColor } from '@app/utilities/interfaceUtils';
import Shield from '@app/assets/svgs/shield';

const RNChip: React.FC<RNChipProps> = ({
  testID,
  textValue = '',
  containerStyle = {},
  headingStyles,
  imageSource,
  variant = variants.NEUTRAL,
  isShowIcon = true,
  icon
}: RNChipProps): JSX.Element => {
  const { textStyle, backgroundStyle } = getColorsStyle(variant, headingStyles);

  return (
    <RNView testID={testID} style={[backgroundStyle, containerStyle]}>
      <RNImage image={imageSource} style={styles.imageStyle} />
      {isShowIcon ? icon || <Shield color={getForegroundColor(variant)} /> : <></>}
      <RNSubHeadlineText style={textStyle} regular text={textValue} />
    </RNView>
  );
};

export default RNChip;
