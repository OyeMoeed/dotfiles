import { IPayFootnoteText, IPayHeadlineText } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setTermsConditionsVisibility } from '@app/store/slices/nafath-verification';
import { useTypedDispatch } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import termsAndConditionsStyles from './ipay-terms-and-conditions.style';

interface IPayTermsAndConditionsProps {
  isVisible: boolean;
}

const IPayTermsAndConditions: React.FC<IPayTermsAndConditionsProps> = ({ isVisible = false }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = termsAndConditionsStyles(colors);
  const dispatch = useTypedDispatch();

  const closeTermsAndConditionModal = () => {
    dispatch(setTermsConditionsVisibility(false));
  };

  return (
    <IPayPortalBottomSheet
      noGradient
      heading={localizationText.COMMON.TERMS_AND_CONDITIONS}
      enablePanDownToClose
      cancelBnt
      simpleBar
      customSnapPoint={['90%', '90%']}
      onCloseBottomSheet={closeTermsAndConditionModal}
      isVisible={isVisible}
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
    </IPayPortalBottomSheet>
  );
};

export default IPayTermsAndConditions;
