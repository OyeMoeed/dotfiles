import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { TransactionsStatus } from '@app/enums/transaction-types.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { TransactionDetailsFooterButtonsProps } from './transction-details-component.interface';

const TransactionDetailsFooterButtons: React.FC<TransactionDetailsFooterButtonsProps> = ({
  transactionStatus,
  onPressShare,
  onPressSplitBill,
  onPressRefund,
  onPressEditBeneficiary,
}) => {
  const { colors } = useTheme();
  const styles = transactionDetailsCompStyles(colors);
  const { t } = useTranslation();

  switch (transactionStatus) {
    case TransactionsStatus.PAID:
      return (
        <IPayView style={styles.buttonsView}>
          <IPayButton
            onPress={onPressSplitBill}
            btnType={buttonVariants.OUTLINED}
            medium
            leftIcon={<IPayIcon icon={icons.bill1} size={18} color={colors.primary.primary500} />}
            btnText="TRANSACTION_HISTORY.SPLIT_BILL"
            btnStyle={styles.btnStyles}
          />
          <IPayButton
            onPress={onPressShare}
            btnType={buttonVariants.OUTLINED}
            medium
            leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
            btnText={t('TOP_UP.SHARE')}
            btnStyle={styles.btnStyles}
          />
        </IPayView>
      );
    case TransactionsStatus.PENDING:
      return (
        <IPayView style={styles.buttonsView}>
          <IPayButton
            onPress={onPressRefund}
            btnType={buttonVariants.OUTLINED}
            medium
            leftIcon={<IPayIcon icon={icons.refresh} size={18} color={colors.primary.primary500} />}
            btnText="TRANSACTION_HISTORY.REFUND"
            btnStyle={styles.btnStyles}
          />
          <IPayButton
            onPress={onPressEditBeneficiary}
            btnType={buttonVariants.OUTLINED}
            medium
            leftIcon={<IPayIcon icon={icons.edit_2} size={18} color={colors.primary.primary500} />}
            btnText="TRANSACTION_HISTORY.EDIT_BENEFICIARY"
            btnStyle={styles.btnStyles}
          />
        </IPayView>
      );
    default:
      return (
        <IPayView>
          <IPayButton
            onPress={onPressShare}
            btnType={buttonVariants.OUTLINED}
            large
            leftIcon={<IPayIcon icon={icons.share} size={18} color={colors.primary.primary500} />}
            btnText={t('TOP_UP.SHARE')}
            btnStyle={styles.shareBtn}
          />
        </IPayView>
      );
  }
};

export default TransactionDetailsFooterButtons;
