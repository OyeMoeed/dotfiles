import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import { IPayNafathVerification } from '@app/components/templates';
import IPayIdRenewalSheet from '@app/components/templates/ipay-id-renewal-sheet/ipay-id-renewal-sheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { toggleNafathSheet, toggleProfileSheet } from '@app/store/slices/nafath-verification';
import { closeIdRenewalSheet } from '@app/store/slices/wallet-info-slice';
import { AppDispatch, RootState, useTypedSelector } from '@store/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayBottomSheetProviderProps } from './ipay-bottomsheet-provider.interface';

const IPayBottomSheetProvider: React.FC<IPayBottomSheetProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const localizationText = useLocalization();
  const isProfileSheetVisible = useTypedSelector(
    (state: RootState) => state.nafathVerificationReducer.isProfileSheetVisible,
  );
  const isNafathSheetVisible = useTypedSelector((state) => state.nafathVerificationReducer.isNafathSheetVisible);
  const isIdRenewalSheetVisible = useTypedSelector(
    (state) => state.walletInfoReducer.walletInfo.isIdRenewalSheetVisible,
  );

  const onCloseProfileSheet = () => {
    dispatch(toggleProfileSheet());
  };

  const onOpenNafathSheet = () => {
    dispatch(toggleNafathSheet());
  };

  const onCloseNafathSheet = () => {
    dispatch(toggleNafathSheet());
  };

  const onCloseRenewalIdSheet = () => {
    dispatch(closeIdRenewalSheet());
  };

  return (
    <>
      {children}

      <IPayPortalBottomSheet
        onCloseBottomSheet={onCloseProfileSheet}
        customSnapPoint={['50%', '56%', '85%']}
        simpleHeader
        heading={localizationText.HOME.COMPLETE_YOUR_PROFILE}
        simpleBar
        bold
        enablePanDownToClose
        isVisible={isProfileSheetVisible}
      >
        <IPayProfileVerificationSheet onPress={onOpenNafathSheet} />
      </IPayPortalBottomSheet>

      <IPayPortalBottomSheet
        heading={localizationText.COMMON.INDENTITY_VERIFICATION}
        onCloseBottomSheet={onCloseNafathSheet}
        customSnapPoint={['92%', '92%']}
        simpleBar
        cancelBnt
        bold
        isVisible={isNafathSheetVisible}
      >
        <IPayNafathVerification onComplete={onCloseNafathSheet} />
      </IPayPortalBottomSheet>

      <IPayIdRenewalSheet onClose={onCloseRenewalIdSheet} visible={isIdRenewalSheetVisible} />
    </>
  );
};

export default IPayBottomSheetProvider;
