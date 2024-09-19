import { IPayCaption2Text, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { LanguageCode } from '@app/utilities/enums.util';
import { FC, useMemo } from 'react';
import IPayCategoryProps from './ipay-category-card.interface';
import categoryCardStyle from './ipay-categroy-card.style';

const IPayCategoryCard: FC<IPayCategoryProps> = ({ testID, item, onPressCategory, style, cardContainerStyle }) => {
  const { colors } = useTheme();
  const styles = categoryCardStyle(colors);
  const { image, desc, addtionalAttribute1 } = item;
  const { selectedLanguage } = useTypedSelector((state) => state.languageReducer);

  const getTitle = useMemo(() => {
    switch (selectedLanguage) {
      case LanguageCode.AR:
        return addtionalAttribute1;
      default:
        return desc;
    }
  }, [desc, addtionalAttribute1]);

  const onPress = () => {
    if (onPressCategory) onPressCategory(item);
  };

  return (
    <IPayPressable testID={`${testID}-all-categories`} onPress={onPress} style={style}>
      <IPayView style={[styles.cardContainer, cardContainerStyle]}>
        <IPayView style={styles.cardBackground}>
          <IPayImage image={image} style={styles.image} resizeMode="contain" />
        </IPayView>
        <IPayCaption2Text regular color={colors.primary.primary800} text={getTitle} />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayCategoryCard;
