import icons from '@app/assets/icons';
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
import { copyText } from '@app/utilities/clip-board.util';
import { buttonVariants, toastTypes } from '@app/utilities/enums.util';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import images from '@app/assets/images';
import { ItemProps, RouteParams } from './transfer-success.interface';
import transferSuccessStyles from './transfer-success.style';

const TransferSuccessScreen = () => {
  const { colors } = useTheme();
  const styles = transferSuccessStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [isShareable, setIsShareable] = useState<boolean>(false);
  const gradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const totalTransferedAmount = `3000 ${localizationText.COMMON.SAR}`;
  const bankDetails = constants.BANK_DETAILS;
  const [beneficiaryDetails, setBeneficiaryDetails] = useState([])

  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;
  const route = useRoute<RouteProps>();
  const { amount, beneficiaryNickName, transferPurpose, fastConversionBy, note, refNumber } = route?.params;

  useEffect(() => {
    setBeneficiaryDetails([
      { title: 'Amount', subTitle: `${amount} SAR` },
      { title: 'Beneficiary Nick Name ', subTitle: beneficiaryNickName, icon: '' },
      { title: 'Reason of Transfer', subTitle: transferPurpose, icon: '' },
      { title: 'Fast conversion by', subTitle: fastConversionBy, icon: images.sarie },
      { title: 'Note', subTitle: note, icon: '' },
      { title: 'Ref. Number', subTitle: refNumber, icon: icons.copy },
    ]);
  },[])

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
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: toastTypes.INFORMATION });
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
                text={item.subTitle}
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
          headingText={localizationText.TOP_UP.TRANSFER_SUCCESSFUL}
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
                  leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                  btnText={localizationText.TOP_UP.SHARE}
                />
                <IPayButton
                  btnType={buttonVariants.LINK_BUTTON}
                  small
                  leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                  btnText={localizationText.TRANSACTION_HISTORY.VAT_INVOICE}
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
