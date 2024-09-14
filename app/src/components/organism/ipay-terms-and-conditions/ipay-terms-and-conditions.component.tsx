import IPayPdfViewer from '@app/components/atoms/ipay-pdf-viewer/ipay-pdf-viewer.component';
import { SNAP_POINT, TERMS_AND_CONDITIONS_URLS } from '@app/constants/constants';
import { LanguageState } from '@app/store/slices/language-slice.interface';
import { LanguageCode } from '@app/utilities/enums.util';
import React from 'react';
import { useSelector } from 'react-redux';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayTermsAndConditionsProps } from './ipay-terms-and-conditions.interface';

const IPayTermsAndConditions: React.FC<IPayTermsAndConditionsProps> = ({
  showTermsAndConditions,
  setShowTermsAndConditions,
  termsAndConditionsURL,
  isVirtualCardTermsAndConditions = false,
}) => {
  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

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
      heading="COMMON.TERMS_AND_CONDITIONS"
      enablePanDownToClose
      simpleBar
      cancelBnt
      customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
      onCloseBottomSheet={() => {
        setShowTermsAndConditions(false);
      }}
      isVisible={showTermsAndConditions}
    >
      <IPayPdfViewer sourceURL={getTermsAndConditionsURL()} />
    </IPayPortalBottomSheet>
  );
};

export default IPayTermsAndConditions;
