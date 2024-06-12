import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import headerStyles from '../ipay-header.styles';

interface CustomRightProps {
  text?: string;
  onPress?: () => void;
  isRight?: boolean;
}

const CustomComponent: FC<CustomRightProps> = ({ text, onPress, isRight }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={onPress} style={isRight ? styles.rightStyles : {}}>
      <IPaySubHeadlineText text={text} regular style={styles.back} />
    </IPayPressable>
  );
};

export default CustomComponent;
