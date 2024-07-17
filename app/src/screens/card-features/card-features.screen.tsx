import React from 'react';

import { IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import { CardTypes } from '@app/utilities/enums.util';

import IPayCardDetail from '@app/components/organism/ipay-card-details/ipay-card-details.component';
import IPayCardSegment from '@app/components/templates/ipay-card-segment/ipay-card-segment.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import useVirtualCardData from '../virtual-card/use-virtual-card-data';
import cardFeaturesStyles from './card-features.style';

const CardFeaturesScreen: React.FC = () => {
  const CURRENT_CARD_TYPE = CardTypes.PLATINUM;
  const localizationText = useLocalization();
  const { CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const { colors } = useTheme();
  const styles = cardFeaturesStyles(colors);
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === CURRENT_CARD_TYPE);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.CARD_OPTIONS.CARD_FEATURES} applyFlex />
      <IPayScrollView showsVerticalScrollIndicator={false}>
        <IPayView>
          <IPayImage image={backgroundImage} style={styles.background} />
          <IPayView style={styles.animatedContainer}>
            <IPayView>
              <IPayCardDetail
                description={description}
                type={type}
                cardChipData={CARD_CHIP_DATA[CURRENT_CARD_TYPE]}
                showChips
              />
              <IPayCardSegment selectedCardType={CURRENT_CARD_TYPE} />
              <IPayView style={styles.heightedView} />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayScrollView>
    </IPaySafeAreaView>
  );
};

export default CardFeaturesScreen;
