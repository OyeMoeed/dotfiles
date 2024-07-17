import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';

import { goBack } from '@app/navigation/navigation-service.navigation';
import { IPayPageWrapper } from '@app/components/templates';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import { ViewStyle } from 'react-native';
import changePinSuccessStyles from './change-pin-success.style';

const ChangePinSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = changePinSuccessStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayPageWrapper>
      <IPayCardDetails
        containerStyle={styles.cardStyle as ViewStyle}
        cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
        cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
        carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
        cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
      />
      <IPayView style={styles.childContainer}>
        <IPaySuccess
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
