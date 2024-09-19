import icons from '@app/assets/icons';
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import termsAndConditionBannerStyle from './ipay-terms-and-condition-banner.style';
import { IPayTermsAndConditionBannerProps } from './ipay-terms-and-conditions-banner.interface';

const IPayTermsAndConditionBanner: React.FC<IPayTermsAndConditionBannerProps> = ({
  onPress,
  text,
  textStyle,
  onCheckPress,
  isCheck,
  testId,
}) => {
  const { colors } = useTheme();
  const styles = termsAndConditionBannerStyle(colors);

  return (
    <IPayView testID={`${testId}-confirmation-banner`} style={styles.termsAndConditionsParentView}>
      <IPayPressable onPress={onPress} style={styles.termsAndConitionsView}>
        <IPayView style={styles.termsAndConditionsView}>
          <IPayView style={styles.checkContainer}>
            <IPayCheckbox onPress={onCheckPress} isCheck={isCheck} />
            <IPayFootnoteText style={textStyle} text={text || 'COMMON.TERMS_AND_CONDITIONS_TEXT'} />
          </IPayView>
          <IPayIcon icon={icons.infoIcon} />
        </IPayView>
      </IPayPressable>
    </IPayView>
  );
};

export default IPayTermsAndConditionBanner;
