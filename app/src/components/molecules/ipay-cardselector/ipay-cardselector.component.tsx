import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import CardItemProps from './ipay-card.interface';
import IPayCardSelectorStyles from './ipay-cardselector.styles';
const IPayCardSelector: React.FC<IPayCardSelectorProps> = ({ onPressAddCard, openPressExpired, onCardSelect }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPayCardSelectorStyles(colors);
  const [selectedCard, setSelectedCard] = useState<number | null>(1);

  const handleCardSelect = (key: number) => {
    setSelectedCard(key);
  };

  const renderItem = ({ item }: { item: CardItemProps }) => (
    <IPayView style={styles.itemContainer}>
      <IPayPressable
        onPress={() => {
          onCardSelect(item);
          if (item.expired) {
            openPressExpired();
          } else {
            handleCardSelect(item.key);
          }
        }}
        style={[styles.cardContainer]}
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
    <IPayView style={styles.containerStyle}>
      <IPayView style={styles.header}>
        <IPayFootnoteText text={localizationText.select_card} style={styles.headerText} />
        <IPayButton
          btnType="outline"
          leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.primary.primary500} />}
          btnText={localizationText.add_card}
          onPress={onPressAddCard}
        />
      </IPayView>
      <IPayFlatlist
        scrollEnabled
        data={constants.CARDS_MOCK_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        style={styles.flatlist}
      />
    </IPayView>
  );
};

export default IPayCardSelector;
