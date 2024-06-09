import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import { FC } from 'react';
import { scale } from 'react-native-size-matters';
import headerStyles from '../ipay-header.styles';

interface BackComponentProps {
  onPress?: () => void;
  backIconOnly?: boolean;
}

const BackComponent: FC<BackComponentProps> = ({ onPress, backIconOnly }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={onPress} style={styles.iconContainer}>
      <IPayIcon icon={icons.HEADER_BACK} size={scale(20)} color={colors.primary.primary500} />
      {!backIconOnly && <IPaySubHeadlineText text={t('Back')} regular style={styles.back} />}
    </IPayPressable>
  );
};

export default BackComponent;
