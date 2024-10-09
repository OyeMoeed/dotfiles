import { CallIncomingIcon, CallOutgoingIcon } from '@app/assets/svgs';
import { IPayCaption1Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
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
  return (
    <IPayView testID={`${testID}-activate-beneficiary`} style={styles.container}>
      <IPayCaption1Text text="ACTIVATE_BENEFICIARY.CHOOSE_ACTIVATION_OPTION" style={styles.descriptionStyles} />
      <IPayButton
        btnType={buttonVariants.PRIMARY}
        btnText="ACTIVATE_BENEFICIARY.RECEIVE_A_CALL_TO_ACTIVATE"
        large
        leftIcon={<CallIncomingIcon style={styles.callIcon} color={colors.natural.natural0} />}
        onPress={handleReceiveCall}
      />
      <IPayButton
        btnType={buttonVariants.OUTLINED}
        btnText="ACTIVATE_BENEFICIARY.CALL_ALINMA_TO_ACTIVATE"
        large
        leftIcon={<CallOutgoingIcon style={styles.callIcon} color={colors.primary.primary500} />}
        onPress={handleCallAlinma}
      />
    </IPayView>
  );
};

export default IPayActivateBeneficiary;
