import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPaySectionHeaderProps } from './ipay-section-header.interface';
import sectionHeaderStyles from './ipay-section-header.styles';

const IPaySectionHeader: React.FC<IPaySectionHeaderProps> = ({
  leftText,
  isLeftTextRegular = false,
  leftTextColor,
  subText,
  rightText,
  subTextColor = colors.warning.warning500,
  showRightIcon = false,
  rightIcon = icons.arrow_right_square,
  showDotBeforeSubtext = false,
  testID,
  onRightOptionPress,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const styles = sectionHeaderStyles(colors);
  return (
    <IPayView testID={`${testID}-section-header`} style={[styles.headerRow, containerStyle]}>
      <IPayView style={styles.headerLeft}>
        <IPayFootnoteText color={leftTextColor} style={styles.headerText} regular={isLeftTextRegular}>
          {leftText}
        </IPayFootnoteText>
        {subText && (
          <>
            {showDotBeforeSubtext && <IPayView style={styles.dotView} />}
            <IPayCaption1Text color={subTextColor} regular text={subText} />
          </>
        )}
      </IPayView>
      <IPayPressable style={styles.headerRight} onPress={onRightOptionPress}>
        {rightText && <IPaySubHeadlineText color={colors.primary.primary600} regular text={rightText} />}
        {showRightIcon && <IPayIcon icon={rightIcon} color={colors.primary.primary600} size={14} />}
      </IPayPressable>
    </IPayView>
  );
};

export default IPaySectionHeader;
