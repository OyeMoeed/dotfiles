import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayNoResult } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import IPayCardSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import CardScreenCurrentState from '@app/screens/cards/cards.screen.interface';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import { buttonVariants, CarouselModes } from '@app/utilities';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { FC } from 'react';
import { verticalScale } from 'react-native-size-matters';
import IPayCardsCarouselProps from './ipay-cards-carousel.interface';

const IPayCardsCarousel: FC<IPayCardsCarouselProps> = ({
  cardsCurrentState,
  cardsData,
  styles,
  onChangeIndex,
  openCardSheet,
  setBoxHeight,
  onATMLongPress,
  boxHeight,
  onPinCodeSheet,
  isLoadingCards,
  resetOnDataChange = false,
}) => {
  const THRESHOLD = verticalScale(20);
  const HEIGHT = boxHeight - THRESHOLD;

  const currentCard = useTypedSelector((state) => state.cardsReducer.currentCard);

  if (isLoadingCards) {
    return <IPaySkeletonBuilder variation={IPaySkeletonEnums.CARD_WITH_TITLE} isLoading={isLoadingCards} />;
  }

  if (cardsCurrentState === CardScreenCurrentState.NO_DATA) {
    return (
      <IPayView style={styles.noResultContainer}>
        <IPayNoResult
          testID="no-result"
          textColor={colors.primary.primary800}
          message="CARDS.YOU_DO_NOT_HAVE_CARD"
          showEmptyBox
        />
        <IPayButton
          btnStyle={styles.buttonStyle}
          btnText="CARDS.CREATE_NEW_CARD"
          btnType={buttonVariants.PRIMARY}
          large
          onPress={openCardSheet}
          leftIcon={<IPayIcon icon={icons.add} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    );
  }

  if (cardsCurrentState === CardScreenCurrentState.HAS_DATA) {
    return (
      <>
        <IPayView style={styles.cardsContainer}>
          <IPayCarousel
            data={[...cardsData, { newCard: true }]}
            modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
            mode={CarouselModes.PARALLAX}
            width={SCREEN_WIDTH}
            loop={false}
            height={verticalScale(350)}
            onChangeIndex={onChangeIndex}
            resetOnDataChange={resetOnDataChange}
            renderItem={({ item }) =>
              (item as { newCard?: boolean }).newCard ? (
                <IPayView style={styles.newCardWrapper}>
                  <IPayButton
                    onPress={openCardSheet}
                    btnType={buttonVariants.OUTLINED}
                    btnText="CARDS.NEW_CARD"
                    rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
                  />
                </IPayView>
              ) : (
                <IPayATMCard card={item as CardInterface} setBoxHeight={setBoxHeight} onLongPress={onATMLongPress} />
              )
            }
          />
        </IPayView>
        {boxHeight > 0 && currentCard && (
          <IPayCustomSheet gradientHandler={false} boxHeight={HEIGHT} topScale={200}>
            <IPayCardSection onOpenOTPSheet={onPinCodeSheet} />
          </IPayCustomSheet>
        )}
      </>
    );
  }

  return <IPayView />;
};

export default IPayCardsCarousel;
