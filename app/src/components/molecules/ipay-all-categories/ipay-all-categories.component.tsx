import { IPayCaption2Text, IPayFlatlist, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { CategoriesItem, IPayAllCategoriesProps } from './ipay-all-categories.interface';
import IPayAllCategoriesStyle from './ipay-all-categories.styles';

const IPayAllCategories: React.FC<IPayAllCategoriesProps> = ({ testID, data, onPress }) => {
  const { colors } = useTheme();
  const styles = IPayAllCategoriesStyle(colors);

  const renderItem = ({ item }: { item: CategoriesItem }) => {
    const { image, title } = item;

    return (
      <IPayView>
        <IPayPressable testID={`${testID}-all-categories`} onPress={onPress} style={styles.itemContainer}>
          <IPayView style={styles.cardContainer}>
            <IPayView style={styles.cardBackground}>
              <IPayImage image={image} style={styles.image} resizeMode="contain" />
            </IPayView>
            <IPayCaption2Text regular color={colors.primary.primary800} text={title} />
          </IPayView>
        </IPayPressable>
      </IPayView>
    );
  };
  return <IPayFlatlist style={styles.flex} numColumns={3} renderItem={renderItem} data={data} />;
};

export default IPayAllCategories;
