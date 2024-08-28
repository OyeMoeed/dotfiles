import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import { IPayNafathVerification } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { closeNafathSheet, closeProfileSheet, openNafathSheet } from '@app/store/slices/nafath-verification';
import { AppDispatch, RootState, useTypedSelector } from '@store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IPayPortalBottomSheet from '../ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayBottomSheetProviderProps } from './ipay-bottomsheet-provider.interface';

const IPayBottomSheetProvider: React.FC<IPayBottomSheetProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const localizationText = useLocalization();
  const isProfileSheetVisible = useTypedSelector(
    (state: RootState) => state.nafathVerificationReducer.isProfileSheetVisible,
  );
  const isNafathSheetVisible = useSelector((state: RootState) => state.nafathVerificationReducer.isNafathSheetVisible);

  const onCloseProfileSheet = () => {
    dispatch(closeProfileSheet());
  };

  const onOpenNafathSheet = () => {
    dispatch(openNafathSheet());
  };

  const onCloseNafathSheet = () => {
    dispatch(closeNafathSheet());
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
        enablePanDownToClose={true}
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
    </>
  );
};

export default IPayBottomSheetProvider;
