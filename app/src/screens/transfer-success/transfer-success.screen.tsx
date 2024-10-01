import icons from '@app/assets/icons';
import images from '@app/assets/images';
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
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, customInvalidateQuery, toggleAppRating } from '@app/utilities';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import { ItemProps, TransferDetails } from './transfer-success.interface';
import transferSuccessStyles from './transfer-success.style';

const TransferSuccessScreen = () => {
  const { colors } = useTheme();
  const styles = transferSuccessStyles(colors);
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const gradientColors = [colors.natural.natural50, colors.natural.natural50];
  const [beneficiaryDetails, setBeneficiaryDetails] = useState([]);

  type RouteProps = RouteProp<{ params: TransferDetails }, 'params'>;
  const route = useRoute<RouteProps>();
  const { amount, beneficiaryNickName, transferPurpose, instantTransferType, note, refNumber, bankDetails } =
    route.params;

  useEffect(() => {
    const beneficiaryDetailsArray = [
      { title: 'TRANSFER_SUMMARY.AMOUNT', subTitle: `${amount} ${t('COMMON.SAR')}` },
      { title: 'INTERNATIONAL_TRANSFER.BENEFICIARY_NICK_NAME', subTitle: beneficiaryNickName, icon: '' },
      { title: 'TRANSFER_SUMMARY.REASON', subTitle: transferPurpose, icon: '' },
      {
        title: 'TRANSFER_SUMMARY.FAST_CONVERSION_BY',
        subTitle: instantTransferType,
        icon: images.sarie,
      },
      { title: 'TRANSFER_SUMMARY.NOTE', subTitle: note, icon: '' },
      { title: 'COMMON.REF_NUMBER', subTitle: refNumber, icon: icons.copy },
    ];
    setBeneficiaryDetails(beneficiaryDetailsArray);
  }, []);

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title: title || t('passcode_error'),
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

  const renderItem = ({ item, index }: ItemProps) => {
    const isImage =
      typeof item.icon === 'number' ||
      (typeof item.icon === 'string' &&
        (item.icon.includes('.png') || item.icon.includes('.jpg') || item.icon.includes('data:image')));

    return (
      <IPayView>
        {index === 0 && Object.keys(bankDetails || {}).length && (
          <IPayView style={styles.beneficiaryBankDetailsView}>
            <IPayIcon icon={bankDetails?.icon} size={30} />
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
          subHeadingText={`${amount} ${t('COMMON.SAR')}`}
          style={StyleSheet.flatten(styles.headerView)}
          shouldTranslateSubHeadingText={false}
        />

        <IPayShareableImageView
          otherView={
            <IPayView style={styles.footerView}>
              <IPayView style={styles.linkButtonsView}>
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<Send2Icon style={styles.iconStyle} color={colors.primary.primary500} />}
                  btnText={t('TOP_UP.SHARE')}
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
