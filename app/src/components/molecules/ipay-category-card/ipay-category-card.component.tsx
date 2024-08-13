import { IPayCaption2Text, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import IPayCategoryProps from './ipay-category-card.interface';
import categoryCardStyle from './ipay-categroy-card.style';

const IPayCategoryCard: FC<IPayCategoryProps> = ({ testID, item, onPress, style, cardContainerStyle }) => {
  const { colors } = useTheme();
  const styles = categoryCardStyle(colors);
  const { image, title } = item;
  return (
    <IPayPressable testID={`${testID}-all-categories`} onPress={onPress} style={style}>
      <IPayView style={[styles.cardContainer, cardContainerStyle]}>
        <IPayView style={styles.cardBackground}>
          <IPayImage image={image} style={styles.image} resizeMode="contain" />
        </IPayView>
        <IPayCaption2Text regular color={colors.primary.primary800} text={title} />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayCategoryCard;
