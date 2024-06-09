import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
import { t } from 'i18next';
import { scale } from 'react-native-size-matters';
import headerStyles from '../ipay-header.styles';

function LanguageHeader() {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={() => {}} style={styles.rightStyles}>
      <IPayIcon icon={icons.GLOBAL} size={scale(scale(14))} />
      <IPaySubHeadlineText text={t('language')} regular style={styles.back} />
    </IPayPressable>
  );
}

export default LanguageHeader;
