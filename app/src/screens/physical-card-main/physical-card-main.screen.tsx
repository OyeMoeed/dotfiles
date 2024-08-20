import { IPayFootnoteText, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayHeader } from '@app/components/molecules';
import IPayATMCard from '@app/components/molecules/ipay-atm-card/ipay-atm-card.component';
import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize, SCREEN_WIDTH } from '@app/styles/mixins';
import { buttonVariants, CAROUSEL_MODES } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import useCardsData from '@app/screens/cards/use-cards-data';
import icons from '@app/assets/icons';
import physicalCardMainStyles from './physical-card-main-style';


const PhysicalCardMainScreen: React.FC = () => {
  const { colors } = useTheme();
  const { CARD_DATA } = useCardsData();
  const styles = physicalCardMainStyles(colors);
  const localizationText = useLocalization();
  const [currentCard, setCurrentCard] = useState<CardInterface>(CARD_DATA[0]); // #TODO will be replaced with API data

  const onChangeIndex = (index: number) => {
    setCurrentCard(CARD_DATA[index]);
  };
  const CARD_CONTAINER_HEIGHT = 364;

  const renderCardItem = ({ item }: { item: CardInterface }) => (
    <IPayView style={styles.cardContainerParent}>
      <IPayView style={styles.cardContainerChild}>
        <IPayATMCard backgroundImageStyle={styles.cardBackgroundStyle} showHeaderText={false} card={item} />
      </IPayView>
      {!item.isCardPrinted ? (
        <IPayButton
          btnIconsDisabled
          btnText={localizationText.CARD_OPTIONS.PRINT_CARD}
          large
          btnType={buttonVariants.PRIMARY}
          btnStyle={styles.btnStyle}
        />
      ) : (
        <IPayView style={styles.cardPrintedContainer}>
          <IPayView style={styles.cardPrintedChildContainer}>
            <IPayIcon icon={icons.card} size={16} color={colors.natural.natural930} />
            <IPaySubHeadlineText
              color={colors.natural.natural700}
              regular
              text={localizationText.PHYSICAL_CARD.CARD_PRINTED}
            />
          </IPayView>
        </IPayView>
      )}
    </IPayView>
  );

  return (
    <IPaySafeAreaView testID="ipay-safearea">
      <IPayHeader title={localizationText.CARD_OPTIONS.PHYSICAL_CARD} backBtn applyFlex />

      <IPayFootnoteText
        style={styles.headerText}
        color={colors.primary.primary900}
        regular={false}
        text={localizationText.PHYSICAL_CARD.CHOOSE_FROM_YOUR}
      />

      <IPayView style={styles.cardsContainer}>
        <IPayCarousel
          data={CARD_DATA.slice(0, 3)}
          modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: scaleSize(100) }}
          mode={CAROUSEL_MODES.PARALLAX}
          width={SCREEN_WIDTH}
          loop={false}
          height={verticalScale(CARD_CONTAINER_HEIGHT)}
          onChangeIndex={onChangeIndex}
          renderItem={renderCardItem}
        />
      </IPayView>
      <IPayView style={styles.bottomContainer}>
        <IPayView>
          <IPayFootnoteText
            style={styles.textCenter}
            regular
            color={colors.natural.natural500}
            text={localizationText.PHYSICAL_CARD.CLICK_TO_ISSUE_YOUR}
          />
          <IPayFootnoteText
            style={styles.textCenter}
            regular
            color={colors.natural.natural500}
            text={localizationText.PHYSICAL_CARD.ITS_DETAILS_WILL_BE}
          />
        </IPayView>
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          btnIconsDisabled
          btnText={localizationText.PHYSICAL_CARD.ISSUE_A_NEW_CARD}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default PhysicalCardMainScreen;