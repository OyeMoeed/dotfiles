import { IPayAnimatedView, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayCardDetail from '@app/components/organism/ipay-card-details/ipay-card-details.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardSegment from '@app/components/templates/ipay-card-segment/ipay-card-segment.component';
import { ANIMATION_DURATION } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useVirtualCardData from '@app/screens/virtual-card/use-virtual-card-data';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardOptions, CardTypes } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';
import issueNewCardDetailsStyles from './issue-new-card-details.style';

const IssueNewCardDetailsScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { TAB_LABELS, CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const { colors } = useTheme();
  const styles = issueNewCardDetailsStyles(colors);
  const [selectedCard, setSelectedCard] = useState<CardTypes>(CardTypes.CLASSIC);
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === selectedCard);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const translateY = useSharedValue(0);
  const toggleAnimation = () => {
    const toValue = isExpanded ? 0 : -verticalScale(205);
    translateY.value = withTiming(toValue, {
      duration: ANIMATION_DURATION.duration300,
      easing: Easing.inOut(Easing.ease),
    });
    setIsExpanded(!isExpanded);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const route = useRoute<any>();

  const { currentCard } = route.params;

  const handleTabSelect = useCallback(
    (tab: CardTypes) => {
      const currentTab = tab.toLowerCase();
      setSelectedCard(currentTab);
    },
    [selectedCard],
  );
  const onPressIsssueCard = () => {
    navigate(screenNames.ISSUE_NEW_CARD_CONFIRM_DETAILS, {
      currentCard,
    });
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title="PHYSICAL_CARD.ISSUE_A_NEW_CARD" applyFlex />
      <IPayTabs tabs={TAB_LABELS} onSelect={handleTabSelect} customStyles={styles.headerGap} />
      <IPayImage image={backgroundImage} style={styles.background} />
      <IPayAnimatedView
        animationStyles={animatedStyles}
        style={[styles.animatedContainer, isExpanded && styles.expandedBorderRadius]}
      >
        <IPayView>
          <IPayCardDetail
            description={description}
            type={type}
            cardChipData={CARD_CHIP_DATA[selectedCard]}
            showChips={!isExpanded}
          />
          {isExpanded && (
            <>
              <IPayCardSegment selectedCardType={selectedCard} cardOption={CardOptions.PHYSICAL} />
              <IPayView style={[styles.naturalBg, styles.heightedView]} />
            </>
          )}
        </IPayView>
        <IPayButton
          btnStyle={isExpanded ? styles.expandedButtonStyles : styles.outStyles}
          btnType="link-button"
          onPress={toggleAnimation}
          btnText={
            isExpanded ? localizationText.VIRTUAL_CARD.CLOSE_DETAILS : localizationText.VIRTUAL_CARD.VIEW_DETAILS
          }
          btnIconsDisabled
        />
      </IPayAnimatedView>
      <IPayView style={styles.bottomContainer}>
        <IPayButton
          btnType="primary"
          large
          btnText="VIRTUAL_CARD.ISSUE_CARD"
          btnIconsDisabled
          btnStyle={styles.marginStyles}
          onPress={onPressIsssueCard}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default IssueNewCardDetailsScreen;
