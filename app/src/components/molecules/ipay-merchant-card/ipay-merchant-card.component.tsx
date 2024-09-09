import images from '@app/assets/images';
import { IPayCaption2Text, IPayImage, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import merchantCardStyles from './ipay-merchant-card-style';
import { IPayMerchantCardProps } from './ipay-merchant-card.interface';

const IPayMerchantCard: React.FC<IPayMerchantCardProps> = ({ testID, item, containerStyle }) => {
  const { colors } = useTheme();
  const styles = merchantCardStyles(colors);
  return (
    <IPayView testID={testID} style={[styles.cardContainer, containerStyle]}>
      <IPayView style={styles.imageContainer}>
        <IPayImage
          image={item?.image || images.placeholderImage}
          style={styles.cardImage}
          resizeMode="contain"
          testID={`${testID}-image-container`}
        />
      </IPayView>
      <IPayView>
        <IPayCaption2Text text={item?.title} style={styles.title} />
      </IPayView>
    </IPayView>
  );
};

export default IPayMerchantCard;
