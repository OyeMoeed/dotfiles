import React from 'react';

import { IPayButton } from '@app/components/molecules';

import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayCaption2Text, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { buttonVariants } from '@app/utilities/enums.util';
import icons from '@app/assets/icons';
import ipayAccountBalanceStyles from './ipay-account-balance.style';
import { IPayAccountBalanceProps } from './ipay-account-balance.interface';

const IPayAccountBalance: React.FC<IPayAccountBalanceProps> = ({ style, balance, onPressTopup }) => {
  const { colors } = useTheme();

  const localizationText = useLocalization();

  const styles = ipayAccountBalanceStyles(colors);

  return (
    <IPayView testID="account-balance-component" style={[styles.container, style]}>
      <IPayView style={styles.textContainer}>
        <IPayCaption2Text text={localizationText.HOME.ACCOUNT_BALANCE} style={styles.textColor} />
        <IPayView style={styles.balanceContainer}>
          <IPaySubHeadlineText testID="balance-text" style={styles.textColor} text={balance} />
          <IPaySubHeadlineText style={styles.textColor} regular text={localizationText.COMMON.IPaySafeAreaView} />
        </IPayView>
      </IPayView>
      <IPayButton
        testID="topup-button"
        onPress={onPressTopup}
        btnType={buttonVariants.PRIMARY}
        leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
        btnText={localizationText.COMMON.TOP_UP}
        textColor={colors.primary.primary500}
        btnStyle={styles.buttonStyle}
      />
    </IPayView>
  );
};

export default IPayAccountBalance;
