import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayText, IPayView } from '@components/atoms';
import styles from './marketplace.style';
import IPayTopbar from '@app/components/molecules/ipay-topbar/ipay-topbar.component';
import IPayBalanceBox from '@app/components/organism/ipay-balance/ipay-balancebox.comonent';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayBottomSheetHome from '@app/components/organism//ipay-bottom-sheet-home/ipay-bottom-sheet-home.component';
import React, { useEffect } from 'react';
import IPayLatestList from '@app/components/organism/ipay-latest-section/ipay-latest-section.component';

const MarketPlace = () => {

  return (
    <IPaySafeAreaView style={styles.container}>
     <IPayText>marketplace</IPayText>
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
