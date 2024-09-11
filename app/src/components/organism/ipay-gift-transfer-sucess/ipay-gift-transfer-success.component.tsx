import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle1Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { darkCards } from '@app/screens/send-gift-card/send-gift-card.constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { typography } from '@app/styles/typography.styles';
import { copyText } from '@app/utilities';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef } from 'react';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import { IGiftTransferSuccessProps, WalletPaymentDetails } from './ipay-gift-transfer-success.interface';
import { GiftTransferSuccessStyles } from './ipay-gift-transfer-success.styles';

const IPayGiftTransferSuccess: React.FC<IGiftTransferSuccessProps> = ({ transferDetails, totalAmount }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = GiftTransferSuccessStyles(colors);
  const previewBottomSheetRef = useRef<bottomSheetTypes>(null);

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

  const onPreview = () => {
    previewBottomSheetRef.current?.present();
  };

  const onSendAnotherGift = () => navigate(ScreenNames.SEND_GIFT);
  const onHome = () => navigate(ScreenNames.HOME);

  const { totalAmount: giftAmount, notes, name } = transferDetails.formData[0];

  const formattedTransferDetails = transferDetails?.formData?.map((item) => {
    const commonDetails = [
      {
        id: '1',
        label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
        value: item?.name,
        leftIcon: item?.walletNumber ? images.alinmaP : icons.user_square,
        isAlinma: !!item?.walletNumber,
        color: item?.walletNumber ? undefined : colors.primary.primary900,
      },
      {
        id: '2',
        label: localizationText.TRANSFER_SUMMARY.AMOUNT,
        value: `${item.amount} ${localizationText.COMMON.SAR}`,
      },
      {
        id: '3',
        label: localizationText.TOP_UP.OCCASION,
        value: item.transferPurpose,
      },
    ];

    return commonDetails;
  });

  const renderWallerPaymentItem = ({ item }: { item: WalletPaymentDetails }) => {
    const { icon, detailsText, leftIcon, label, value, color, isAlinma } = item;

    const onPressCopyIcon = () => icon === icons.copy && handleClickOnCopy(3, detailsText);

    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                {isAlinma ? (
                  <IPayImage image={leftIcon} style={styles.imageStyle} />
                ) : (
                  <IPayIcon size={24} icon={leftIcon} color={colors.primary.primary800} />
                )}
              </IPayView>
            )}
            <IPayFootnoteText text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable style={styles.appleIcon} onPress={onPressCopyIcon}>
                <IPayIcon icon={icon} style={styles.appleIcon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderText = () => localizationText.TOP_UP.GIFT_SUCCESSFUL;

  const renderActionLabel = () => (
    <IPayView style={styles.giftText}>
      <IPayPressable style={styles.newTopup} onPress={onSendAnotherGift}>
        <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
        <IPaySubHeadlineText text={localizationText.SEND_GIFT.SEND_ANOTHER} style={styles.newTopupText} regular />
      </IPayPressable>
      <IPayPressable style={styles.newTopup} onPress={onPreview}>
        <IPayIcon icon={icons.play} size={14} color={colors.primary.primary500} />
        <IPaySubHeadlineText text={localizationText.SEND_GIFT.PREVIEW} style={styles.newTopupText} regular />
      </IPayPressable>
    </IPayView>
  );

  // to chnage text color on basis of card theme.
  const isDarkCard = darkCards.includes(transferDetails?.selectedCard?.id);

  const logoImage = isDarkCard ? images.textLogoLight : images.logo;

  const themeTextColor = isDarkCard ? colors.backgrounds.orange : colors.primary.primary950;

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.contentContainer}>
        <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
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
            <IPayScrollView style={styles.scrollViewStyle} scrollEnabled>
              {formattedTransferDetails.map((item, index) => {
                const { isAlinma, value } = item[0];
                const isFirstItem = index === 0;
                return (
                  <IPayView key={value} style={styles.walletBackground}>
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
                    <IPayShareableImageView
                      otherView={
                        <IPayButton
                          btnType="link-button"
                          btnText={localizationText.TOP_UP.SHARE}
                          leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
                        />
                      }
                    >
                      <IPayFlatlist
                        style={styles.detailesFlex}
                        scrollnabled
                        data={item}
                        renderItem={renderWallerPaymentItem}
                      />
                    </IPayShareableImageView>
                  </IPayView>
                );
              })}
            </IPayScrollView>
          </IPayView>

          <IPayView style={styles.btnBackground}>
            {renderActionLabel()}
            <IPayButton
              large
              btnType="primary"
              btnText={localizationText.COMMON.HOME}
              hasLeftIcon
              leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
              onPress={onHome}
              textStyle={styles.btnStyle}
            />
          </IPayView>
        </IPayLinearGradientView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.SEND_GIFT.PREVIEW_GIFT}
        ref={previewBottomSheetRef}
        customSnapPoint={SNAP_POINTS.MID_LARGE}
        enablePanDownToClose
        cancelBnt
        simpleBar
      >
        <IPayView style={styles.bottomSheetContainer}>
          <IPayView style={[styles.previewContainer, { backgroundColor: transferDetails?.selectedCard?.bgColor }]}>
            <IPayImage image={logoImage} style={styles.smallAlinmaLogo} />
            <IPayLottieAnimation source={transferDetails?.selectedCard?.path ?? ''} style={styles.image} loop />
            <IPayView style={styles.amount}>
              <IPayTitle1Text text={giftAmount} regular={false} style={{ color: colors.backgrounds.orange }} />
              <IPayCaption1Text text={localizationText.COMMON.SAR} color={colors.backgrounds.orange} regular={false} />
            </IPayView>
            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText color={themeTextColor} style={styles.messagePreviewText} text={notes} />
            </IPayScrollView>
            <IPayFootnoteText
              color={themeTextColor}
              style={styles.messagePreviewText}
              text={`${localizationText.SEND_GIFT.FROM}: ${name}`}
              fontWeight={typography.FONT_WEIGHT_NORMAL}
            />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    </IPayView>
  );
};

export default IPayGiftTransferSuccess;
