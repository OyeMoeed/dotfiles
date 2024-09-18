import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import CardDetails from '@app/enums/card-types.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryItem, IPayDescriptiveCardProps } from './ipay-descriptive-card.interface';
import IPayDescriptiveCardStyles from './ipay-descriptive-card.styles';

const IPayDescriptiveCard: React.FC<IPayDescriptiveCardProps> = ({
  testID,
  data,
  onCardPress,
  onPricePress,
  cardType,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayDescriptiveCardStyles(colors);

  const imageStyle = cardType === CardDetails.NORMAL ? styles.image : styles.singleImage;
  const renderItem = ({ item }: { item: CategoryItem }) => {
    const { desc, iconUrl, categoryDesc, price = '100', discount = '20', code } = item;
    return (
      <IPayView>
        <IPayPressable testID={`${testID}-all-categories`} onPress={() => onCardPress?.(code)}>
          <IPayView style={styles.cardContainer}>
            <IPayView style={styles.cardBackground}>
              <IPayView style={cardType === CardDetails.DESVRIPTIVE && styles.imageBackground}>
                {iconUrl ? (
                  <IPayImage image={iconUrl} style={imageStyle} resizeMode="contain" />
                ) : (
                  <IPayView style={styles.imageFallbackBackground}>
                    <IPayIcon icon={icons.galley} size={65} />
                  </IPayView>
                )}
              </IPayView>

              <IPayCaption2Text
                regular
                color={colors.natural.natural700}
                style={cardType === CardDetails.DESVRIPTIVE ? styles.priceTextContainer : styles.textContainer}
                text={categoryDesc}
              />
              <IPayFootnoteText
                regular
                color={colors.natural.natural900}
                style={cardType === CardDetails.DESVRIPTIVE ? styles.priceTextWidth : styles.textWidth}
                text={desc}
              />
              {cardType === CardDetails.DESVRIPTIVE && (
                <IPayPressable onPress={onPricePress} style={styles.priceButton}>
                  <IPayCaption1Text
                    regular={false}
                    text={`${t('COMMON.SAR')} ${price}`}
                    color={colors.primary.primary800}
                    shouldTranslate={false}
                  />
                  <IPayIcon icon={icons.right_greater_icon} size={16} color={colors.primary.primary500} />
                </IPayPressable>
              )}
              {discount && (
                <IPayView style={styles.chip}>
                  <IPayFootnoteText
                    regular
                    text={`${discount} ${t('SHOP.DISCOUNT')} `}
                    color={colors.primary.primary500}
                    shouldTranslate={false}
                  />
                </IPayView>
              )}
            </IPayView>
          </IPayView>
        </IPayPressable>
      </IPayView>
    );
  };
  return <IPayFlatlist style={styles.flex} numColumns={2} renderItem={renderItem} data={data} />;
};

export default IPayDescriptiveCard;
