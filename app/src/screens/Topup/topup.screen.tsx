import { IPayHeader } from '@app/components/molecules';
import IPayExpiredCardSheet from '@app/components/molecules/ipay-expirdecard-sheet/ipay-expiredcard-sheet.component';
import { IPayBottomSheet } from '@app/components/organism';
import IPayAmount from '@app/components/organism/ipay-amount-component/ipay-amount-component';
import { IPayAddCardBottomsheet, IPaySafeAreaView } from '@app/components/templates';
import IPayExpBottomSheet from '@app/components/templates/ipay-cvv-bottomsheet/ipay-exp-bottomsheet.component';
import IPayExpiryDateSheet from '@app/components/templates/ipay-expirydate-sheet/ipay-expirydate-sheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';

import screenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import { InfoTypes } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

const TopUp = () => {
  // Get today's date and format it as 'MM/YY'
  const today = new Date();
  const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(2)}`;
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
    const [selectedCard, setSelectedCard] = useState({});
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

    const handleCardSelect = (cardKey: number | null) => {
    setSelectedCard(cardKey);
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={screenNames.TOP_UP} applyFlex />

      <IPayAmount
        onPressAddCards={openAddCardBottomSheet}
        channel={variant}
        openPressExpired={openExpiredBottomSheet}
        expiryOnPress={openExpirationBottomSheet}
        openExpiredDateBottomSheet={openExpiredDateBottomSheet}
        walletInfo={walletInfo}
        handleCardSelect={handleCardSelect}
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
        <IPayExpBottomSheet type={InfoTypes.EXPIRY} />
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
        <IPayExpBottomSheet type={InfoTypes.CVV} />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.add_card}
        cancelBnt
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={['10%', '85%']}
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
        selectedCard={selectedCard}
      />
    </IPaySafeAreaView>
  );
};
export default TopUp;
