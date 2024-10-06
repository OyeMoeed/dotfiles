import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useTrafficViolation from '@app/screens/traffic-violation/traffic-violation.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillPaymentOptions, buttonVariants } from '@app/utilities/enums.util';
import checkImage from '@app/utilities/image-helper.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPayBillPaymentsFooterProps } from './ipay-bills-payment-components.interface';

const IPayBillPaymentsFooter: React.FC<IPayBillPaymentsFooterProps> = ({ testID, style, onPressBillPaymentOption }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);
  const otherBills = constants.OTHER_BILL_TYPES;
  const { billsData } = useTrafficViolation();
  const unpaidCount = `(${billsData?.length} ${t('BILL_PAYMENTS.UNPAID')})`;

  const getIcon = (icon: string) => {
    const isImage = checkImage(icon);
    if (isImage) {
      return <IPayImage image={icon} style={styles.moiIcon} />;
    }
    return <IPayIcon icon={icon} size={31} color={colors.primary.primary900} />;
  };

  const onPressItem = (title: string) => {
    onPressBillPaymentOption?.(title);
  };

  return (
    <IPayView testID={`${testID}-bill-payments-footer`} style={[styles.billPaymentsFooterView, style]}>
      <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.footerChildView}>
        <IPayFlatlist
          data={otherBills}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          renderItem={({ item: { title, icon } }) => (
            <IPayView style={styles.footerCardView}>
              <IPayView style={styles.moiIconView}>{getIcon(icon)}</IPayView>
              <IPayFootnoteText regular={false} text={title} style={styles.footerTitleText} />
              <IPayView style={styles.footerBtnView}>
                <IPayCaption2Text
                  text={title === BillPaymentOptions.TRAFFIC_VIOLATION ? unpaidCount : ''}
                  color={colors.warning.warning500}
                />

                <IPayButton
                  medium
                  onPress={() => onPressItem(title)}
                  btnStyle={styles.footerBtn}
                  btnType={buttonVariants.PRIMARY}
                  rightIcon={<IPayIcon icon={icons.rightArrow} size={18} color={colors.natural.natural0} />}
                />
              </IPayView>
            </IPayView>
          )}
        />
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayBillPaymentsFooter;
