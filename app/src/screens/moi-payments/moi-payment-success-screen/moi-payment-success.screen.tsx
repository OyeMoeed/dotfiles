import icons from '@app/assets/icons';
import { Home2, Refresh2Icon, Send2Icon } from '@app/assets/svgs';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, customInvalidateQuery, toggleAppRating } from '@app/utilities';
import { ToastTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ItemProps } from './moi-payment-success.interface';
import moiPaymentSuccessStyles from './moi-payment-success.styles';

const MoiPaymentSuccess: React.FC = ({ route }) => {
  const { t } = useTranslation();
  const { moiPaymentDetailes, successMessage, isRefund, subDetails } = route.params;
  const { colors } = useTheme();
  const styles = moiPaymentSuccessStyles(colors);
  const { showToast } = useToastContext();
  const [paymentDtails, setPaymentDetails] = useState<ItemProps[]>([]);
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };
  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: 'TOP_UP.REF_NUMBER_COPIED', toastType: ToastTypes.INFORMATION });
  };

  const onPressHome = () => {
    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
    toggleAppRating();
    resetNavigation(ScreenNames.HOME_BASE);
  };

  const getDataToRender = useCallback(() => {
    const updatedPaymentDetails = moiPaymentDetailes?.dynamicFields?.filter((item: { id: string }) => item.id !== '1');

    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails?.map((item: any, index: number) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    const serviceType = {
      id: (updatedPaymentDetailsWithNewIds.length + 1).toString(),
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: moiPaymentDetailes?.serviceTypeFromLOV?.desc,
    };
    const serviceProvider = {
      id: (updatedPaymentDetailsWithNewIds.length + 2).toString(),
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: moiPaymentDetailes?.serviceProviderFromLOV?.desc,
    };

    const ref = {
      id: '6',
      label: t('COMMON.REF_NUM'),
      value: subDetails?.transactionId,
      icon: icons.copy,
    };
    setPaymentDetails([serviceProvider, serviceType, ...updatedPaymentDetailsWithNewIds, ...(!isRefund ? [ref] : [])]);
  }, [moiPaymentDetailes]);

  const onPressPayOtherBill = () => {
    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
    resetNavigation(ScreenNames.MOI_PAYMENT_SCREEN);
  };

  useEffect(() => {
    getDataToRender();
  }, [moiPaymentDetailes]);

  const renderItem = ({ item }: ItemProps) => {
    const { label, value, icon } = item;

    return (
      <IPayView style={styles.dataCardView}>
        <IPayFootnoteText regular text={label} color={colors.natural.natural900} />
        <IPayView style={styles.transactionDetailsView}>
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={value}
              color={colors.primary.primary800}
              numberOfLines={1}
              style={styles.valueStyle}
            />
            {icon && (
              <IPayPressable style={styles.icon} onPress={() => onPressCopy(value)}>
                <IPayIcon icon={icon} size={18} color={colors.primary.primary500} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  return (
    <IPayPageWrapper>
      <IPayLinearGradientView style={styles.innerLinearGradientView} gradientColors={gradientColors}>
        <IPaySuccess
          headingText={successMessage}
          subHeadingText={`${isRefund ? '0.0' : moiPaymentDetailes.totalFeeAmount}  ${t('COMMON.SAR')}`}
          style={StyleSheet.flatten(styles.headerView)}
        />

        <IPayShareableImageView
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  onPress={onPressPayOtherBill}
                  leftIcon={<Refresh2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText={isRefund ? 'BILL_PAYMENTS.ANOTHER_REFUND' : 'BILL_PAYMENTS.PAY_ANOTHER_BILL'}
                />
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText={t('TOP_UP.SHARE')}
                />
              </IPayView>
              <IPayButton
                onPress={onPressHome}
                btnType={buttonVariants.PRIMARY}
                large
                leftIcon={<Home2 style={styles.homeIcon} color={colors.natural.natural0} />}
                btnText="COMMON.HOME"
              />
            </IPayView>
          }
        >
          <IPayView style={styles.listView}>
            <IPayScrollView showsVerticalScrollIndicator={false}>
              <IPayView>
                <IPayView style={styles.dataTopView}>
                  <IPayFlatlist
                    data={paymentDtails}
                    keyExtractor={(_, index) => index.toString()}
                    itemSeparatorStyle={styles.itemSeparatorStyle}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    scrollEnabled={false}
                  />
                </IPayView>
              </IPayView>
            </IPayScrollView>
          </IPayView>
        </IPayShareableImageView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};
export default MoiPaymentSuccess;
