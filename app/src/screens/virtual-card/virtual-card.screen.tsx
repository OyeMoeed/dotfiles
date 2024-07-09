import { IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayCardDetail from '@app/components/organism/ipay-card-details/ipay-card-details.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardSegment from '@app/components/templates/ipay-card-segment/ipay-card-segment.component';
import { ANIMATION_DURATION } from '@app/constants/constants';
import { parallelAnimations } from '@app/ipay-animations/ipay-animations';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardTypes } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import useVirtualCardData from './use-virtual-card-data';
import virtualCardStyles from './virtual-card.style';

const VirtualCard: React.FC = () => {
  const localizationText = useLocalization();
  const { TAB_LABELS, CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const { colors } = useTheme();
  const styles = virtualCardStyles(colors);
  const [selectedCard, setSelectedCard] = useState<CardTypes>(CardTypes.CLASSIC);
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === selectedCard);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const opacityToValue = isExpanded ? 1 : 0;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const toggleAnimation = () => {
    const toValue = isExpanded ? 0 : -verticalScale(205);

    const slideAnimation = Animated.timing(animatedValue, {
      toValue,
      duration: ANIMATION_DURATION.duration300,
      useNativeDriver: true,
    });

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue: opacityToValue,
      duration: ANIMATION_DURATION.duration300,
      useNativeDriver: true,
    });
    parallelAnimations([slideAnimation, opacityAnimation]).start();

    setIsExpanded(!isExpanded);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.VIRTUAL_CARD.HEADER} applyFlex />
      <IPayTabs
        tabs={TAB_LABELS}
        onSelect={(index) => {
          const cardType = [CardTypes.CLASSIC, CardTypes.PLATINUM, CardTypes.SIGNATURE][index];
          setSelectedCard(cardType);
        }}
        customStyles={styles.headerGap}
      />
      <Animated.Image source={backgroundImage} style={[styles.background, { opacity: opacityValue }]} />
      <Animated.View
        style={[
          styles.animatedContainer,
          isExpanded && styles.expandedBorderRadius,
          {
            transform: [{ translateY: animatedValue }],
          },
        ]}
      >
        <IPayView>
          <IPayCardDetail description={description} type={type} cardChipData={CARD_CHIP_DATA} showChips={!isExpanded} />
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
      </Animated.View>
      <IPayView style={styles.bottomContainer}>
        <IPayButton
          btnType="primary"
          large
          btnText={localizationText.VIRTUAL_CARD.ISSUE_CARD}
          btnIconsDisabled
          btnStyle={styles.marginStyles}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default VirtualCard;
