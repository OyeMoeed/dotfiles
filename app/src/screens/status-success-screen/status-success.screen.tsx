import images from '@app/assets/images';
import { IPayImage, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPayShortHandAtmCard } from '@app/components/organism';
import { IPaySafeAreaView, StatusSuccessComponentHandler } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import statusSuccessStyles from './status-success.style';

const StatusSuccessScreen: React.FC = ({ route }: any) => {
  const { statusVariant, variantProps, cardData } = route.params;
  const { colors } = useTheme();
  const styles = statusSuccessStyles(colors);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      {cardData && (
        <IPayView style={styles.cardView}>
          <IPayShortHandAtmCard cardData={cardData} />
        </IPayView>
      )}
      <StatusSuccessComponentHandler statusVariant={statusVariant} variantProps={variantProps} />
    </IPaySafeAreaView>
  );
};

export default StatusSuccessScreen;
