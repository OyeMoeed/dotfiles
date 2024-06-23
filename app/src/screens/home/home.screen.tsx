import IPayIdRenewalSheet from '@app/components/molecules/ipay-id-renewal-sheet/ipay-id-renewal-sheet.component';
import IPayProfileVerificationSheet from '@app/components/molecules/ipay-profile-sheet/ipay-profile-verification-sheet.component';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import { IPayBalanceBox, IPayBottomSheet, IPayBottomSheetHome, IPayLatestList } from '@app/components/organism/index';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS, isIpad } from '@app/utilities/constants';
import { IPayView } from '@components/atoms';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useCallback, useEffect } from 'react';
import { setItems } from '../../store/slices/rearrangement-slice';
import homeStyles from './home.style';
export const Home = () => {
  const { colors } = useTheme();
  const styles = homeStyles(colors);
  const localizationText = useLocalization();
  const ref = React.createRef<any>();
  const rearrangeRef = React.createRef<any>();
  const profileRef = React.createRef<any>();
  const verificationSheetRef = React.createRef<any>();
  const idInfoSheetRef = React.createRef<any>();
  const dispatch = useTypedDispatch();
  const localizationFlag = useTypedSelector((state) => state.localizationReducer.localizationFlag);

  const items = [
    localizationText.action_section,
    localizationText.suggested_for_you,
    localizationText.transcation_history,
    localizationText.latest_offers,
  ];

  useEffect(() => {
    // Dispatch the setItems action on initial render
    dispatch(setItems(items));
  }, []); // Empty dependency array to run the effect only once on initial render

  useEffect(() => {
    // Dispatch the setItems action whenever localizationFlag changes
    dispatch(setItems(items));
  }, [localizationFlag]); // Run the effect whenever localizationFlag changes

  const openVerificationBottomSheet = () => {
    verificationSheetRef.current.present();
  };

  const openIdInfoBottomSheet = () => {
    profileRef.current.close();
    idInfoSheetRef.current.present();
  };

  const openBottomSheet = () => {
    rearrangeRef.current.present();
  };
  const closeBottomSheet = () => {
    rearrangeRef.current.close();
  };
  const openProfileBottomSheet = () => {
    profileRef.current.present();
  };

  useFocusEffect(
    useCallback(() => {
      if (ref.current) {
        ref.current.present();
      }

      return () => {
        if (ref.current) {
          ref.current.close();
        }
      };
    }, []),
  );
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      ref.current?.present();
    } else ref.current?.forceClose();
  }, [isFocused]);
  const maxHeight = '94%';

  return (
    <IPaySafeAreaView style={styles.container} linearGradientColors={colors.appGradient.gradientSecondary40}>
      {/* ---------Top Navigation------------- */}
      <IPayView style={[styles.topNavCon]}>
        <IPayTopbar captionText={localizationText.welcome} userName={localizationText.name} />
      </IPayView>
      {/* ----------BalanceBox------------ */}
      <IPayView style={[styles.balanceCon]}>
        <IPayBalanceBox walletInfoPress={() => navigate(screenNames.WALLET)} topUpPress={() => {}} />
      </IPayView>
      {/* -------Pending Tasks--------- */}

      {isFocused && (
        <IPayBottomSheetHome
          style={styles.bottomSheetContainerStyle}
          ref={ref}
          customSnapPoint={['1%',isIpad()? '24%':'32%', maxHeight]}
        >
          <IPayLatestList openBottomSheet={openBottomSheet} openProfileBottomSheet={openProfileBottomSheet} />
        </IPayBottomSheetHome>
      )}

      {/* ------Rearrange Tasks--------- */}
      <IPayBottomSheet
        heading={localizationText.rearrange_sections}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['90%', '100%', maxHeight]}
        ref={rearrangeRef}
        simpleHeader
        cancelBnt
        doneBtn
        simpleBar
        bold
      >
        <IPayRearrangeSheet />
      </IPayBottomSheet>
      {/* -------Profile------- */}
      <IPayBottomSheet
        heading={localizationText.complete_profile_title}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['50%', '70%', maxHeight]}
        ref={profileRef}
        simpleHeader
        simpleBar
        bold
      >
        <IPayProfileVerificationSheet onPress={openIdInfoBottomSheet} />
      </IPayBottomSheet>

      {/* Id Info Renewal bottom sheet */}
      <IPayBottomSheet
        heading={localizationText.id_renewal}
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['30%', '60%', '100%']}
        ref={idInfoSheetRef}
        simpleHeader
        simpleBar
        bold
      >
        <IPayIdRenewalSheet />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};
