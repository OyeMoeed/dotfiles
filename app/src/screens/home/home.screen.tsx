import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayView } from '@components/atoms';
import styles from './home.style';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import IPayBalanceBox from '@app/components/organism/ipay-balance/ipay-balancebox.comonent';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayBottomSheetHome from '@app/components/organism//ipay-bottom-sheet-home/ipay-bottom-sheet-home.component';
import React, { useEffect } from 'react';
import IPayLatestList from '@app/components/organism/ipay-latest-section/ipay-latest-section.component';
import IPayRearrangeSheet from '@app/components/molecules/ipay-re-arrange-sheet/ipay-re-arrange-sheet.component';
import IPayBottomSheet from '@app/components/molecules/ipay-bottom-sheet/ipay-bottom-sheet.component';

const Home = () => {
  const localizationText = useLocalization();
  const ref = React.createRef<any>();
  const rearrangeRef = React.createRef<any>();
  const openBottomSheet = () => {
    rearrangeRef.current.present();
  };
  const closeBottomSheet = () => {
    rearrangeRef.current.close();
  };
  useEffect(() => {
    ref.current.present();
    return;
  }, []);
  return (
    <IPaySafeAreaView style={styles.container}>
      {/* ---------Top Navigation------------- */}
      <IPayView style={styles.topNavCon}>
        <IPayTopbar captionText={localizationText.welcome} userName={localizationText.name} />
      </IPayView>
      {/* ----------BalanceBox------------ */}
      <IPayView style={styles.balanceCon}>
        <IPayBalanceBox walletInfoPress={() => console.log('wallet')} topUpPress={() => console.log('TopUp')} />
      </IPayView>
      {/* -------Pending Tasks--------- */}
      <IPayBottomSheetHome style={styles.bottomSheetContainerStyle} ref={ref}>
        <IPayLatestList openBottomSheet={openBottomSheet} />
      </IPayBottomSheetHome>
      {/* ------Rearrange Tasks--------- */}
      <IPayBottomSheet
        heading="Rearrange sections"
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['80%', '100%', '100%']}
        ref={rearrangeRef}
        simpleHeaderBar
      >
        {/* Re-arrange List */}
        <IPayRearrangeSheet />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default Home;
