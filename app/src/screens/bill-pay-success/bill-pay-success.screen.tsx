import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayList, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayPageWrapper } from '@app/components/templates';
import { navigate, popAndReplace } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import inquireBillService from '@app/network/services/bills-management/inquire-bill/inquire-bill.service';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, customInvalidateQuery, States } from '@app/utilities';
import { checkDateValidation, getDateFormate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import React from 'react';
import { useTranslation } from 'react-i18next';
import usePayBillSuccess from './bill-pay-success.hook';
import { BillPaySuccessProps } from './bill-pay-success.interface';
import ipayBillSuccessStyles from './bill-pay-success.style';

interface BillPaymentItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  item: BillPaymentInfosTypes;
}

const PayBillScreen: React.FC<BillPaySuccessProps> = ({ route }) => {
  const { t } = useTranslation();
  const {
    isSaveOnly,
    isPayOnly,
    isPayPartially,
    totalAmount,
    billPaymentInfos,
    billPaymentData,
    headerAttributes,
    inquireBillPayload,
  } = route.params;
  const { colors } = useTheme();
  const styles = ipayBillSuccessStyles(colors);
  const { goToHome } = usePayBillSuccess();
  // TODO will be updated basis of API.
  const billStatus = {
    paid: '1 Paid Bills',
    unpaid: '1 Unpaid Bills',
  };

  const successMessage = isSaveOnly ? 'PAY_BILL.SAVED_SUCCESS' : 'PAY_BILL.PAID_SUCCESS';

  const dateFormat = (dueDateTime: string) => {
    const date = checkDateValidation(dueDateTime, dateTimeFormat.ShortDateWithDash);
    const isoFormat = checkDateValidation(dueDateTime, dateTimeFormat.ISODate);
    if (isoFormat.isValid()) {
      return dueDateTime ? getDateFormate(isoFormat, dateTimeFormat.DateMonthYearWithoutSpace) : '-';
    }
    return dueDateTime ? getDateFormate(date, dateTimeFormat.DateMonthYearWithoutSpace) : '-';
  };

  const getBillInfoArray = (item: BillPaymentInfosTypes) => [
    {
      id: '1',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: item.serviceDescription ? item.serviceDescription : '-',
    },
    {
      id: '2',
      label: t('PAY_BILL.ACCOUNT_NUMBER'),
      value: item.billNumOrBillingAcct,
    },
    {
      id: '3',
      label: t('COMMON.DATE'),
      value: dateFormat(item.dueDateTime),
    },
    {
      id: '4',
      label: t('COMMON.REF_NUM'),
      value: item.transactionId,
      icon: icons.copy,
    },
  ];

  const onInquireBill = async () => {
    const apiResponse: any = await inquireBillService(inquireBillPayload);
    if (apiResponse.successfulResponse) {
      customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
      navigate(ScreenNames.NEW_SADAD_BILL, {
        billDetailsList: [billPaymentInfos],
        dueDate: apiResponse?.response?.dueDate || '',
        totalAmount: apiResponse?.response?.dueAmount || totalAmount,
        isSaveOnly,
      });
    }
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={successMessage}
          descriptionText={isSaveOnly ? '' : `${totalAmount} ${t('COMMON.SAR')}`}
          descriptionStyle={[styles.boldStyles, styles.descriptionText]}
          headingStyle={styles.headingStyle}
        />
        {isPayPartially && (
          <IPayView style={styles.chipWrapper}>
            <IPayChip textValue={billStatus.paid} isShowIcon={false} variant={States.SUCCESS} />
            <IPayChip textValue={billStatus.unpaid} isShowIcon={false} variant={States.ERROR} />
          </IPayView>
        )}
        <IPayShareableImageView
          otherView={
            <IPayView style={styles.footerView}>
              {isSaveOnly ? (
                <IPayButton
                  medium
                  btnType={buttonVariants.OUTLINED}
                  leftIcon={<IPayIcon icon={icons.ARROW_LEFT} color={colors.primary.primary500} size={16} />}
                  btnText="PAY_BILL.VIEW_SADAD_BILLS"
                  btnStyle={styles.btnStyle}
                  onPress={() => {
                    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
                    navigate(ScreenNames.BILL_PAYMENTS_SCREEN, { sadadBills: null });
                  }}
                />
              ) : (
                <IPayView style={isPayOnly && styles.btnWrapper}>
                  <IPayButton
                    medium
                    btnType={buttonVariants.LINK_BUTTON}
                    leftIcon={<IPayIcon icon={icons.refresh_48} color={colors.primary.primary500} size={16} />}
                    btnText="PAY_BILL.PAY_ANOTHER_BILL"
                    onPress={() => {
                      customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
                      popAndReplace(ScreenNames.SADAD_BILLS, 3, { sadadBills: null });
                    }}
                  />
                  {isPayOnly && (
                    <IPayButton
                      medium
                      btnType={buttonVariants.LINK_BUTTON}
                      leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
                      btnText={t('COMMON.SHARE')}
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
                  <IPayIcon
                    icon={icons.HOME}
                    color={isSaveOnly ? colors.primary.primary500 : colors.natural.natural0}
                  />
                }
                btnText="COMMON.HOME"
              />
            </IPayView>
          }
        >
          <IPayScrollView style={styles.successScrollView} showsVerticalScrollIndicator={false}>
            {!isSaveOnly && (
              <IPayView style={styles.conatinerStyles}>
                {isPayPartially && (
                  <IPayList
                    isShowLeftIcon
                    containerStyle={styles.listContainer}
                    leftIcon={<IPayIcon icon={icons.clipboard_close1} color={colors.error.error500} size={24} />}
                    title="PAY_BILL.DECLINED_TRANSACTION"
                    isShowSubTitle
                    subTitle="PAY_BILL.DOES_NOT_ACCEPT_PARTIALLY_PAYMENT"
                    subTextStyle={{ color: colors.error.error500 }}
                    textStyle={{ color: colors.error.error500 }}
                    regularTitle={false}
                  />
                )}

                <IPayFlatlist
                  data={billPaymentInfos}
                  keyExtractor={(item, index) => `${item.billNickname}-${index}-bill-info`}
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
            )}
            {isSaveOnly && (
              <IPayView style={[styles.conatinerStyles, isSaveOnly && styles.saveContainer]}>
                <IPayBillDetailsOption
                  headerData={{
                    title: headerAttributes.billNickname,
                    companyDetails: headerAttributes.billerName,
                    companyImage: headerAttributes.billerIcon,
                  }}
                  showHeader
                  showDetail
                  isShowIcon={false}
                  style={styles.billContainer}
                  data={billPaymentData.slice(0, 2)}
                  optionsStyles={styles.optionsStyle}
                />
                <IPayButton
                  medium
                  btnType={buttonVariants.PRIMARY}
                  btnIconsDisabled
                  btnText="PAY_BILL.PAY_NOW"
                  onPress={onInquireBill}
                />
              </IPayView>
            )}
          </IPayScrollView>
        </IPayShareableImageView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default PayBillScreen;
