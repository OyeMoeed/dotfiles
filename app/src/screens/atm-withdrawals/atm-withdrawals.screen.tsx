import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayProgressBar,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/numberComma-helper.util';
import React from 'react';
import atmWithdrawalsStyles from './atm-withdrawals.style';

const AtmWithdrawals: React.FC = ({ route }: any) => {
  const { hideBalance } = route.params;
  const { colors } = useTheme();
  const styles = atmWithdrawalsStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.ATM_Withdrawals} applyFlex />
      <IPayView style={styles.container}>
        <IPayView style={styles.accountBalanceView}>
          <IPayView style={styles.commonContainer}>
            <IPayView>
              <IPayFootnoteText text={localizationText.accountBalance} />

              <IPayView style={styles.balanceContainer}>
                <IPayTitle2Text
                  style={styles.balanceTextStyle}
                  text={hideBalance ? '*****' : `${formatNumberWithCommas(123213)}`}
                />
                <IPayFootnoteText style={[styles.currencyStyle]} text={localizationText.sar} />
              </IPayView>
            </IPayView>
            <IPayButton
              onPress={() => {}}
              medium
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
              btnText={localizationText.topUp}
            />
          </IPayView>
          <IPayView style={[styles.gap]}>
            <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
          </IPayView>

          <IPayView style={[styles.gap, styles.commonContainer]}>
            <IPayCaption2Text text={localizationText.remainingAmount} />
            <IPayView style={styles.eyeCon}>
              <IPayCaption2Text style={styles.textBold} text={hideBalance ? '*****' : formatNumberWithCommas(123213)} />
              <IPayCaption2Text
                text={` ${localizationText.of} ${hideBalance ? '*****' : formatNumberWithCommas(123123123)}`}
              />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AtmWithdrawals;
