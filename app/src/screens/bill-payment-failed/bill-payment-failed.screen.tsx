import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import billFailedStyles from './bill-payment-failed.style';

const BillPaymentFailedScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = billFailedStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayPageWrapper>
      <IPayView style={styles.alertContainer}>
        <IPayView style={styles.alertWrapper}>
          <IPayIcon testID="danger12-icon" icon={icons.danger12} size={80} color={colors.error.error500} />
          <IPayTitle2Text text={localizationText.PAY_BILL.PAYMENT_FAILED} style={styles.titleStyle} />
          <IPayFootnoteText
            text={localizationText.PAY_BILL.TRY_AGAIN_COMPLETE_PAYMENT}
            color={colors.primary.primary800}
          />
        </IPayView>
        <IPayView style={styles.buttonWrapper}>
          <IPayButton
            leftIcon={
              <IPayIcon testID="arrow-left-icon" icon={icons.ARROW_LEFT} color={colors.natural.natural0} size={20} />
            }
            btnText={localizationText.PAY_BILL.VIEW_EDIT_DETAILS}
            btnType={buttonVariants.PRIMARY}
            large
            btnStyle={styles.btnStyle}
          />
          <IPayButton
            leftIcon={<IPayIcon testID="home-2-icon" icon={icons.HOME_2} color={colors.primary.primary500} size={20} />}
            btnText={localizationText.COMMON.HOME}
            btnType={buttonVariants.LINK_BUTTON}
            large
            btnStyle={styles.btnStyle}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default BillPaymentFailedScreen;
