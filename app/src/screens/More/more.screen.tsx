import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayText } from '@components/atoms';
import moreScreenStyles from './more.style';

const More = () => {
  const { colors } = useTheme();
  const styles = moreScreenStyles(colors);
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>More</IPayText>
    </IPaySafeAreaView>
  );
};

export default More;
