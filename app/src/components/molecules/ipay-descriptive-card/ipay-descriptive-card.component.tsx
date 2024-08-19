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
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { CategoriesItem, IPayDescriptiveCardProps } from './ipay-descriptive-card.interface';
import IPayDescriptiveCardStyles from './ipay-descriptive-card.styles';

const IPayDescriptiveCard: React.FC<IPayDescriptiveCardProps> = ({
  testID,
  data,
  onCardPress,
  onPricePress,
  cardType,
}) => {
  const { colors } = useTheme();
  const styles = IPayDescriptiveCardStyles(colors);
  const localizationText = useLocalization();

  const imageStyle = cardType === CardDetails.NORMAL ? styles.image : styles.singleImage;
  const renderItem = ({ item }: { item: CategoriesItem }) => {
    const { image, title, detail, price, isDiscounted, discount } = item;

    return (
      <IPayView>
        <IPayPressable testID={`${testID}-all-categories`} onPress={onCardPress}>
          <IPayView style={styles.cardContainer}>
            <IPayView style={styles.cardBackground}>
              <IPayView style={cardType === CardDetails.DESVRIPTIVE && styles.imageBackground}>
                {image ? (
                  <IPayImage image={image} style={imageStyle} resizeMode="contain" />
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
                text={title}
              />
              <IPayFootnoteText
                regular
                color={colors.natural.natural900}
                style={cardType === CardDetails.DESVRIPTIVE ? styles.priceTextWidth : styles.textWidth}
                text={detail}
              />
              {cardType === CardDetails.DESVRIPTIVE && (
                <IPayPressable onPress={onPricePress} style={styles.priceButton}>
                  <IPayCaption1Text
                    regular={false}
                    text={`${localizationText.COMMON.SAR} ${price}`}
                    color={colors.primary.primary800}
                  />
                  <IPayIcon icon={icons.right_greater_icon} size={16} color={colors.primary.primary500} />
                </IPayPressable>
              )}
              {isDiscounted && (
                <IPayView style={styles.chip}>
                  <IPayFootnoteText
                    regular
                    text={`${discount} ${localizationText.SHOP.DISCOUNT} `}
                    color={colors.primary.primary500}
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
