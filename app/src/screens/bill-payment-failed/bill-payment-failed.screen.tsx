import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import billFailedStyles from './bill-payment-failed.style';

const BillPaymentFailedScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = billFailedStyles(colors);
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: { navigationPath: string } }, 'params'>;
  const { navigationPath } = route.params;

  return (
    <IPayPageWrapper>
      <IPayView style={styles.alertContainer}>
        <IPayView style={styles.alertWrapper}>
          <IPayIcon testID="danger12-icon" icon={icons.danger12} size={80} color={colors.error.error500} />
          <IPayTitle2Text text="PAY_BILL.PAYMENT_FAILED" style={styles.titleStyle} />
          <IPayFootnoteText text="PAY_BILL.TRY_AGAIN_COMPLETE_PAYMENT" color={colors.primary.primary800} />
        </IPayView>
        <IPayView style={styles.buttonWrapper}>
          <IPayButton
            leftIcon={
              <IPayIcon testID="arrow-left-icon" icon={icons.ARROW_LEFT} color={colors.natural.natural0} size={20} />
            }
            btnText="PAY_BILL.VIEW_EDIT_DETAILS"
            btnType={buttonVariants.PRIMARY}
            large
            btnStyle={styles.btnStyle}
            onPress={() => navigate(navigationPath)}
          />
          <IPayButton
            leftIcon={<IPayIcon testID="home-2-icon" icon={icons.HOME_2} color={colors.primary.primary500} size={20} />}
            btnText="COMMON.HOME"
            btnType={buttonVariants.LINK_BUTTON}
            large
            btnStyle={styles.btnStyle}
            onPress={() => navigate(ScreenNames.HOME)}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default BillPaymentFailedScreen;
