import React from 'react';

import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';

import { IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from './change-pin-success.interface';
import changePinSuccessStyles from './change-pin-success.style';

const ChangePinSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = changePinSuccessStyles(colors);
  const localizationText = useLocalization();
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard: { cardType, cardHeaderText, name, maskedCardNumber },
  } = route.params;

  const cardLastFourDigit = maskedCardNumber?.slice(-4);

  return (
    <IPayPageWrapper>
      <IPayCardDetails
        containerStyle={styles.cardStyle}
        cardType={cardType}
        cardTypeName={cardHeaderText}
        carHolderName={name}
        cardLastFourDigit={cardLastFourDigit || ''}
      />
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.flexZero}
          headingText={localizationText.CHANGE_PIN_SUCCESS.CARD_PIN_CHANGES_SUCCESS}
          descriptionText={localizationText.CHANGE_PIN_SUCCESS.YOU_CAN_USE_PURCHASE}
        />
        <IPayView style={styles.bottomButtonContainer}>
          <IPayButton
            btnType="primary"
            btnText={localizationText.COMMON.DONE}
            large
            btnIconsDisabled
            onPress={goBack}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};
export default ChangePinSuccessScreen;
