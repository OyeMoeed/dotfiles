import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';

import { goBack } from '@app/navigation/navigation-service.navigation';
import { IPayPageWrapper } from '@app/components/templates';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import { useRoute, RouteProp } from '@react-navigation/native';
import changePinSuccessStyles from './change-pin-success.style';
import { RouteParams } from './change-pin-success.interface';

const ChangePinSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = changePinSuccessStyles(colors);
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const {
    currentCard: { cardType, cardHeaderText, name },
  } = route.params;

  return (
    <IPayPageWrapper>
      <IPayCardDetails
        containerStyle={styles.cardStyle}
        cardType={cardType}
        cardTypeName={cardHeaderText}
        carHolderName={name}
        cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
      />
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.flexZero}
          headingText="CHANGE_PIN_SUCCESS.CARD_PIN_CHANGES_SUCCESS"
          descriptionText="CHANGE_PIN_SUCCESS.YOU_CAN_USE_PURCHASE"
        />
        <IPayView style={styles.bottomButtonContainer}>
          <IPayButton btnType="primary" btnText="COMMON.DONE" large btnIconsDisabled onPress={goBack} />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};
export default ChangePinSuccessScreen;
