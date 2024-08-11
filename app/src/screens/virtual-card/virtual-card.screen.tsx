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
import useTheme from '@app/styles/hooks/theme.hook';
import { CardTypes } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import useVirtualCardData from './use-virtual-card-data';
import virtualCardStyles from './virtual-card.style';

const VirtualCardScreen: React.FC = () => {
  const localizationText = useLocalization();
  const { TAB_LABELS, CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const { colors } = useTheme();
  const styles = virtualCardStyles(colors);
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

  const handleTabSelect = useCallback(
    (tab: CardTypes) => {
      const currentTab = tab.toLowerCase();
      setSelectedCard(currentTab);
    },
    [selectedCard],
  );
  const onPressIsssueCard = () => {
    navigate(screenNames.CARD_ISSUE_CONFIRMATION);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.VIRTUAL_CARD.HEADER} applyFlex />
      <IPayTabs tabs={TAB_LABELS} onSelect={handleTabSelect} customStyles={styles.headerGap} />
      <IPayImage image={backgroundImage} style={[styles.background]} />
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
              <IPayCardSegment selectedCardType={selectedCard} />
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
          btnText={localizationText.VIRTUAL_CARD.ISSUE_CARD}
          btnIconsDisabled
          btnStyle={styles.marginStyles}
          onPress={onPressIsssueCard}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default VirtualCardScreen;