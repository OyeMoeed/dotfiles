import { IPayHeader } from '@app/components/molecules';
import IPayExpiredCardSheet from '@app/components/molecules/ipay-expirdecard-sheet/ipay-expiredcard-sheet.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayAmount from '@app/components/organism/ipay-amount-component/ipay-amount-component';
import { IPayAddCardBottomsheet, IPayCvvBottomSheet, IPaySafeAreaView } from '@app/components/templates';
import IPayExpBottomSheet from '@app/components/templates/ipay-cvv-bottomsheet/ipay-exp-bottomsheet.component';
import IPayExpiryDateSheet from '@app/components/templates/ipay-expirydate-sheet/ipay-expirydate-sheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';

import screenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

const TopUp = () => {
  const amounts = [
    { value: 50, text: '50' },
    { value: 100, text: '100' },
    { value: 500, text: '500' }
  ];

  // Get today's date and format it as 'MM/YY'
  const today = new Date();
  const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(2)}`;
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const localizationText = useLocalization();
  const route = useRoute();
  const { variant } = route.params;
  const expirationRef = React.createRef<any>();
  const cvvRef = React.createRef<any>();
  const expiryDateRef = React.createRef<any>();
  const addCardRef = React.createRef<any>();

  const closeExpirationBottomSheet = () => {
    expirationRef.current?.close();
  };

  const openExpirationBottomSheet = () => {
    expirationRef.current?.present();
  };

  const openExpiredDateBottomSheet = () => {
    expiryDateRef.current?.present();
  };

  const closeExpiredBottomSheet = () => {
    expiryDateRef.current?.close();
  };

  const closeCvvBottomSheet = () => {
    cvvRef.current?.close();
  };

  const openCvvBottomSheet = () => {
    console.log('asmdas');

    cvvRef.current?.present();
  };
  const openAddCardBottomSheet = () => {
    addCardRef.current.present();
  };

  const closeBottomSheet = () => {
    addCardRef.current.close();
  };
  const expiratedRef = React.createRef<any>();
  const openExpiredBottomSheet = () => {
    expiratedRef.current.present();
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={screenNames.TOP_UP} applyFlex />

      <IPayAmount
        expiryOnPress={openExpirationBottomSheet}
        openExpiredDateBottomSheet={openExpiredDateBottomSheet}
        cvvPress={openCvvBottomSheet}
        selectedDate={selectedDate}
        onPressAddCards={openAddCardBottomSheet}
        channel={variant} // Pass the extracted channel (variant)
        amounts={amounts}
        openPressExpired={openExpiredBottomSheet}
        walletInfo={walletInfo}
      />

      <IPayExpiryDateSheet
        selectedDate={selectedDate}
        ref={expiryDateRef}
        setSelectedDate={setSelectedDate}
        closeExpiredBottomSheet={closeExpiredBottomSheet}
      />

      <IPayBottomSheet
        heading={localizationText.date}
        onCloseBottomSheet={closeExpirationBottomSheet}
        customSnapPoint={['10%', '40%']}
        enableDynamicSizing
        ref={expirationRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
      >
        <IPayExpBottomSheet />
      </IPayBottomSheet>

      <IPayBottomSheet
        heading={localizationText.cvv}
        onCloseBottomSheet={closeCvvBottomSheet}
        customSnapPoint={['10%', '40%']}
        enableDynamicSizing
        ref={cvvRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
      >
        <IPayCvvBottomSheet />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.add_card}
        cancelBnt
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['10%', '80%']}
        enableDynamicSizing
        ref={addCardRef}
        simpleBar
        enablePanDownToClose
        simpleHeader
        bold
      >
        <IPayAddCardBottomsheet
          closeBottomSheet={closeBottomSheet}
          expiryOnPress={openExpirationBottomSheet}
          openExpiredDateBottomSheet={openExpiredDateBottomSheet}
          cvvPress={openCvvBottomSheet}
          selectedDate={selectedDate}
        />
      </IPayBottomSheet>
      <IPayExpiredCardSheet
        expiryOnPress={openExpirationBottomSheet}
        openExpiredDateBottomSheet={openExpiredDateBottomSheet}
        cvvPress={openCvvBottomSheet}
        selectedDate={selectedDate}
        ref={expiratedRef}
      />
    </IPaySafeAreaView>
  );
};
export default TopUp;
