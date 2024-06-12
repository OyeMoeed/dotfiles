import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayText } from '@components/atoms';
import marketplaceStyles from './marketplace.style';

const MarketPlace = () => {
  const { colors } = useTheme();
  const styles = marketplaceStyles(colors);
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>marketplace</IPayText>
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
