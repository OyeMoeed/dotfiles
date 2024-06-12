import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import headerStyles from '../ipay-header.styles';

const LanguageHeader = () => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={() => {}} style={styles.rightStyles}>
      <IPayIcon icon={icons.GLOBAL} size={14} />
      <IPaySubHeadlineText text={t('language')} regular style={styles.back} />
    </IPayPressable>
  );
};

export default LanguageHeader;
