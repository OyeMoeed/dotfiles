import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import { FC } from 'react';
import { scale } from 'react-native-size-matters';
import headerStyles from '../ipay-header.styles';

interface DelinkProps {
  onPress?: () => void;
}

const Delink: FC<DelinkProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={onPress} style={styles.iconContainer}>
      <IPayIcon icon={icons.logout} size={scale(14)} color={colors.primary.primary500} />
      <IPaySubHeadlineText text={t('delink')} regular style={styles.back} />
    </IPayPressable>
  );
};

export default Delink;
