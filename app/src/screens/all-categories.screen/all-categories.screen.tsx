import { IPayView } from '@app/components/atoms';
import { IPayAllCategories, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import React from 'react';
import { MarketPlaceCategoriesProps } from '../marketplace/marketplace.interface';
import allCategoriesStyles from './all-categories.styles';

const AllCategoriesScreen: React.FC = ({ route }) => {
  const { categories } = route.params;
  const styles = allCategoriesStyles();
  const localizationText = useLocalization();

  const onPressCategory = (category?: MarketPlaceCategoriesProps) => {
    navigate(ScreenNames.CATEGORY_SCREEN, { category });
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.TITLE} applyFlex />
      <IPayView style={styles.container}>
        <IPayAllCategories data={categories} onPress={onPressCategory} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AllCategoriesScreen;
