import { IPayCaption2Text, IPayProgressBar, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import calculateProgress from '@app/utilities/calculate-progress.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { useMemo, FC } from 'react';
import IPayBalanceProgressbarProps from './ipay-balance-progressbar.interface';
import ipayBalanceProgressStyles from './ipay-balance-progressbar.styles';

const IPayBalanceProgressbar: FC<IPayBalanceProgressbarProps> = ({
  monthlyRemainingOutgoingAmount = '',
  monthlyOutgoingLimit = '',
}) => {
  const { colors } = useTheme();
  const styles = ipayBalanceProgressStyles(colors);
  const localizationText = useLocalization();
  const remainingProgress: string = useMemo(
    () =>
      calculateProgress(parseFloat(String(monthlyRemainingOutgoingAmount)), parseFloat(String(monthlyOutgoingLimit))),
    [monthlyRemainingOutgoingAmount, monthlyOutgoingLimit],
  );
  return (
    <>
      <IPayProgressBar
        style={styles.progressStyles}
        gradientWidth={remainingProgress}
        colors={colors.gradientPrimaryReverse}
      />
      <IPayView style={styles.topUpContainer}>
        <IPayCaption2Text text="TOP_UP.REMAINING" style={styles.naturalStyles} />
        <IPayView style={styles.amountValues}>
          <IPayCaption2Text style={styles.totalAmount} regular={false}>
            {formatNumberWithCommas(monthlyRemainingOutgoingAmount)}
          </IPayCaption2Text>
          <IPayCaption2Text
            style={styles.naturalStyles}
            text={` ${localizationText.HOME.OF} ${formatNumberWithCommas(monthlyOutgoingLimit)}`}
          />
        </IPayView>
      </IPayView>
    </>
  );
};
export default IPayBalanceProgressbar;
