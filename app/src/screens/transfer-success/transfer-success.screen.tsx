import icons from '@app/assets/icons';
import { ExportIcon, Send2Icon } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayShareableImageView, IPaySuccess } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPayPageWrapper } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ItemProps } from './transfer-success.interface';
import transferSuccessStyles from './transfer-success.style';

const TransferSuccessScreen = () => {
  const { colors } = useTheme();
  const styles = transferSuccessStyles(colors);
  const { t } = useTranslation();
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const gradientColors = [colors.natural.natural50, colors.natural.natural50];
  const totalTransferedAmount = `3000 ${localizationText.COMMON.SAR}`;
  const bankDetails = constants.BANK_DETAILS;
  const beneficiaryDetails = constants.SUCCESS_BENEFICIARY_DETAILS;

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title: title || localizationText.passcode_error,
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
    renderToast({ title: t('TOP_UP.REF_NUMBER_COPIED'), toastType: ToastTypes.INFORMATION });
  };

  const onPressShare = () => {
    setIsShareable(true);
  };

  const onPressHome = () => {
    resetNavigation(ScreenNames.HOME_BASE);
  };

  const renderItem = ({ item, index }: ItemProps) => {
    const isImage =
      typeof item.icon === 'number' ||
      (typeof item.icon === 'string' &&
        (item.icon.includes('.png') || item.icon.includes('.jpg') || item.icon.includes('data:image')));

    return (
      <IPayView>
        {index === 0 && (
          <IPayView style={styles.beneficiaryBankDetailsView}>
            <IPayImage image={bankDetails?.icon} style={styles.bankLogo} />
            <IPayView style={styles.bankDetailsView}>
              <IPayView style={styles.bankTitleView}>
                <IPayFootnoteText regular={false} text={bankDetails?.title} color={colors.natural.natural900} />
                <IPayCaption2Text regular text={` | ${bankDetails?.bankName}`} color={colors.natural.natural900} />
              </IPayView>
              <IPayCaption1Text text={bankDetails?.accountNumber} color={colors.natural.natural500} />
            </IPayView>
          </IPayView>
        )}
        <IPayView style={styles.dataCardView}>
          <IPayFootnoteText regular text={item.title} color={colors.natural.natural900} />
          <IPayView style={styles.transactionDetailsView}>
            <IPayView style={styles.detailsView}>
              <IPaySubHeadlineText
                regular
                text={item.subTitle + (item.currency ? ` ${item.currency}` : '')}
                color={colors.primary.primary800}
                numberOfLines={1}
                style={[styles.subTitle, item?.subTitle.length > 20 && styles.condtionalWidthSubtitle]}
              />
              {item.icon &&
                (isImage ? (
                  <IPayImage image={item.icon} style={styles.imageStyle} />
                ) : (
                  <IPayPressable style={styles.icon} onPress={() => onPressCopy(item.subTitle)}>
                    <IPayIcon icon={item.icon} size={18} color={colors.primary.primary500} />
                  </IPayPressable>
                ))}
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  return (
    <IPayPageWrapper>
      <IPayLinearGradientView style={styles.innerLinearGradientView} gradientColors={gradientColors}>
        <IPaySuccess
          headingText="TOP_UP.TRANSFER_SUCCESSFUL"
          subHeadingText={totalTransferedAmount}
          style={StyleSheet.flatten(styles.headerView)}
        />

        <IPayShareableImageView
          isShareable={isShareable}
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  onPress={onPressShare}
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="TOP_UP.SHARE"
                />
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  rightIcon={<ExportIcon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText="TRANSACTION_HISTORY.VAT_INVOICE"
                />
              </IPayView>
              <IPayButton
                onPress={onPressHome}
                btnType={buttonVariants.PRIMARY}
                large
                leftIcon={<IPayIcon icon={icons.HOME_2} size={14} color={colors.natural.natural0} />}
                btnText="COMMON.HOME"
              />
            </IPayView>
          }
        >
          <IPayView style={styles.dataView}>
            <IPayFlatlist
              data={beneficiaryDetails}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          </IPayView>
        </IPayShareableImageView>
      </IPayLinearGradientView>
    </IPayPageWrapper>
  );
};
export default TransferSuccessScreen;
