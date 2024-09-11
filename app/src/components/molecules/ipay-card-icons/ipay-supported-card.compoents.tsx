import images from '@app/assets/images';
import { IPayImage, IPayView } from '@app/components/atoms';
import { SUPPORTED_CARD } from '@app/constants/constants';
import ipaySupportedCardStyles from './ipay-supported-card.style';

const IPaySupportedCards = () => {
  const styles = ipaySupportedCardStyles();
  return (
    <IPayView style={styles.cardIconsContainer}>
      {SUPPORTED_CARD.map((card, index) => (
        <IPayImage
          key={`${`${index}IPayImage`}`}
          resizeMode="contain"
          image={images[card]}
          style={styles.imageStyles}
        />
      ))}
    </IPayView>
  );
};

export default IPaySupportedCards;
