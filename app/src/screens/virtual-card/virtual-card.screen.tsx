import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayFootnoteText, IPayHeadlineText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayCardChip from '@app/components/molecules/ipay-card-chip/ipay-card-chip.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardType } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import virtualCardStyles from './virtual-card.style';

const VirtualCard: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = virtualCardStyles(colors);

  const VIRTUAL_CARD_DATA = [
    {
      key: CardType.CLASSIC,
      type: localizationText.VIRTUAL_CARD.CLASSIC_DEBIT_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.classicBackground,
    },
    {
      key: CardType.PLATINUM,
      type: localizationText.VIRTUAL_CARD.PLATINUM_CASHBACK_PREPAID_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.platinumCard,
    },
    {
      key: CardType.SIGNATURE,
      type: localizationText.VIRTUAL_CARD.SIGNATURE_PREPAID_CARD,
      description: localizationText.VIRTUAL_CARD.DESCRIPTION,
      backgroundImage: images.signatueCard,
    },
  ];

  const cardChipData = [
    {
      text: localizationText.VIRTUAL_CARD.MADA_PAYMENT,
      icon: icons.mada_frame,
    },
    {
      text: localizationText.VIRTUAL_CARD.APPLE_PAYMENTS,
      icon: icons.ipay_frame,
    },
    {
      text: localizationText.VIRTUAL_CARD.ISSUANCE_FEE,
      icon: icons.tag,
    },
  ];

  const [selectedCard, setSelectedCard] = useState<CardType>(CardType.CLASSIC);
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === selectedCard);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};

  const tabLabels = [
    localizationText.VIRTUAL_CARD.CLASSIC,
    localizationText.VIRTUAL_CARD.PLATINUM,
    localizationText.VIRTUAL_CARD.SIGNATURE,
  ];

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const opacityToValue = isExpanded ? 1 : 0;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const toggleAnimation = () => {
    const toValue = isExpanded ? 0 : -240;
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: opacityToValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.VIRTUAL_CARD.HEADER} applyFlex />

      <IPayTabs
        tabs={tabLabels}
        onSelect={(index) => {
          const cardType = [CardType.CLASSIC, CardType.PLATINUM, CardType.SIGNATURE][index];
          setSelectedCard(cardType);
        }}
      />
      <Animated.View style={{ opacity: opacityValue }}>
        <IPayImage image={backgroundImage} style={[styles.background]} />
      </Animated.View>
      <Animated.View
        style={[
          styles.animatedContainer,
          isExpanded && styles.expandedBorderRadius,
          {
            transform: [{ translateY: animatedValue }],
          },
        ]}
      >
        <IPayHeadlineText text={type} regular={false} />
        <IPayFootnoteText text={description} />
        <IPayCardChip data={cardChipData} />
        <IPayButton
          btnType="link-button"
          onPress={toggleAnimation}
          btnText={
            isExpanded ? localizationText.VIRTUAL_CARD.CLOSE_DETAILS : localizationText.VIRTUAL_CARD.VIEW_DETAILS
          }
          btnIconsDisabled
        />
      </Animated.View>
      <IPayView style={styles.bottomContainer}>
        <IPayButton btnType="primary" large btnText={localizationText.VIRTUAL_CARD.ISSUE_CARD} btnIconsDisabled />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default VirtualCard;
