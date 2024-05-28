import { Global } from '@app/assets/svgs';
import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import React from 'react';
import headerStyles from '../ipay-header.styles';

function LanguageHeader() {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={() => {}} style={styles.rightStyles}>
      <Global />
      <IPaySubHeadlineText text={t('language')} regular style={styles.back} />
    </IPayPressable>
  );
}

export default LanguageHeader;
