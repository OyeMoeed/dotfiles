import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayDescriptiveCard, IPayHeader, IPayTextInput } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import shopCategoriesStyles from './shop-categories.styles';

const ShopCategoriesScreen: React.FC = () => {
  const { playstationData } = useConstantData();
  const { colors } = useTheme();
  const styles = shopCategoriesStyles(colors);
  const localizationText = useLocalization();
  const CATEGORY_TABS = [
    localizationText.SHOP.SHOPPING,
    localizationText.SHOP.PLAYSTATION,
    localizationText.SHOP.FOOD,
    localizationText.SHOP.ENTERTAINMENT,
    localizationText.SHOP.TELECOM,
    localizationText.SHOP.GOOGLE,
    localizationText.SHOP.GAMES,
    localizationText.SHOP.STORE,
    localizationText.SHOP.TRANSPORTATION,
    localizationText.SHOP.XBOX,
    localizationText.SHOP.ITUNES,
  ];

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.TITLE} applyFlex />
      <IPaySegmentedControls
        tabs={CATEGORY_TABS}
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
      />
      <IPayView style={styles.container}>
        <IPayView style={styles.searchRow}>
          <IPayTextInput
            rightIcon={<IPayIcon icon={icons.search1} color={colors.primary.primary500} />}
            label={localizationText.COMMON.SEARCH}
            text={''}
            containerStyle={styles.background}
            placeholderTextColor={colors.natural.natural500}
          />
          <IPayIcon icon={icons.arrow_updown} />
        </IPayView>
        <IPayDescriptiveCard cardType={CardDetails.NORMAL} data={playstationData} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ShopCategoriesScreen;
