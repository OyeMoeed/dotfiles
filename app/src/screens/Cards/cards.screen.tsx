import React from 'react';

import IPayCustomSheet from '@app/components/organism/ipay-custom-sheet/ipay-custom-sheet.component';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCardDetailsSection from '@app/components/templates/ipay-card-details-section/ipay-card-details-section.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayText } from '@components/atoms';
import styles from './cards.style';

const Cards: React.FC = () => {
  const localizationText = useLocalization();
  const boxHeight = 300; // TODO update according to the height of cards

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>{localizationText.cards}</IPayText>
      {!!boxHeight && (
        <IPayCustomSheet gradientHandler={false} boxHeight={boxHeight} topScale={200}>
          <IPayCardDetailsSection />
        </IPayCustomSheet>
      )}
    </IPaySafeAreaView>
  );
};
export default Cards;
