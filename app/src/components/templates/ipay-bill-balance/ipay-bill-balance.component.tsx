import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import onBillBalanceStyles from './ipay-bill-balance.style';

type IPayBillBalanceProps = {
  selectedBills: SadadBillItemProps[];
};

const IPayBillBalance: React.FC<IPayBillBalanceProps> = ({ selectedBills }) => {
  const { colors } = useTheme();
  const styles = onBillBalanceStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView style={styles.container}>
      <IPayAccountBalance
        gradientWidth="54%"
        gradientBgStyle={styles.progressBarBg}
        showRemainingAmount
        balance="4000"
        availableBalance="5000"
        style={styles.accountBalance}
        currencyTextStyle={styles.darkBlueText}
        accountBalanceTextStyle={styles.darkBlueText}
        totalAvailableTextStyle={styles.greyText}
        currentBalanceTextStyle={styles.darkBlueText}
        remainingAmountTextStyle={styles.greyText}
        currentAvailableTextStyle={styles.darkText}
        onPressTopup={() => navigate(ScreenNames.WALLET)}
      />
      <IPayFlatlist
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <IPaySadadBillDetailsBox style={styles.billWrapper} item={item} />}
        data={selectedBills}
        showsVerticalScrollIndicator={false}
      />
      <SadadFooterComponent btnText={localizationText.COMMON.PAY} disableBtnIcons btnDisbaled />
    </IPayView>
  );
};

export default IPayBillBalance;
