import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
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
      <IPayIcon icon={icons.HEADER_BACK} size={20} color={colors.primary.primary500} />
      {!backIconOnly ? <IPaySubHeadlineText text="COMMON.BACK" regular style={styles.back} /> : <IPayView />}
    </IPayPressable>
  );
};

export default BackComponent;
