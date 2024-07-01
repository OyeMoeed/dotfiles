import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayCardSelectorStyles from './ipay-cardselector.styles';
import { scaleSize } from '@app/styles/mixins';

const IPayCardSelector: React.FC<IPayCardSelectorProps> = ({
  onCardSelect,
  initialSelectedCard = null,
  onPressPay,
  openPressExpired,
}) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPayCardSelectorStyles(colors);

  // State to keep track of the selected card, initialize with the optional initialSelectedCard prop
  const [selectedCard, setSelectedCard] = useState<number | null>(initialSelectedCard);

  const topUpTypes = [
    {
      key: 1,
      rightIcon: icons.master_card,
      text: localizationText.Adam_Ahmed,
      subtitle: localizationText.cardNum,
      expired: false,
      navigateTo: null, // This can be any navigation path or null
    },
    {
      key: 2,
      rightIcon: icons.mada,
      text: localizationText.intCard,
      subtitle: localizationText.intCardNum,
      expired: true,
      navigateTo: screenNames.TOP_UP,
    },
  ];

  const handleNavigation = (navigateTo?: string) => {
    if (navigateTo) {
      console.log(`Navigating to ${navigateTo}`);
      // Implement actual navigation logic here
    }
  };

  const handleCardSelect = (key: number) => {
    const newSelectedCard = selectedCard === key ? null : key;
    setSelectedCard(newSelectedCard);
    onCardSelect(newSelectedCard); // Notify parent of the selected card
  };

  const renderItem = ({ item }) => (
    <IPayView style={styles.itemContainer}>
      <IPayPressable
        onPress={() => {
          if (item.expired) {
            openPressExpired();
          } else {
            handleCardSelect(item.key);
            handleNavigation(item.navigateTo);
          }
        }}
        style={[styles.cardContainer, selectedCard === item.key]}
      >
        <IPayView style={styles.itemContent}>
          <IPayIcon icon={item.rightIcon} size={24} color={colors.primary.primary900} />
          <IPayView style={styles.textContainer}>
            <IPayFootnoteText text={item.text} style={styles.itemText} />
            <IPayCaption1Text text={item.subtitle} style={styles.subtitleText} />
          </IPayView>
        </IPayView>
        {selectedCard === item.key && (
          <IPayIcon icon={icons.tick_mark_default} size={18} color={colors.primary.primary500} />
        )}
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayView style={styles}>
      <IPayView style={styles.header}>
        <IPayFootnoteText text={localizationText.select_card} style={styles.headerText} />
        <IPayButton
          btnType="outline"
          leftIcon={<IPayIcon icon={icons.add} size={scaleSize(14)} color={colors.primary.primary500} />}
          btnText={localizationText.add_cards}
          onPress={onPressPay} // Implement the actual functionality here
          style={styles.addButton}
        />
      </IPayView>
      <IPayFlatlist
        scrollEnabled
        data={topUpTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        style={styles.flatlist}
      />
    </IPayView>
  );
};

export default IPayCardSelector;
