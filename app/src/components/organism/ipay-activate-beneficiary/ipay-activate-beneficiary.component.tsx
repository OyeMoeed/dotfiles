import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayActivateBeneficiaryProps from './ipay-activate-beneficiary.interface';
import activateBeneficiaryStyles from './ipay-activate-beneficiary.styles';

const IPayActivateBeneficiary: React.FC<IPayActivateBeneficiaryProps> = ({
  testID,
  handleReceiveCall,
  handleCallAlinma,
}) => {
  const { colors } = useTheme();
  const styles = activateBeneficiaryStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayView testID={`${testID}-activate-beneficiary`} style={styles.container}>
      <IPayCaption1Text
        text={localizationText.ACTIVATE_BENEFICIARY.CHOOSE_ACTIVATION_OPTION}
        style={styles.descriptionStyles}
      />
      <IPayButton
        btnType="primary"
        btnText={localizationText.ACTIVATE_BENEFICIARY.RECEIVE_A_CALL_TO_ACTIVATE}
        large
        btnStyle={styles.callBtn}
        leftIcon={<IPayIcon icon={icons.call_calling} size={20} color={colors.natural.natural0} />}
        onPress={handleReceiveCall}
      />
      <IPayButton
        btnType="outline"
        btnText={localizationText.ACTIVATE_BENEFICIARY.CALL_ALINMA_TO_ACTIVATE}
        large
        leftIcon={<IPayIcon icon={icons.call_calling} size={20} color={colors.primary.primary500} />}
        btnStyle={styles.callBtn}
        onPress={handleCallAlinma}
      />
    </IPayView>
  );
};

export default IPayActivateBeneficiary;
