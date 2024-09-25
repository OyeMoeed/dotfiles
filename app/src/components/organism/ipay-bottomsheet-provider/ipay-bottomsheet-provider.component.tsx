import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import { IPayNafathVerification } from '@app/components/templates';
import IPayIdRenewalSheet from '@app/components/templates/ipay-id-renewal-sheet/ipay-id-renewal-sheet.component';
import { setNafathSheetVisibility, setProfileSheetVisibility } from '@app/store/slices/bottom-sheets-slice';
import { AppDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayTermsAndConditions from '../ipay-terms-and-conditions/ipay-terms-and-conditions.component';
import IPayBottomSheetProviderProps from './ipay-bottomsheet-provider.interface';

const IPayBottomSheetProvider: React.FC<IPayBottomSheetProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isTermsConditionsVisible = useTypedSelector((state) => state.bottomSheetReducer.isTermsConditionsVisible);
  const termsAndConditionsURL = useTypedSelector((state) => state.bottomSheetReducer.termsAndConditionsURL);
  const isNafathTerms = useTypedSelector((state) => state.bottomSheetReducer.isNafathTerms);
  const isProfileSheetVisible = useTypedSelector((state) => state.bottomSheetReducer.isProfileSheetVisible);
  const isNafathSheetVisible = useTypedSelector((state) => state.bottomSheetReducer.isNafathSheetVisible);
  const isVirtualCardTermsAndConditions = useTypedSelector(
    (state) => state.bottomSheetReducer.isVirtualCardTermsAndConditions,
  );

  const onCloseProfileSheet = () => {
    dispatch(setProfileSheetVisibility(false));
  };

  const onOpenNafathSheet = () => {
    dispatch(setNafathSheetVisibility(true));
  };

  const onCloseNafathSheet = () => {
    dispatch(setNafathSheetVisibility(false));
  };

  return (
    <>
      {children}

      <IPayPortalBottomSheet
        onCloseBottomSheet={onCloseProfileSheet}
        customSnapPoint={['50%', '56%', '85%']}
        simpleHeader
        heading="HOME.COMPLETE_YOUR_PROFILE"
        simpleBar
        bold
        enablePanDownToClose
        isVisible={isProfileSheetVisible}
      >
        <IPayProfileVerificationSheet onPress={onOpenNafathSheet} />
      </IPayPortalBottomSheet>

      <IPayPortalBottomSheet
        heading="COMMON.INDENTITY_VERIFICATION"
        onCloseBottomSheet={onCloseNafathSheet}
        customSnapPoint={['92%', '92%']}
        simpleBar
        cancelBnt
        bold
        isVisible={isNafathSheetVisible}
      >
        <IPayNafathVerification onComplete={onCloseNafathSheet} />
      </IPayPortalBottomSheet>

      <IPayTermsAndConditions
        isVirtualCardTermsAndConditions={isVirtualCardTermsAndConditions}
        termsAndConditionsURL={termsAndConditionsURL}
        showTermsAndConditions={isTermsConditionsVisible}
        isNafathTerms={isNafathTerms}
      />

      <IPayIdRenewalSheet />
    </>
  );
};

export default IPayBottomSheetProvider;
