import { DelinkSvg } from '@app/assets/svgs';
import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import React, { FC } from 'react';
import headerStyles from './../ipay-header.styles';
interface DelinkProps {
  onPress?: () => void;
}

const Delink: FC<DelinkProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={onPress} style={styles.iconContainer}>
      <DelinkSvg />
      <IPaySubHeadlineText text={t('delink')} regular style={styles.back} />
    </IPayPressable>
  );
};

export default Delink;
