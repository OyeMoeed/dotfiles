import React from 'react';

import { IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';

import IPayCardDetail from '@app/components/organism/ipay-card-details/ipay-card-details.component';
import IPayCardSegment from '@app/components/templates/ipay-card-segment/ipay-card-segment.component';
import { CardType } from '@app/network/services/cards-management/issue-card-inquire/issue-card-inquire.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardOptions } from '@app/utilities/enums.util';
import useVirtualCardData from '../virtual-card/use-virtual-card-data';
import cardFeaturesStyles from './card-features.style';

const CardFeaturesScreen: React.FC = () => {
  const currentCard = useTypedSelector((state) => state.cardsReducer.currentCard);
  const CURRENT_CARD_TYPE: CardType = currentCard?.cardType || 'VPPC';

  const { CARD_CHIP_DATA, VIRTUAL_CARD_DATA } = useVirtualCardData();
  const { colors } = useTheme();
  const styles = cardFeaturesStyles(colors);
  const selectedCardData = VIRTUAL_CARD_DATA.find((card) => card.key === CURRENT_CARD_TYPE);
  const { type = '', description = '', backgroundImage = '' } = selectedCardData || {};

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="CARD_OPTIONS.CARD_FEATURES" applyFlex />
      <IPayImage image={backgroundImage} style={styles.background} />
      <IPayScrollView showsVerticalScrollIndicator={false} style={styles.backgroundColor}>
        <IPayView>
          <IPayView style={styles.animatedContainer}>
            <IPayView>
              <IPayCardDetail
                description={description}
                type={type}
                cardChipData={CARD_CHIP_DATA[CURRENT_CARD_TYPE]}
                showChips
              />
              <IPayCardSegment selectedCardType={CURRENT_CARD_TYPE} cardOption={CardOptions.VIRTUAL} />
              <IPayView style={styles.heightedView} />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayScrollView>
    </IPaySafeAreaView>
  );
};

export default CardFeaturesScreen;
