import IPayPdfViewer from '@app/components/atoms/ipay-pdf-viewer/ipay-pdf-viewer.component';
import { SNAP_POINT, TERMS_AND_CONDITIONS_URLS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { LanguageState } from '@app/store/slices/language-slice.interface';
import { setNafathSheetVisibility, setTermsConditionsVisibility } from '@app/store/slices/nafath-verification';
import { useTypedDispatch } from '@app/store/store';
import { LanguageCode } from '@app/utilities/enums.util';
import React from 'react';
import { useSelector } from 'react-redux';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayTermsAndConditionsProps } from './ipay-terms-and-conditions.interface';

const IPayTermsAndConditions: React.FC<IPayTermsAndConditionsProps> = ({
  showTermsAndConditions,
  termsAndConditionsURL,
  isNafathTerms,
  isVirtualCardTermsAndConditions = false,
}) => {
  const localizationText = useLocalization();

  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const dispatch = useTypedDispatch();

  const closeTermsAndConditionModal = () => {
    if (isNafathTerms) {
      dispatch(
        setTermsConditionsVisibility({
          isVisible: false,
          isNafathTerms: false,
        }),
      );
      dispatch(setNafathSheetVisibility(true));
    } else {
      dispatch(
        setTermsConditionsVisibility({
          isVisible: false,
          isNafathTerms: false,
        }),
      );
    }
  };

  const getTermsAndConditionsURL = () => {
    if (termsAndConditionsURL) {
      return termsAndConditionsURL;
    }

    if (isVirtualCardTermsAndConditions) {
      if (selectedLanguage === LanguageCode.AR) {
        return TERMS_AND_CONDITIONS_URLS.VC_TERMS_AR_URL;
      }

      return TERMS_AND_CONDITIONS_URLS.VC_TERMS_EN_URL;
    }

    if (selectedLanguage === LanguageCode.AR) {
      return TERMS_AND_CONDITIONS_URLS.ALINMAPAY_REG_TERMS_AR_URL;
    }

    return TERMS_AND_CONDITIONS_URLS.ALINMAPAY_REG_TERMS_EN_URL;
  };

  return (
    <IPayPortalBottomSheet
      noGradient
      heading={localizationText.COMMON.TERMS_AND_CONDITIONS}
      simpleBar
      cancelBnt
      customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
      onCloseBottomSheet={closeTermsAndConditionModal}
      isVisible={showTermsAndConditions}
    >
      <IPayPdfViewer sourceURL={getTermsAndConditionsURL()} />
    </IPayPortalBottomSheet>
  );
};

export default IPayTermsAndConditions;
