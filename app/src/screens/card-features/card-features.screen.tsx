import React from 'react';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayView } from '@app/components/atoms';
import cardFeaturesStyles from './card-features.style';

const CARD_FEATURES: React.FC = () => {
  const { colors } = useTheme();
  const styles = cardFeaturesStyles(colors);

  return (
    <IPaySafeAreaView>
      <IPayHeader languageBtn menu />
      <IPayView style={styles.container} />
    </IPaySafeAreaView>
  );
};

export default CARD_FEATURES;
