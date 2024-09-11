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
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import React from 'react';
import { buttonVariants } from '@app/utilities/enums.util';
import ViewShot from 'react-native-view-shot';
import useShareableImage from '@app/components/molecules/ipay-shareable-imageview/ipay-shareable-imageview.hook';
import { IW2WTransferSuccessProps, PayData } from './ipay-w2w-transfer-successful.interface';
import { TopUpSuccessStyles } from './ipay-w2w-transfer-successful.styles';

const IPayW2WTransferSuccess: React.FC<IW2WTransferSuccessProps> = ({ transferDetails, totalAmount }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = TopUpSuccessStyles(colors);
  const { viewShotRef, shareImage } = useShareableImage();

  const { showToast } = useToastContext();
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const formattedTransfersDetails = transferDetails.formData.map((item, index) => {
    if (item?.walletNumber) {
      return [
        {
          id: '2',
          label: localizationText.TOP_UP.TRANSFER_TO,
          value: item.subtitle,
          icon: null,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        },
        {
          id: '3',
          label: localizationText.TOP_UP.TRANSACTION_ID,
          value: transferDetails.apiData[index].transactionId,
          icon: icons.copy,
          color: colors.primary.primary500,
        },
        { id: '4', label: localizationText.TRANSACTION_HISTORY.AMOUNT, value: item.amount, icon: null },
        { id: '1', label: localizationText.TRANSACTION_HISTORY.TRANSFER_REASON, value: item.selectedItem.text },
      ];
    }
    return [
      {
        id: '2',
        label: localizationText.TOP_UP.TRANSFER_TO,
        value: item.subtitle,
        leftIcon: images.alinmaP,
        isAlinma: true,
      },
      {
        id: '3',
        label: localizationText.TOP_UP.TRANSACTION_ID,
        value: transferDetails.apiData?.[index]?.transactionId,
        icon: icons.copy,
        color: colors.primary.primary500,
      },
      { id: '4', label: localizationText.TRANSACTION_HISTORY.AMOUNT, value: item.amount, icon: null },
      { id: '1', label: localizationText.TRANSACTION_HISTORY.TRANSFER_REASON, value: item?.selectedItem?.text },
    ];
  });

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

  const renderWallerPayItem = ({ item, index }: { item: PayData; index: number }) => {
    const { isAlinma, icon, detailsText, leftIcon, label, value, color } = item;
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

    const modifyValue = label === localizationText.COMMON.AMOUNT ? `${value} ${localizationText.COMMON.SAR}` : value;
    const isFirstItem = index === 0;
    return (
      <IPayView key={item.id}>
        {isFirstItem && !isAlinma && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
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
              <IPayFootnoteText text={modifyValue} style={styles.detailsText} numberOfLines={2} />
              {icon && (
                <IPayPressable
                  style={styles.copyIcon}
                  onPress={() => {
                    if (icon === icons.copy) {
                      handleClickOnCopy(3, detailsText);
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

  const renderText = () => localizationText.TOP_UP.TRANSFER_SUCCESSFUL;

  const renderActionLabel = () => (
    <IPayPressable
      style={styles.newTopup}
      onPress={() => {
        navigate(screenNames.WALLET_TRANSFER);
      }}
    >
      <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
      <IPaySubHeadlineText text={localizationText.TOP_UP.NEW_TRANSFER} style={styles.newTopupText} regular />
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
        <IPayView key={item[0].value} style={styles.walletBackground}>
          <IPayFlatlist style={styles.cardList} scrollEnabled={false} data={item} renderItem={renderWallerPayItem} />
          <IPayButton
            btnType="link-button"
            onPress={viewShot}
            btnText={localizationText.TOP_UP.SHARE}
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
              <IPaySubHeadlineText
                regular={false}
                text={`${totalAmount} ${localizationText.COMMON.SAR}`}
                style={styles.headlineText}
              />
            </IPayView>
          </IPayView>
          {renderCard()}

          <IPayView>
            {renderActionLabel()}
            <IPayButton
              large
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.COMMON.HOME}
              hasLeftIcon
              leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
              onPress={() => navigate(screenNames.HOME)}
              textStyle={styles.text}
            />
          </IPayView>
        </IPayLinearGradientView>
      </ViewShot>
    </IPayView>
  );
};

export default IPayW2WTransferSuccess;
