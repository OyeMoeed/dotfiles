import { BackArrow } from '@app/assets/svgs';
import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { t } from 'i18next';
import React, { FC } from 'react';
import headerStyles from './../ipay-header.styles';
interface BackComponentProps {
  onPress?: () => void;
  backIconOnly?: boolean;
}

const BackComponent: FC<BackComponentProps> = ({ onPress, backIconOnly }) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayPressable onPress={onPress} style={styles.iconContainer}>
      <BackArrow />
      {!backIconOnly && <IPaySubHeadlineText text={t('back')} regular style={styles.back} />}
    </IPayPressable>
  );
};

export default BackComponent;
