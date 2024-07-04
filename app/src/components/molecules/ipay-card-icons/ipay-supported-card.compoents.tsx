import images from '@app/assets/images';
import { IPayImage, IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import { useTheme } from '@react-navigation/native';
import ipaySupportedCardStyles from './ipay-supported-card.style';

const IPaySupportedCards = () => {
  const { colors } = useTheme();
  const styles = ipaySupportedCardStyles(colors);
  return (
    <IPayView style={styles.cardIconsContainer}>
      {constants.SUPPORTED_CARD.map((card, index) => (
        <IPayImage key={index} resizeMode="contain" image={images[card]} style={styles.imageStyles} />
      ))}
    </IPayView>
  );
};

export default IPaySupportedCards;
