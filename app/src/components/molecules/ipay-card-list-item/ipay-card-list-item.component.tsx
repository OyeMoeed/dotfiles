import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import icons from '@app/assets/icons';
import ipayCardListItemStyles from './ipay-card-list-item.style';
import { IPayCardListItemProps } from './ipay-card-list-item.interface';

const IPayCardListItem: React.FC<IPayCardListItemProps> = ({
  testID,
  headerText,
  lastFourDigit,
  cardIcon,
  onPressMore,
  hideMore = false,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const styles = ipayCardListItemStyles(colors);
  return (
    <IPayView testID={`${testID}-card-list-item`} style={[styles.container, containerStyle]}>
      <IPayView style={styles.iconContainer}>
        <IPayImage image={cardIcon} style={styles.icon} resizeMode="contain" />
      </IPayView>
      <IPayView style={styles.contentView}>
        <IPayFootnoteText regular text={headerText} color={colors.natural.natural900} />
        <IPayCaption1Text regular text={`**** **** **** ${lastFourDigit}`} color={colors.natural.natural500} />
      </IPayView>
      {!hideMore && (
        <IPayPressable onPress={onPressMore} style={styles.moreButton}>
          <IPayIcon icon={icons.moreHorizontal} size={24} color={colors.primary.primary500} />
        </IPayPressable>
      )}
    </IPayView>
  );
};

export default IPayCardListItem;
