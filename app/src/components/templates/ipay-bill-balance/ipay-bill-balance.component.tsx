import images from '@app/assets/images';
import { IPayScrollView, IPayView } from '@app/components/atoms';
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

const IPayBillBalance: React.FC = () => {
  const { colors } = useTheme();
  const styles = onBillBalanceStyles(colors);
  const localizationText = useLocalization();
  const item: SadadBillItemProps = {
    title: 'My Electricity Bill',
    amountToPay: 3000,
    companyImage: images.electricityBill,
    currency: localizationText.COMMON.SAR,
    companyDetails: '123 - Saudi electricity co.',
  };

  return (
    <IPayView style={styles.container}>
      <IPayScrollView>
        <IPayView>
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
          <IPaySadadBillDetailsBox item={item} />
        </IPayView>
      </IPayScrollView>
      <SadadFooterComponent btnText="Pay" disableBtnIcons btnDisbaled />
    </IPayView>
  );
};

export default IPayBillBalance;
