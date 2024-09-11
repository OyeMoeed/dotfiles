import { IPayFootnoteText, IPayHeadlineText } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import constants from '@app/constants/constants';
import { IPayBottomSheet } from '@components/organism/index';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import termsAndConditionsStyles from './ipay-terms-and-conditions.style';
import { IPayTermsAndConditionsProps } from './ipay-terms-and-conditions.interface';

const IPayTermsAndConditions: React.FC<IPayTermsAndConditionsProps> = forwardRef((_, ref) => {
  const styles = termsAndConditionsStyles();
  const termsAndConditionSheetRef = useRef<any>(null);

  const showTermsAndConditions = () => {
    termsAndConditionSheetRef?.current?.present();
  };

  useImperativeHandle(ref, () => ({
    showTermsAndConditions,
  }));

  return (
    <IPayBottomSheet
      noGradient
      heading="COMMON.TERMS_AND_CONDITIONS"
      enablePanDownToClose
      cancelBnt
      simpleBar
      customSnapPoint={['1%', '99%']}
      onCloseBottomSheet={() => {}}
      ref={termsAndConditionSheetRef}
      bold
    >
      <IPayScrollView showsVerticalScrollIndicator={false} style={styles.termsAndConditions}>
        <IPayHeadlineText
          regular={false}
          style={styles.termsAndConditionsHeading}
          text="COMMON.TERMS_AND_CONDITIONS_HEADING"
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
