import { IPayFlatlist, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayCategoryCard from '../ipay-category-card/ipay-category-card.component';
import { CategoriesItem, IPayAllCategoriesProps } from './ipay-all-categories.interface';
import IPayAllCategoriesStyle from './ipay-all-categories.styles';

const IPayAllCategories: React.FC<IPayAllCategoriesProps> = ({ testID, data, onPress }) => {
  const { colors } = useTheme();
  const styles = IPayAllCategoriesStyle(colors);

  const renderItem = ({ item }: { item: CategoriesItem }) => {
    return (
      <IPayView>
        <IPayCategoryCard
          item={item}
          testID={testID}
          onPress={onPress}
          cardContainerStyle={styles.cardContainer}
          style={styles.itemContainer}
        />
      </IPayView>
    );
  };
  return <IPayFlatlist style={styles.flex} numColumns={3} renderItem={renderItem} data={data} />;
};

export default IPayAllCategories;
