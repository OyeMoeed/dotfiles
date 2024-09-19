import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import headerStyles from '../ipay-header.styles';

interface DelinkProps {
  onPress: () => void;
}

const Delink: FC<DelinkProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);

  return (
    <IPayPressable onPress={onPress} style={styles.iconContainer}>
      <IPayIcon icon={icons.logout} size={14} color={colors.primary.primary500} />
      <IPaySubHeadlineText text="COMMON.DELINK_ALERT.DELINK" regular style={styles.back} />
    </IPayPressable>
  );
};

export default Delink;
