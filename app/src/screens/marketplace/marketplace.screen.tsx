import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayText } from '@components/atoms';
import React from 'react';
import marketplaceStyles from './marketplace.style';

const MarketPlace: React.FC = () => {
  const { colors } = useTheme();
  const styles = marketplaceStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>{localizationText.HOME.SHOP}</IPayText>
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
