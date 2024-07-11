import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetailsSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import IPayCardPinCode from '@app/components/templates/ipay-card-pin-code/ipay-card-pin-code.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { CAROUSEL_MODES } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import cardData from './cards.constant';
import cardScreenStyles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const pinCode = '1234'; // TODO update with saved pin
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const pinCodeBottomSheetRef = useRef<any>(null);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;

  const newCard = (
    <IPayView style={styles.newCardWrapper}>
      <IPayButton
        btnType="outline"
        btnText={localizationText.CARDS.NEW_CARD}
        rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
      />
    </IPayView>
  );

  const onClosePinCodeSheet = () => {
    pinCodeBottomSheetRef.current.close();
  };

  useEffect(() => {
    onopenPinCodeSheet();
  }, []);

  const onopenPinCodeSheet = () => {
    pinCodeBottomSheetRef.current.present();
  };

  const renderErrorToast = () => {
    showToast({
      title: localizationText.CARDS.INCORRECT_CODE,
      subTitle: localizationText.CARDS.VERIFY_CODE_ACCURACY,
      containerStyle: styles.toast,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onVerifyPin = () => {};

  const onEnterPassCode = (enteredCode: string) => {
    if (passcodeError) {
      setPasscodeError(false);
    }
    if (enteredCode.length !== 4) return;
    if (enteredCode === pinCode) {
      onVerifyPin();
    } else {
      setPasscodeError(true);
      renderErrorToast();
    }
  };

  return (
    <IPaySafeAreaView testID="ipay-safearea" style={styles.container}>
      <IPayView style={styles.topDetails}>
        <IPayTitle2Text regular={false}>{localizationText.CARDS.CARDS}</IPayTitle2Text>
        <IPayButton
          btnType="outline"
          btnText={localizationText.CARDS.NEW_CARD}
          rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
        />
      </IPayView>
      {cardData.length ? (
        <>
          <IPayView style={styles.cardsContainer}>
            <IPayCarousel
              data={cardData}
              modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
              mode={CAROUSEL_MODES.PARALLAX}
              width={SCREEN_WIDTH}
              loop={false}
              height={verticalScale(350)}
              renderItem={({ item }) => <IPayATMCard setBoxHeight={setBoxHeight} card={item as CardInterface} />}
            />
          </IPayView>
          {boxHeight > 0 && (
            <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
              <IPayCardDetailsSection />
            </IPayCustomSheet>
          )}
        </>
      ) : (
        <IPayView style={styles.noResultContainer}>
          <IPayNoResult
            testID="no-result"
            textColor={colors.primary.primary800}
            message={localizationText.CARDS.YOU_DO_NOT_HAVE_CARD}
            showEmptyBox
          />
          <IPayButton
            btnStyle={styles.buttonStyle}
            btnText={localizationText.CARDS.CREATE_NEW_CARD}
            btnType="primary"
            large
            leftIcon={<IPayIcon icon={icons.add} size={20} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
      <IPayBottomSheet
        heading={localizationText.CARDS.CARD_DETAILS}
        customSnapPoint={['1%', '95%']}
        onCloseBottomSheet={onClosePinCodeSheet}
        ref={pinCodeBottomSheetRef}
        simpleBar
        cancelBnt
        bold
      >
        <IPayCardPinCode passcodeError={passcodeError} onEnterPassCode={onEnterPassCode} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};
export default CardsScreen;
