import { IPayFootnoteText, IPayLottieAnimation, IPayTitle3Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { WINDOW_WIDTH } from '@app/styles/mixins';
import { buttonVariants } from '@app/utilities/enums.util';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { giftsCardData } from './send-gift-card.constants';
import { GiftDetails } from './send-gift-card.interface';
import sendGiftCard from './send-gift-card.style';

const SendGiftCard = () => {
  const { colors } = useTheme();
  const [carouselData, setCarouselData] = useState<GiftDetails[]>(giftsCardData?.eid(colors));

  const { t } = useTranslation();

  const EIYDIAH = t('SEND_GIFT.EIYDIAH');
  const BIRTHDAY = t('SEND_GIFT.BIRTHDAY');
  const CONGRATULATIONS = t('SEND_GIFT.CONGRATULATIONS');
  const SEND_GIFT = t('SEND_GIFT.SEND_GIFT');
  const SEND_GIFT_CARD_DETAIL = t('SEND_GIFT.SEND_GIFT_CARD_DETAIL');
  const SEND_GIFT_CARD_DESCRIPTION = t('SEND_GIFT.SEND_GIFT_CARD_DESCRIPTION');

  const SEND_GIFT_TABS = [EIYDIAH, BIRTHDAY, CONGRATULATIONS];
  const styles = sendGiftCard(colors);

  const [selectedTab, setSelectedTab] = useState<string>(SEND_GIFT_TABS[0]);
  const [selectedCard, setSelectedCard] = useState(carouselData[0] || {});

  const onSelectTab = (tab: string) => {
    setSelectedTab(tab);
    switch (tab) {
      case EIYDIAH:
        return setCarouselData(giftsCardData?.eid(colors));
      case BIRTHDAY:
        return setCarouselData(giftsCardData?.birthday(colors));
      case CONGRATULATIONS:
        return setCarouselData(giftsCardData?.congrat(colors));
      default:
        return setCarouselData(giftsCardData?.eid(colors));
    }
  };

  const renderCarouselItem = ({ item }: GiftDetails) => (
    <IPayView style={[styles.carouselItem, { backgroundColor: item.bgColor }]}>
      <IPayLottieAnimation source={item.path} style={styles.image} loop />
    </IPayView>
  );

  const onChangeIndex = (index: number) => setSelectedCard(carouselData[index]);

  const onNext = () => {
    navigate(ScreenNames.SEND_GIFT_PREVIEW, { occasion: selectedTab, selectedCard });
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={SEND_GIFT} backBtn applyFlex />
      <IPayTabs
        tabs={SEND_GIFT_TABS}
        customStyles={styles.tabs}
        scrollable
        onSelect={onSelectTab}
        preSelectedTab={selectedTab}
      />
      <IPayView style={styles.giftCardDetail}>
        <IPayTitle3Text text={SEND_GIFT_CARD_DETAIL} regular={false} color={colors.primary.primary900} />
        <IPayFootnoteText text={SEND_GIFT_CARD_DESCRIPTION} color={colors.primary.primary800} />
      </IPayView>
      <IPayView style={styles.carouselView}>
        <IPayCarousel
          data={carouselData}
          width={WINDOW_WIDTH * 0.88}
          carouselContainerStyle={styles.carouselContainer}
          height={WINDOW_HEIGHT / 2}
          stylePagination={styles.paginationStyle}
          pagination
          loop={false}
          style={styles.carouselStyle}
          renderItem={renderCarouselItem}
          onChangeIndex={onChangeIndex}
          resetOnDataChange
        />
      </IPayView>
      <IPayButton
        btnType={buttonVariants.PRIMARY}
        btnText="COMMON.NEXT"
        btnIconsDisabled
        btnStyle={styles.nextButton}
        onPress={onNext}
      />
    </IPaySafeAreaView>
  );
};

export default SendGiftCard;
