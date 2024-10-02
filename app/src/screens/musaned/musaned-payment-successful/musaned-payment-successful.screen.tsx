import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import { Home2, Refresh2Icon, Send2Icon } from '@app/assets/svgs';
import { IPayButton, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { ToastTypes, buttonVariants } from '@app/utilities/enums.util';
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

import musanedPaymentSuccessful from './musaned-payment-successful.style';

const MusanedPaymentSuccessfulScreen: React.FC = () => {
  const { t } = useTranslation();

  const successMessage = 'MUSANED.PAYMENT_SUCCESS_MESSAGE';
  const { colors } = useTheme();
  const styles = musanedPaymentSuccessful(colors);
  const { showToast } = useToastContext();
  const [paymentDetails, setPaymentDetails] = useState<any[]>([]);
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const totalTransferredAmount = `500 ${t('COMMON.SAR')}`;

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
    resetNavigation(ScreenNames.HOME_BASE);
  };

  const getDataToRender = useCallback(() => {
    const serviceType = {
      id: (1).toString(),
      label: t('MUSANED.LABORER_ID'),
      value: 'asd',
    };
    const serviceProvider = {
      id: (2).toString(),
      label: t('COMMON.DATE'),
      value: 'asd',
    };

    setPaymentDetails([serviceType, serviceProvider]);
  }, []);

  useEffect(() => {
    getDataToRender();
  }, []);

  const renderItem = ({ item }: any) => {
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
          subHeadingText={totalTransferredAmount}
          style={StyleSheet.flatten(styles.headerView)}
        />

        <IPayShareableImageView
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Refresh2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="MUSANED.PAY_ANOTHER_LABORER"
                />
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="TOP_UP.SHARE"
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
                    data={paymentDetails}
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
export default MusanedPaymentSuccessfulScreen;
