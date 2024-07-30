import React from 'react';
import { IPayFootnoteText, IPayCaption1Text, IPaySubHeadlineText, IPayIcon, IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import icons from '@app/assets/icons';
import styles from './ipay-section-header.styles';
import { IPaySectionHeaderProps } from './ipay-section-header.interface';


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
  containerStyle
}) => (
  <IPayView testID={`${testID}-section-header`}  style={[styles.headerRow,containerStyle]}>
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
    <IPayView style={styles.headerRight}>
      {rightText && <IPaySubHeadlineText color={colors.primary.primary600} regular text={rightText} />}
      {showRightIcon && <IPayIcon icon={rightIcon} color={colors.primary.primary600} size={14} />}
    </IPayView>
  </IPayView>
);

export default IPaySectionHeader;
