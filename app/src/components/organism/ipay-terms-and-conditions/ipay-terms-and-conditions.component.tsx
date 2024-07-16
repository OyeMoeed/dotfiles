import { IPayFootnoteText, IPayHeadlineText } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayBottomSheet } from '@components/organism/index';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import termsAndConditionsStyles from './ipay-terms-and-conditions.style';
import { IPayTermsAndConditionsProps } from './ipay-terms-and-conditions.interface';

const IPayTermsAndConditions: React.FC<IPayTermsAndConditionsProps> = forwardRef((_, ref) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = termsAndConditionsStyles(colors);
  const termsAndConditionSheetRef = useRef<any>(null);

  const showTermsAndConditions = () => {
    termsAndConditionSheetRef?.current?.present();
  };

  useImperativeHandle(ref, () => ({
    showTermsAndConditions,
  }));

  return (
    <IPayBottomSheet
      heading={localizationText.COMMON.TERMS_AND_CONDITIONS}
      enablePanDownToClose
      cancelBnt
      simpleBar
      customSnapPoint={['1%', '100%']}
      onCloseBottomSheet={() => {}}
      ref={termsAndConditionSheetRef}
      bold
    >
      <IPayScrollView showsVerticalScrollIndicator={false} style={styles.termsAndConditions}>
        <IPayHeadlineText
          regular={false}
          style={styles.termsAndConditionsHeading}
          text={localizationText.COMMON.TERMS_AND_CONDITIONS_HEADING}
        />
        <IPayFootnoteText
          regular
          text={constants.TERMS_AND_CODITIONS_DUMMY_TEXT}
          style={styles.termsAndConditionsText}
        />
      </IPayScrollView>
    </IPayBottomSheet>
  );
});

export default IPayTermsAndConditions;
