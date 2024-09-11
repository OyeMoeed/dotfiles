import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { IW2WTransferSuccessProps, PayData } from './ipay-w2w-transfer-successful.interface';
import { TopUpSuccessStyles } from './ipay-w2w-transfer-successful.styles';

const IPayW2WTransferSuccess: React.FC<IW2WTransferSuccessProps> = ({ transferDetails, totalAmount }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = TopUpSuccessStyles(colors);

  const route = useRoute();

  const { variant } = route.params as { variant: string };

  const { showToast } = useToastContext();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const renderToast = () => {
    showToast({
      title: localizationText.TOP_UP.COPIED,
      subTitle: localizationText.TOP_UP.REF_NUMBER_COPIED,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const formattedTransfersDetails = transferDetails.formData.map((item, index) => {
    const summeryArray = [];
    const titleObject = () => {
      if (item?.walletNumber) {
        return {
          id: '2',
          label:
            variant === TransactionTypes.PAYMENT_REQUEST
              ? localizationText.REQUEST_SUMMARY.FROM
              : localizationText.TOP_UP.TRANSFER_TO,
          value: item.subtitle,
          icon: null,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        };
      }
      return {
        id: '2',
        label:
          variant === TransactionTypes.PAYMENT_REQUEST
            ? localizationText.REQUEST_SUMMARY.FROM
            : localizationText.TOP_UP.TRANSFER_TO,
        value: item.subtitle,
        leftIcon: variant === TransactionTypes.PAYMENT_REQUEST ? icons.user_square : images.alinmaP,
        isAlinma: true,
      };
    };

    summeryArray.push(titleObject());
    if (transferDetails.apiData[index].transactionId) {
      summeryArray.push({
        id: '3',
        label: localizationText.TOP_UP.TRANSACTION_ID,
        value: transferDetails.apiData[index].transactionId,
        icon: icons.copy,
        color: colors.primary.primary500,
      });
    }
    summeryArray.push({
      id: '4',
      label: localizationText.TRANSACTION_HISTORY.AMOUNT,
      value: item.amount,
      icon: null,
    });

    if (item.selectedItem) {
      summeryArray.push({
        id: '1',
        label: localizationText.TRANSACTION_HISTORY.TRANSFER_REASON,
        value: item.selectedItem.text,
      });
    }
    if (item.notes) {
      summeryArray.push({ id: '4', label: localizationText.TRANSFER_SUMMARY.NOTE, value: item.notes });
    }
    return summeryArray;
  });

  const renderWallerPayItem = ({ item }: { item: PayData }) => {
    const { icon, detailsText, leftIcon, label, value, color } = item;

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <IPayIcon icon={leftIcon} size={18} />
              </IPayView>
            )}
            <IPayFootnoteText text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable
                style={styles.appleIcon}
                onPress={() => {
                  if (icon === icons.copy) {
                    handleClickOnCopy(3, detailsText);
                  }
                }}
              >
                <IPayIcon icon={icon} style={styles.appleIcon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderText = () =>
    variant === TransactionTypes.PAYMENT_REQUEST
      ? localizationText.REQUEST_SUMMARY.REQUEST_SENT
      : localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

  const renderActionLabel = () => (
    <IPayPressable
      style={styles.newTopup}
      onPress={() => {
        if (variant === TransactionTypes.PAYMENT_REQUEST) {
          navigate(screenNames.REQUEST_MONEY);
        } else {
          navigate(screenNames.WALLET_TRANSFER);
        }
      }}
    >
      <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
      <IPaySubHeadlineText
        text={
          variant === TransactionTypes.PAYMENT_REQUEST
            ? localizationText.REQUEST_SUMMARY.NEW_REQUEST
            : localizationText.TOP_UP.NEW_TRANSFER
        }
        style={styles.newTopupText}
        regular
      />
    </IPayPressable>
  );

  return (
    <IPayView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />

      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.backgrounds.successBackground, colors.backgrounds.successBackground]}
      >
        <IPayShareableImageView>
          <IPayView>
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={renderText()}
                gradientColors={gradientColors}
                style={styles.gradientTextSvg}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
              />
              {variant !== TransactionTypes.PAYMENT_REQUEST && (
                <IPaySubHeadlineText
                  regular={false}
                  text={`${totalAmount} ${localizationText.COMMON.SAR}`}
                  style={styles.headlineText}
                />
              )}
            </IPayView>
            {formattedTransfersDetails.map((item) => (
              <IPayView
                key={item[0].value}
                style={[styles.walletBackground, variant === TransactionTypes.PAYMENT_REQUEST && styles.margin20]}
              >
                <IPayFlatlist
                  style={styles.detailesFlex}
                  scrollEnabled={false}
                  data={item}
                  renderItem={renderWallerPayItem}
                />
                <IPayPressable style={styles.newTopup}>
                  <IPayIcon icon={icons.share} color={colors.primary.primary500} size={14} />
                  <IPaySubHeadlineText text={localizationText.TOP_UP.SHARE} regular style={styles.newTopupText} />
                </IPayPressable>
              </IPayView>
            ))}
          </IPayView>
        </IPayShareableImageView>

        <IPayView>
          {renderActionLabel()}
          <IPayButton
            large
            btnType="primary"
            btnText={localizationText.COMMON.HOME}
            hasLeftIcon
            leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
            onPress={() => navigate(screenNames.HOME)}
            textStyle={styles.text}
          />
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayW2WTransferSuccess;
