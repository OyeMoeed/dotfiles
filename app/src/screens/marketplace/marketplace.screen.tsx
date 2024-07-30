import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import React from 'react';
import marketplaceStyles from './marketplace.style';

const MarketPlace: React.FC = () => {
  const styles = marketplaceStyles();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="shop-ipay-header" backBtn title={localizationText.HOME.SHOP} applyFlex />
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
