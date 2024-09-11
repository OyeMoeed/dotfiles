import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayList, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayPageWrapper } from '@app/components/templates';
import { ACTIVE_SADAD_BILLS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import { getDateFormate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { shortString } from '@app/utilities';
import usePayBillSuccess from './bill-pay-success.hook';
import { BillPaySuccessProps } from './bill-pay-success.interface';
import ipayBillSuccessStyles from './bill-pay-success.style';

interface BillPaymentItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  item: BillPaymentInfosTypes;
}

const PayBillScreen: React.FC<BillPaySuccessProps> = ({ route }) => {
  const { isSaveOnly, isPayOnly, isPayPartially, totalAmount, billPaymentInfos } = route.params;
  const { colors } = useTheme();
  const styles = ipayBillSuccessStyles(colors);
  const localizationText = useLocalization();
  const { goToHome, billSaveDetails } = usePayBillSuccess();
  // TODO will be updated basis of API.
  const billStatus = {
    paid: '1 Paid Bills',
    unpaid: '1 Unpaid Bills',
  };

  const successMessage = isSaveOnly ? localizationText.PAY_BILL.SAVED_SUCCESS : localizationText.PAY_BILL.PAID_SUCCESS;
  const onPressSaveOnlyPay = () => {
    navigate(ScreenNames.ADD_NEW_SADAD_BILLS, {
      selectedBills: [ACTIVE_SADAD_BILLS[0]],
      isSaveOnly,
    });
  };

  const getBillInfoArray = (item: BillPaymentInfosTypes) => [
    {
      id: '1',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: shortString(item.serviceDescription, 15),
    },
    {
      id: '2',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: item.billNumOrBillingAcct,
    },
    {
      id: '3',
      label: localizationText.COMMON.DUE_DATE,
      value: getDateFormate(item.dueDateTime, dateTimeFormat.DateMonthYearWithoutSpace),
    },
    {
      id: '4',
      label: localizationText.COMMON.REF_NUM,
      value: item.transactionId,
      icon: icons.copy,
    },
  ];

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={successMessage}
          descriptionText={`${totalAmount} ${localizationText.COMMON.SAR}`}
          descriptionStyle={styles.boldStyles}
          headingStyle={styles.headingStyle}
        />
        {isPayPartially && (
          <IPayView style={styles.chipWrapper}>
            <IPayChip textValue={billStatus.paid} isShowIcon={false} variant={States.SUCCESS} />
            <IPayChip textValue={billStatus.unpaid} isShowIcon={false} variant={States.ERROR} />
          </IPayView>
        )}
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView style={styles.conatinerStyles}>
            {isPayPartially && (
              <IPayList
                isShowLeftIcon
                containerStyle={styles.listContainer}
                leftIcon={<IPayIcon icon={icons.clipboard_close1} color={colors.error.error500} size={24} />}
                title={localizationText.PAY_BILL.DECLINED_TRANSACTION}
                isShowSubTitle
                subTitle={localizationText.PAY_BILL.DOES_NOT_ACCEPT_PARTIALLY_PAYMENT}
                subTextStyle={{ color: colors.error.error500 }}
                textStyle={{ color: colors.error.error500 }}
                regularTitle={false}
              />
            )}

            <IPayFlatlist
              data={billPaymentInfos}
              renderItem={({ item }: BillPaymentItemProps) => (
                <IPayBillDetailsOption
                  headerData={{
                    title: item.billNickname,
                    companyDetails: item.billerName,
                    companyImage: item.billerIcon,
                  }}
                  data={getBillInfoArray(item)}
                  style={styles.billContainer}
                  optionsStyles={styles.optionsStyle}
                />
              )}
            />
            {isPayPartially && (
              <IPayButton
                medium
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                btnText="COMMON.SHARE"
                btnStyle={styles.btnStyle}
              />
            )}
          </IPayView>
          {isSaveOnly && (
            <IPayView style={[styles.conatinerStyles, isSaveOnly && styles.saveContainer]}>
              <IPayBillDetailsOption
                showHeader={false}
                style={styles.billContainer}
                data={billSaveDetails}
                optionsStyles={styles.optionsStyle}
              />
              <IPayButton
                medium
                btnType={buttonVariants.PRIMARY}
                btnIconsDisabled
                btnText="PAY_BILL.PAY_NOW"
                onPress={onPressSaveOnlyPay}
              />
            </IPayView>
          )}
        </IPayScrollView>
        <IPayView style={styles.footerView}>
          {isSaveOnly ? (
            <IPayButton
              medium
              btnType={buttonVariants.OUTLINED}
              leftIcon={<IPayIcon icon={icons.ARROW_LEFT} color={colors.primary.primary500} size={16} />}
              btnText="PAY_BILL.VIEW_SADAD_BILLS"
              btnStyle={styles.btnStyle}
              onPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
            />
          ) : (
            <IPayView style={isPayOnly && styles.btnWrapper}>
              <IPayButton
                medium
                btnType={buttonVariants.LINK_BUTTON}
                leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
                btnText="PAY_BILL.PAY_ANOTHER_BILL"
                onPress={() => navigate(ScreenNames.SADAD_BILLS)}
              />
              {isPayOnly && (
                <IPayButton
                  medium
                  btnType={buttonVariants.LINK_BUTTON}
                  leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                  btnText="COMMON.SHARE"
                  btnStyle={styles.btnStyle}
                />
              )}
            </IPayView>
          )}
          <IPayButton
            onPress={goToHome}
            large
            btnType={isSaveOnly ? buttonVariants.LINK_BUTTON : buttonVariants.PRIMARY}
            leftIcon={
              <IPayIcon icon={icons.HOME} color={isSaveOnly ? colors.primary.primary500 : colors.natural.natural0} />
            }
            btnText="COMMON.HOME"
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default PayBillScreen;
