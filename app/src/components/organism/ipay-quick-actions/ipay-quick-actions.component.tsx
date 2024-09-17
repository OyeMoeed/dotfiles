import React from 'react';
import { IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, PayChannel } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import IPayQuickActionsProps from './ipay-quick-actions.interface';
import iPayQuickActionsStyles from './ipay-quick-actions.styles';

const IPayQuickActions: React.FC<IPayQuickActionsProps> = ({
  payChannelType,
  setTopUpAmount,
  monthlyRemainingOutgoingAmount,
}) => {
  const { colors } = useTheme();
  const handleTopUp = (text: number) => {
    const newAmount = text;
    setTopUpAmount?.(newAmount.toString());
  };

  const styles = iPayQuickActionsStyles(colors);
  const { t } = useTranslation();
  const quickAmounts = payChannelType === PayChannel.ATM ? constants.QUICK_AMOUNT_ATM : constants.QUICK_AMOUNT_CARD;
  return (
    <IPayView style={styles.buttonContainer}>
      {quickAmounts.map((amountItem, index) => (
        <IPayButton
          shouldTranslateBtnText={false}
          key={`${`${index}IPayButton`}`}
          btnText={`${amountItem.text} ${t('COMMON.SAR')}`}
          btnType={buttonVariants.PRIMARY}
          btnIconsDisabled
          btnStyle={[
            styles.buttonBg,
            {
              backgroundColor:
                monthlyRemainingOutgoingAmount === '0' ? colors.natural.natural200 : colors.secondary.secondary100,
            },
          ]}
          textColor={colors.secondary.secondary800}
          onPress={() => handleTopUp(amountItem.value)}
          disabled={monthlyRemainingOutgoingAmount === '0'}
        />
      ))}
    </IPayView>
  );
};
export default IPayQuickActions;
