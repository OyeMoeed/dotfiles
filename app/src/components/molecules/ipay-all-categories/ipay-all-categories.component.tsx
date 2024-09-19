import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { MarketPlaceCategoriesProps } from '@app/screens/marketplace/marketplace.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayCategoryCard from '../ipay-category-card/ipay-category-card.component';
import { IPayAllCategoriesProps } from './ipay-all-categories.interface';
import IPayAllCategoriesStyle from './ipay-all-categories.styles';

const IPayAllCategories: React.FC<IPayAllCategoriesProps> = ({ testID, data, onPress }) => {
  const { colors } = useTheme();
  const styles = IPayAllCategoriesStyle(colors);

  const renderItem = ({ item }: { item: MarketPlaceCategoriesProps }) => (
    <IPayView>
      <IPayCategoryCard
        item={item}
        testID={testID}
        onPressCategory={onPress}
        cardContainerStyle={styles.cardContainer}
        style={styles.itemContainer}
      />
    </IPayView>
  );
  return <IPayFlatlist style={styles.flex} numColumns={3} renderItem={renderItem} data={data} />;
};

export default IPayAllCategories;
