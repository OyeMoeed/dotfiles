import icons from '@app/assets/icons';
import { IPayCheckbox, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayTermsAndConditionBannerStyle from './ipay-terms-and-condition-banner.style';
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
  const localizationText = useLocalization();
  const styles = IPayTermsAndConditionBannerStyle(colors)

  return (
    <IPayView testID={`${testId}-confirmation-banner`} style={styles.termsAndConditionsParentView}>
      <IPayPressable onPress={onPress} style={styles.termsAndConitionsView}>
        <IPayView style={styles.termsAndConditionsView}>
          <IPayView style={styles.checkContainer}>
            <IPayCheckbox onPress={onCheckPress} isCheck={isCheck} />
            <IPayFootnoteText style={textStyle} text={text || localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
          </IPayView>
          <IPayIcon icon={icons.infoIcon} />
        </IPayView>
      </IPayPressable>
    </IPayView>
  );
};

export default IPayTermsAndConditionBanner;

