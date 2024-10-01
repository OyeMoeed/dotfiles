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
import { IPayButton, IPayChip, IPayGradientText, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, customInvalidateQuery, toggleAppRating } from '@app/utilities';
import React from 'react';
import { buttonVariants } from '@app/utilities/enums.util';
import ViewShot from 'react-native-view-shot';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import useShareableImage from '@app/components/molecules/ipay-shareable-imageview/ipay-shareable-imageview.hook';
import { useTranslation } from 'react-i18next';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import { IW2WTransferSuccessProps, PayData } from './ipay-w2w-transfer-successful.interface';
import { TopUpSuccessStyles } from './ipay-w2w-transfer-successful.styles';

const IPayW2WTransferSuccess: React.FC<IW2WTransferSuccessProps> = ({ transferDetails, totalAmount, variant }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = TopUpSuccessStyles(colors);
  const { viewShotRef, shareImage } = useShareableImage();

  const { showToast } = useToastContext();
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const renderToast = () => {
    showToast({
      title: t('TOP_UP.COPIED'),
      subTitle: t('TOP_UP.REF_NUMBER_COPIED'),
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: styles.toastContainer,
    });
  };

  const handleClickOnCopy = (textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const infoLabel = variant === TransactionTypes.PAYMENT_REQUEST ? t('REQUEST_SUMMARY.FROM') : t('TOP_UP.TRANSFER_TO');

  const formattedTransfersDetails = transferDetails.formData.map((item, index) => {
    const summeryArray = [];
    const titleObject = () => {
      if (!item?.hasWallet) {
        return {
          id: '2',
          label: infoLabel,
          value: item.subtitle,
          icon: null,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        };
      }
      return {
        id: '2',
        label: infoLabel,
        value: item.subtitle,
        leftIcon: variant === TransactionTypes.PAYMENT_REQUEST ? icons.user_square : images.alinmaP,
        isAlinma: true,
      };
    };

    summeryArray.push(titleObject());
    if (transferDetails?.apiData[index]?.transactionId) {
      summeryArray.push({
        id: '3',
        label: t('TOP_UP.TRANSACTION_ID'),
        value: transferDetails.apiData[index].transactionId,
        icon: icons.copy,
        color: colors.primary.primary500,
      });
    }
    summeryArray.push({
      id: '4',
      label: t('TRANSACTION_HISTORY.AMOUNT'),
      value: item.amount,
      icon: null,
    });

    if (item.selectedItem) {
      summeryArray.push({
        id: '1',
        label: t('TRANSACTION_HISTORY.TRANSFER_REASON'),
        value: item.selectedItem.text,
      });
    }
    if (item.notes) {
      summeryArray.push({ id: '4', label: t('TRANSFER_SUMMARY.NOTE'), value: item.notes });
    }
    return summeryArray;
  });

  const renderWallerPayItem = ({ item, index }: { item: PayData; index: number }) => {
    const { isAlinma, icon, leftIcon, label, value, color } = item;
    const renderLeftIcon = () => {
      if (!leftIcon) {
        return null;
      }
      if (isAlinma) {
        return (
          <IPayView style={styles.leftIcon}>
            <IPayImage image={images.alinmaP} style={styles.alinmaLogo} resizeMode="contain" />
          </IPayView>
        );
      }
      return (
        <IPayPressable style={styles.appleIcon}>
          <IPayIcon icon={icons.user_square} size={18} color={colors.primary.primary900} />
        </IPayPressable>
      );
    };

    const modifyValue = label === t('COMMON.AMOUNT') ? `${value} ${t('COMMON.SAR')}` : value;
    const isFirstItem = index === 0;
    return (
      <IPayView key={item.id}>
        {isFirstItem && !isAlinma && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue="TRANSFER_SUMMARY.CHIP_TITLE"
              headingStyles={styles.chipColors}
            />
          </IPayView>
        )}

        <IPayView style={styles.listContainer}>
          <IPayView style={styles.walletListBackground}>
            <IPayView style={styles.iconLabel}>
              {renderLeftIcon()}
              <IPayFootnoteText text={label} numberOfLines={2} />
            </IPayView>
            <IPayView style={styles.listDetails}>
              <IPayFootnoteText
                text={modifyValue}
                style={styles.detailsText}
                numberOfLines={2}
                shouldTranslate={false}
              />
              {icon && (
                <IPayPressable
                  style={styles.copyIcon}
                  onPress={() => {
                    if (icon === icons.copy) {
                      handleClickOnCopy(modifyValue);
                    }
                  }}
                >
                  <IPayIcon icon={icon} color={color} size={18} />
                </IPayPressable>
              )}
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderText = () =>
    variant === TransactionTypes.PAYMENT_REQUEST ? 'REQUEST_SUMMARY.REQUEST_SENT' : 'TOP_UP.TRANSFER_SUCCESSFUL';

  const renderActionLabel = () => (
    <IPayPressable
      style={styles.newTopup}
      onPress={() => {
        customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
        if (variant === TransactionTypes.PAYMENT_REQUEST) {
          navigate(screenNames.REQUEST_MONEY);
        } else {
          navigate(screenNames.WALLET_TRANSFER);
        }
      }}
    >
      <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
      <IPaySubHeadlineText
        text={variant === TransactionTypes.PAYMENT_REQUEST ? 'REQUEST_SUMMARY.NEW_REQUEST' : 'TOP_UP.NEW_TRANSFER'}
        style={styles.newTopupText}
        regular
      />
    </IPayPressable>
  );

  const viewShot = () => {
    shareImage();
  };

  const renderCard = () => (
    <IPayFlatlist
      showsVerticalScrollIndicator={false}
      data={formattedTransfersDetails}
      style={styles.cardList}
      renderItem={({ item }) => (
        <IPayView
          key={item[0].value}
          style={[styles.walletBackground, variant === TransactionTypes.PAYMENT_REQUEST && styles.margin20]}
        >
          <IPayFlatlist style={styles.cardList} scrollEnabled={false} data={item} renderItem={renderWallerPayItem} />
          <IPayButton
            btnType={buttonVariants.LINK_BUTTON}
            onPress={viewShot}
            btnText={t('TOP_UP.SHARE')}
            leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
          />
        </IPayView>
      )}
    />
  );

  return (
    <IPayView style={styles.container}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <IPayLinearGradientView
          style={styles.innerLinearGradientView}
          gradientColors={[colors.backgrounds.successBackground, colors.backgrounds.successBackground]}
        >
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
                  text={`${totalAmount} ${t('COMMON.SAR')}`}
                  style={styles.headlineText}
                  shouldTranslate={false}
                />
              )}
            </IPayView>
          </IPayView>
          {renderCard()}

          <IPayView>
            {renderActionLabel()}
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText="COMMON.HOME"
              hasLeftIcon
              leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
              onPress={() => {
                customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
                toggleAppRating();
                navigate(screenNames.HOME);
              }}
              textStyle={styles.text}
            />
          </IPayView>
        </IPayLinearGradientView>
      </ViewShot>
    </IPayView>
  );
};

export default IPayW2WTransferSuccess;
