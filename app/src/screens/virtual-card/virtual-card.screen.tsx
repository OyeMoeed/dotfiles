import { IPayAnimatedView, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayCardDetail from '@app/components/organism/ipay-card-details/ipay-card-details.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardSegment from '@app/components/templates/ipay-card-segment/ipay-card-segment.component';
import { ANIMATION_DURATION } from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, CardOptions, CardTypes } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import issueCardInquire from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.service';
import { useTypedSelector } from '@app/store/store';
import getCardIssuanceFees from '@app/network/services/cards-management/issue-card-fees/issue-card-fees.service';
import {
  CardType,
  ICardIssuanceDetails,
} from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { IssueCardFeesRes } from '@app/network/services/cards-management/issue-card-fees/issue-card-fees.interface';
import getAvailableCardsTypes from '@app/network/services/cards-management/issue-card-types/issue-card-types.service';
import { ImageStyle, StyleProp } from 'react-native';
import virtualCardStyles from './virtual-card.style';
import useVirtualCardData from './use-virtual-card-data';

const VirtualCardScreen: React.FC = () => {
  const { CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const [tabs, setTabs] = useState<string[]>([]);
  const { colors } = useTheme();
  const styles = virtualCardStyles(colors);
  const [selectedCard, setSelectedCard] = useState<CardType>();
  const [selectedCardType, setSelectedCardType] = useState<CardType>();
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === selectedCard);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
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

  const mapSelectedCardType = (tab: string): CardType | '' => {
    switch (tab) {
      case 'VIRTUAL_CARD.CLASSIC':
        setSelectedCardType('IPMC');
        return 'IPMC';
      case 'VIRTUAL_CARD.PLATINUM':
        setSelectedCardType('VPPC');
        return 'VPPC';
      case 'VIRTUAL_CARD.SIGNATURE':
        setSelectedCardType('VSCC');
        return 'VSCC';
      default:
        return '';
    }
  };

  const handleTabSelect = useCallback(
    (tab: CardTypes) => {
      const tabType = mapSelectedCardType(tab);
      if (tabType) {
        setSelectedCard(tabType);
        setSelectedCardType(tabType);
      }
    },
    [selectedCard],
  );

  const getCardsTypes = async () => {
    const apiResponse = await getAvailableCardsTypes();
    if (apiResponse?.status?.type === 'SUCCESS') {
      const firstCardType = apiResponse?.response?.cards[0]?.cardTypeId;
      const tabsArr = apiResponse?.response?.cards?.map((el) => {
        switch (el.cardTypeId) {
          case 'IPMC':
            return 'VIRTUAL_CARD.CLASSIC';
          case 'VPPC':
            return 'VIRTUAL_CARD.PLATINUM';
          case 'VSCC':
            return 'VIRTUAL_CARD.SIGNATURE';
          default:
            return '';
        }
      });
      setTabs(tabsArr as string[]);
      if (firstCardType) {
        setSelectedCard(firstCardType as CardType);
        setSelectedCardType(firstCardType as CardType);
      }
    }
  };

  useEffect(() => {
    getCardsTypes();
  }, []);

  const onPressIssueCard = async () => {
    const apiResponse = await issueCardInquire(walletInfo?.walletNumber, selectedCardType as CardType);
    if (apiResponse?.status?.type === 'SUCCESS') {
      const feesApiResponse = await getCardIssuanceFees(
        walletInfo?.walletNumber,
        selectedCardType as CardType,
        apiResponse?.response?.transactionType as string,
      );
      if (feesApiResponse?.status?.type === 'SUCCESS') {
        const cardIssuanceDetails: ICardIssuanceDetails = {
          cardType: selectedCardType as CardType,
          transactionType: apiResponse?.response?.transactionType as string,
          fees: feesApiResponse?.response as IssueCardFeesRes,
          cardIndex: apiResponse?.response?.cardIndex as string,
          cardManageStatus: apiResponse?.response?.cardManageStatus as string,
        };
        navigate(screenNames.CARD_ISSUE_CONFIRMATION, { issuanceDetails: cardIssuanceDetails });
      }
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title="VIRTUAL_CARD.HEADER" applyFlex />
      <IPayTabs
        preSelectedTab={tabs[0]}
        tabs={tabs}
        onSelect={handleTabSelect as (tab: string, tabObj: {}) => void}
        customStyles={styles.headerGap}
      />
      <IPayImage image={backgroundImage} style={styles.background as StyleProp<ImageStyle>} />
      <IPayAnimatedView
        animationStyles={animatedStyles}
        style={[styles.animatedContainer, isExpanded && styles.expandedBorderRadius]}
      >
        <IPayView>
          <IPayCardDetail
            description={description}
            type={type}
            cardChipData={CARD_CHIP_DATA[selectedCard as CardType]}
            showChips={!isExpanded}
          />
          {isExpanded && (
            <>
              <IPayCardSegment selectedCardType={selectedCard as CardType} cardOption={CardOptions.VIRTUAL} />
              <IPayView style={[styles.naturalBg, styles.heightedView]} />
            </>
          )}
        </IPayView>
        <IPayButton
          btnStyle={isExpanded ? styles.expandedButtonStyles : styles.outStyles}
          btnType={buttonVariants.LINK_BUTTON}
          onPress={toggleAnimation}
          btnText={isExpanded ? 'VIRTUAL_CARD.CLOSE_DETAILS' : 'VIRTUAL_CARD.VIEW_DETAILS'}
          btnIconsDisabled
        />
      </IPayAnimatedView>
      <IPayView style={styles.bottomContainer}>
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          large
          btnText="VIRTUAL_CARD.ISSUE_CARD"
          btnIconsDisabled
          btnStyle={styles.marginStyles}
          onPress={onPressIssueCard}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default VirtualCardScreen;
