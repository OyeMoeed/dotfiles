import icons from '@app/assets/icons';
import { IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetailsSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { CAROUSEL_MODES } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import cardData from './cards.constant';
import cardScreenStyles from './cards.style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const CardsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = cardScreenStyles(colors);
  const localizationText = useLocalization();
  const [boxHeight, setBoxHeight] = useState<number>(0);
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
    </IPaySafeAreaView>
  );
};
export default CardsScreen;
