import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAccountBalance, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import useSadadBillDetailsData from './new-sadad-bill.constant';
import newsadadBillStyles from './new-sadad-bill.style';

const NewSadadBillScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = newsadadBillStyles(colors);
  const localizationText = useLocalization();
  // TODO will update on basis of API
  const BILL_DETAILS = useSadadBillDetailsData();
  const dummyData = {
    balance: '5200',
    availableBalance: '20,000',
    totalAmount: '550',
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.NEW_SADAD_BILLS.NEW_SADAD_BILLS} applyFlex />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          accountBalanceTextStyle={styles.darkStyle}
          currentBalanceTextStyle={styles.darkStyle}
          currencyTextStyle={styles.darkStyle}
          remainingAmountTextStyle={styles.remainingText}
          gradientWidth="50%"
          currentAvailableTextStyle={styles.currencyTextStyle}
          balance={dummyData.balance}
          availableBalance={dummyData.availableBalance}
          showRemainingAmount
          onPressTopup={() => {}}
        />
        <IPayFlatlist
          showsVerticalScrollIndicator={false}
          data={BILL_DETAILS}
          renderItem={({ item }) => (
            <IPaySadadBillDetailsBox
              style={styles.sadadDetailStyle}
              item={item}
              showActionBtn
              actionBtnText={localizationText.COMMON.REMOVE}
              rightIcon={<IPayIcon icon={icons.trash} size={14} color={colors.primary.primary500} />}
            />
          )}
        />
        <SadadFooterComponent
          btnStyle={styles.footerBtn}
          btnText={localizationText.TOP_UP.PAY}
          disableBtnIcons
          totalAmount={dummyData.totalAmount}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NewSadadBillScreen;
