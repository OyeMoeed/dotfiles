import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayText } from '@components/atoms';
import React from 'react';
import moreScreenStyles from './more.style';

const More: React.FC = () => {
  const { colors } = useTheme();
  const styles = moreScreenStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>{localizationText.more}</IPayText>
    </IPaySafeAreaView>
  );
};

export default More;
