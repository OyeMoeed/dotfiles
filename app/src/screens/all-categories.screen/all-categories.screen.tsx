import { IPayView } from '@app/components/atoms';
import { IPayAllCategories, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import React from 'react';
import allCategoriesStyles from './all-categories.styles';

const AllCategoriesScreen: React.FC = () => {
  const { allCategories } = useConstantData();
  const styles = allCategoriesStyles();
  const allCategoriesPress = () => navigate(ScreenNames.SHOP_CATEGORIES);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="SHOP.TITLE" applyFlex />
      <IPayView style={styles.container}>
        <IPayAllCategories data={allCategories} onPress={allCategoriesPress} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AllCategoriesScreen;
