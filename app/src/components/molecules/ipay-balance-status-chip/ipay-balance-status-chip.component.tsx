import { AccountBalanceStatus } from '@app/enums/bill-payment.enum';
import { States } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayView } from '@app/components/atoms';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { BalanceStatusVariants, IPayBalanceStatusChipProps } from './ipay-balance-chip-status.interface';

const IPayBalanceStatusChip: FC<IPayBalanceStatusChipProps> = ({
  amount,
  currentBalance,
  monthlySpendingLimit,
  dailySpendingLimit,
  setWarningStatus,
}) => {
  const { t } = useTranslation();
  const [balanceStatus, setBalanceStatus] = useState('');
  const [exceededAmount, setExceededAmount] = useState<number>(0);
  const checkAccountBalanceStatus = () => {
    switch (true) {
      case currentBalance <= 0:
        setBalanceStatus(AccountBalanceStatus.NO_REMAINING_AMOUNT);
        setWarningStatus(AccountBalanceStatus.NO_REMAINING_AMOUNT);
        break;
      case amount > 0 && amount > currentBalance:
        setBalanceStatus(AccountBalanceStatus.INSUFFICIENT_BALANCE);
        setWarningStatus(AccountBalanceStatus.INSUFFICIENT_BALANCE);
        break;
      case amount > dailySpendingLimit:
        setBalanceStatus(AccountBalanceStatus.DAILY_OUTGOING_LIMIT);
        setWarningStatus(AccountBalanceStatus.DAILY_OUTGOING_LIMIT);
        setExceededAmount(amount - dailySpendingLimit);
        break;
      case amount > monthlySpendingLimit:
        setBalanceStatus(AccountBalanceStatus.SPENDING_LIMIT_EXCEED);
        setWarningStatus(AccountBalanceStatus.SPENDING_LIMIT_EXCEED);
        setExceededAmount(amount - monthlySpendingLimit);
        break;
      default:
        setBalanceStatus('');
        setWarningStatus('');
        break;
    }
  };

  useEffect(() => {
    checkAccountBalanceStatus();
  }, [amount, currentBalance]);

  const limitExceedText = (text: string) => `${text} ${formatNumberWithCommas(exceededAmount)} ${t('COMMON.SAR')}`;

  const balanceStatusVariants: BalanceStatusVariants = {
    [AccountBalanceStatus.INSUFFICIENT_BALANCE]: {
      text: 'COMMON.INSUFFICIENT_BALANCE',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.NO_REMAINING_AMOUNT]: {
      text: 'COMMON.NO_REMAINING_AMOUNT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.DAILY_OUTGOING_LIMIT]: {
      text: limitExceedText(t('COMMON.DAILY_OUTGOING_LIMIT')),
      variant: States.WARNING,
    },
    [AccountBalanceStatus.MONTHLY_INCOMING_LIMIT]: {
      text: 'COMMON.MONTHLY_INCOMING_LIMIT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.MONTHLY_OUTGOING_LIMIT]: {
      text: 'COMMON.MONTHLY_OUTGOING_LIMIT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.DAILY_INCOMING_LIMIT]: {
      text: 'COMMON.DAILY_INCOMING_LIMIT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.MONTHLY_REMAINING_INCOMING_AMOUNT]: {
      text: 'COMMON.MONTHLY_REMAINING_INCOMING_AMOUNT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.MONTHLY_REMAINING_OUTGOING_AMOUNT]: {
      text: 'COMMON.MONTHLY_REMAINING_OUTGOING_AMOUNT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.DAILY_REMAINING_INCOMING_AMOUNT]: {
      text: 'COMMON.DAILY_REMAINING_INCOMING_AMOUNT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.DAILY_REMAINING_OUTGOING_AMOUNT]: {
      text: 'COMMON.DAILY_REMAINING_OUTGOING_AMOUNT',
      variant: States.WARNING,
    },
    [AccountBalanceStatus.SPENDING_LIMIT_EXCEED]: {
      text: limitExceedText(t('COMMON.SPENDING_LIMIT_EXCEED')),
      variant: States.WARNING,
    },
  };

  return balanceStatus ? (
    <IPayChip
      textValue={balanceStatusVariants[balanceStatus as keyof BalanceStatusVariants]?.text}
      variant={balanceStatusVariants[balanceStatus as keyof BalanceStatusVariants]?.variant}
      fullWidth
    />
  ) : (
    <IPayView />
  );
};

export default IPayBalanceStatusChip;
