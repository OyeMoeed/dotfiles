import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
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
import moiPaymentSuccessStyles from './moi-payment-success.styles';
import { ItemProps } from './transfer-success.interface';

const MoiPaymentSuccess: React.FC = ({ route }) => {
  const { moiPaymentDetailes } = route.params;
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
    const finalDetails = [...reorderedDetails, newItem].sort((a, b) => a.id - b.id);
    setPaymentDetails(finalDetails);
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
              style={[styles.valueStyle, value.length > 20 && styles.condtionalWidthSubtitle]}
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
          headingText={localizationText.BILL_PAYMENTS.PAYMENT_SUCCESS_MESSAGE}
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
                  leftIcon={<IPayIcon icon={icons.refresh2} size={14} color={colors.primary.primary500} />}
                  btnText={localizationText.BILL_PAYMENTS.PAY_ANOTHER_BILL}
                />
                <IPayButton
                  onPress={onPressShare}
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                  btnText={localizationText.TOP_UP.SHARE}
                />
              </IPayView>
              <IPayButton
                onPress={onPressHome}
                btnType={buttonVariants.PRIMARY}
                large
                leftIcon={<IPayIcon icon={icons.HOME_2} size={14} color={colors.natural.natural0} />}
                btnText={localizationText.COMMON.HOME}
              />
            </IPayView>
          }
        >
          <IPayView style={styles.dataView}>
            <IPayFlatlist
              data={paymentDtails}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          </IPayView>
        </IPayShareableImageView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};
export default MoiPaymentSuccess;