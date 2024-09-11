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
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { buttonVariants, toastTypes } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ItemProps } from './moi-payment-success.interface';
import moiPaymentSuccessStyles from './moi-payment-success.styles';

const MoiPaymentSuccess: React.FC = ({ route }) => {
  const { moiPaymentDetailes, successMessage, refund, subDetails } = route.params;
  const { colors } = useTheme();
  const styles = moiPaymentSuccessStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const [paymentDtails, setPaymentDetails] = useState<ItemProps[]>([]);
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const totalTransferedAmount = `500 ${localizationText.COMMON.SAR}`;

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
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: toastTypes.INFORMATION });
  };

  const onPressShare = () => {
    setIsShareable(true);
  };

  const onPressHome = () => {
    resetNavigation(ScreenNames.HOME_BASE);
  };

  const getDataToRender = () => {
    // Step 1: Remove the object with id "1"
    const updatedDetails = moiPaymentDetailes.filter((item: { id: string }) => item.id !== '1');

    // Step 2: Update ids to maintain sequential order
    const reorderedDetails = updatedDetails.map((item: ItemProps, index: number) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    // Step 3: Add the new object with id "6" TODO
    const newItem = {
      id: '6',
      label: 'Ref. Number',
      value: 'FTA35346',
      icon: icons.copy,
    };

    // Adding the new item and re-sorting the array
    const detailsWithNewItem = refund ? reorderedDetails : [...reorderedDetails, newItem];
    const finalDetails = detailsWithNewItem.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
    setPaymentDetails(finalDetails);
  };

  const onPressPayOtherBill = () => {
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
              style={[styles.valueStyle]}
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
          subHeadingText={totalTransferedAmount}
          style={StyleSheet.flatten(styles.headerView)}
        />

        <IPayShareableImageView
          isShareable={isShareable}
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  onPress={onPressPayOtherBill}
                  leftIcon={<Refresh2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText={'BILL_PAYMENTS.PAY_ANOTHER_BILL'}
                />
                <IPayButton
                  onPress={onPressShare}
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText={'TOP_UP.SHARE'}
                />
              </IPayView>
              <IPayButton
                onPress={onPressHome}
                btnType={buttonVariants.PRIMARY}
                large
                leftIcon={<Home2 style={styles.homeIcon} color={colors.natural.natural0} />}
                btnText={'COMMON.HOME'}
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
                <IPayView style={styles.dataBottomView}>
                  <IPayFlatlist
                    data={subDetails}
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
