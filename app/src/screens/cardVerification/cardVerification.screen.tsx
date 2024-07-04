import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayHeadlineText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { payChannel, topupStatus } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import cardVerificationStyles from './cardVerification.styles';

const CardVerification: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const [cvv, setCvv] = useState('');
  const [isCvvError, setIsCvvError] = useState(false); // State to manage CVV error
  const styles = cardVerificationStyles(colors);

  const handleCvvChange = (text: string) => {
    setCvv(text);
  };

  const onPressConfirm = () => {
    if (cvv === constants.MOCK_CVV) {
      setIsCvvError(false);
      setCvv('');
      navigate(screenNames.TOP_UP_SUCCESS, { topupChannel: payChannel.CARD, topupStatus: topupStatus.SUCCESS });
    } else {
      setIsCvvError(true);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.verificationTitle} applyFlex />
      <IPayView style={styles.container}>
        <IPayView>
          <IPayHeadlineText text={localizationText.verificationValue} style={styles.headerText} />
          <IPayCaption1Text text={localizationText.enter_cvv} style={styles.subtitleText} />
        </IPayView>
        <IPayView style={styles.inputContainer}>
          <IPayAnimatedTextInput
            returnKeyType="done"
            label={localizationText.cvv}
            value={cvv}
            maxLength={3}
            containerStyle={styles.cardNameInput}
            isError={isCvvError} // Set isError based on your error condition
            assistiveText={isCvvError ? localizationText.invalid_cvv : ''}
            keyboardType="numeric"
            onChangeText={handleCvvChange}
            showRightIcon
            customIcon={<IPayIcon icon={icons.infoIcon2} color={colors.natural.natural500} />}
          />
          <IPayButton
            btnType="primary"
            btnIconsDisabled
            btnText={localizationText.confirm}
            large
            onPress={onPressConfirm}
            btnStyle={styles.btnStyle}
          />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default CardVerification;
