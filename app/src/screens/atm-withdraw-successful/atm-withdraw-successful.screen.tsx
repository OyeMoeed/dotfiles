import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayIcon, IPayImage } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPayStatusSuccess } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import atmWithdrawSuccessStyles from './atm-withdraw-successful.style';

const AtmWithdrawSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = atmWithdrawSuccessStyles(colors);
  const localizationText = useLocalization();
  const withdrawSuccessData = constants.ATM_WITHDRAW_SUCCESS_DATA;
  const transactionsAmount = 5000;

  const onPressHome = () => {
    resetNavigation(screenNames.HOME_BASE);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      <IPayStatusSuccess
        headingText={localizationText.ATM_WITHDRAWAL.WITHDRAW_SUCCESSFULLY}
        transactionAmount={transactionsAmount}
        data={withdrawSuccessData}
        linkButton
        linkBottonText={localizationText.ATM_WITHDRAWAL.NEW_WITHDRAWAL}
        linkButtonIcon={<IPayIcon icon={icons.refresh} size={14} color={colors.primary.primary500} />}
        primaryButton
        primaryButtonText={localizationText.COMMON.HOME}
        primaryButtonIcon={<IPayIcon icon={icons.HOME} size={20} color={colors.natural.natural0} />}
        onPressPrimaryButton={onPressHome}
      />
    </IPaySafeAreaView>
  );
};

export default AtmWithdrawSuccessful;
