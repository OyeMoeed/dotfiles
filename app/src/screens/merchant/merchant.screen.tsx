import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayTextInput } from '@app/components/molecules';
import IPayMerchantCard from '@app/components/molecules/ipay-merchant-card/ipay-merchant-card.component';
import { MerchantItem } from '@app/components/molecules/ipay-merchant-card/ipay-merchant-card.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import merchantStyles from './merchant.style';

const MerchantScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = merchantStyles(colors);
  const localizationText = useLocalization();
  const { merchantData } = useConstantData();
  const [search, setSearch] = useState<string>('');

  const renderItem = ({ item }: { item: MerchantItem }) => (
    <IPayMerchantCard containerStyle={styles.cardContainer} item={item} />
  );

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="all-merchant-ipay-header" backBtn title={localizationText.SHOP.ALL_MERCHANTS} applyFlex />
      <IPayView style={styles.contentContainer}>
        <IPayTextInput
          text={search}
          onChangeText={setSearch}
          placeholder={'COMMON.SEARCH'}
          rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
          simpleInput
          style={styles.inputStyle}
          containerStyle={styles.searchInputStyle}
        />
        <IPayFlatlist
          numColumns={3}
          data={merchantData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.merchantList}
          contentContainerStyle={styles.containerWrapper}
          columnWrapperStyle={styles.columnWrapper}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MerchantScreen;
