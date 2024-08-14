import images from '@app/assets/images';
import { IPayFootnoteText, IPayImage, IPayTitle3Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { WINDOW_WIDTH } from '@app/styles/mixins';
import { buttonVariants } from '@app/utilities/enums.util';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { RenderItemProps } from './send-gift-card.interface';
import sendGiftCard from './send-gift-card.style';

const SendGiftCard = () => {
  const { colors } = useTheme();
  const carouselData = [
    {
      image: images.eidMubarak,
      background: colors.backgrounds.skyBlue,
    },
    {
      image: images.eidMubarak,
      background: colors.backgrounds.yellowish,
    },
  ];

  const localizationText = useLocalization();

  const {
    SEND_GIFT: {
      EIYDIAH,
      BIRTHDAY,
      CONGRATULATIONS,
      NEW,
      SEND_GIFT,
      SEND_GIFT_CARD_DETAIL,
      SEND_GIFT_CARD_DESCRIPTION,
    },
    COMMON: { NEXT },
  } = localizationText;
  const SEND_GIFT_TABS = [EIYDIAH, BIRTHDAY, CONGRATULATIONS, NEW];
  const styles = sendGiftCard();

  const [selectedTab, setSelectedTab] = useState<string>(SEND_GIFT_TABS[0]);

  const onSelectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderCarouselItem = ({ item }: RenderItemProps) => (
    <IPayView style={[styles.carouselItem, { backgroundColor: item.background }]}>
      <IPayImage image={item.image} style={styles.image} />
    </IPayView>
  );

  const onNext = () => {
    navigate(ScreenNames.SEND_GIFT_PREVIEW);
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
        <IPayTitle3Text text={SEND_GIFT_CARD_DETAIL} regular={false} />
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
        />
      </IPayView>
      <IPayButton
        btnType={buttonVariants.PRIMARY}
        large
        btnText={NEXT}
        btnIconsDisabled
        btnStyle={styles.nextButton}
        onPress={onNext}
      />
    </IPaySafeAreaView>
  );
};

export default SendGiftCard;
