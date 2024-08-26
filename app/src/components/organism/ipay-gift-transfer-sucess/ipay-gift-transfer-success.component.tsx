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
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef } from 'react';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import { IGiftTransferSuccessProps, PayData } from './ipay-gift-transfer-success.interface';
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

  const { totalAmount: giftAmount, notes, name } = transferDetails.formData[0];

  const formattedTransfersDetails = transferDetails?.formData?.map((item) => {
    if (!item?.walletNumber) {
      return [
        {
          id: '1',
          label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
          value: item?.name,
          leftIcon: icons.user_square,
          color: colors.primary.primary900,
          isAlinma: false,
        },
        {
          id: '2',
          label: localizationText.TRANSFER_SUMMARY.AMOUNT,
          value: `${item.amount} ${localizationText.COMMON.SAR}`,
        },
        { id: '3', label: localizationText.TOP_UP.OCCASION, value: item.transferPurpose },
      ];
    }

    return [
      {
        id: '1',
        label: localizationText.TRANSFER_SUMMARY.TRANSFER_TO,
        value: item?.name,
        leftIcon: images.alinmaP,
        isAlinma: true,
      },
      {
        id: '2',
        label: localizationText.TRANSFER_SUMMARY.AMOUNT,
        value: `${item.amount} ${localizationText.COMMON.SAR}`,
      },
      { id: '3', label: localizationText.TOP_UP.OCCASION, value: item.transferPurpose },
    ];
  });

  const renderWallerPayItem = ({ item }: { item: PayData }) => {
    const { icon, detailsText, leftIcon, label, value, color, isAlinma } = item;

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

  const renderText = () => localizationText.TOP_UP.GIFT_SUCCESSFUL;

  const renderActionLabel = () => (
    <IPayView style={styles.giftText}>
      <IPayPressable style={styles.newTopup} onPress={() => navigate(ScreenNames.SEND_GIFT)}>
        <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
        <IPaySubHeadlineText text={localizationText.SEND_GIFT.SEND_ANOTHER} style={styles.newTopupText} regular />
      </IPayPressable>
      <IPayPressable style={styles.newTopup} onPress={onPreview}>
        <IPayIcon icon={icons.play} size={14} color={colors.primary.primary500} />
        <IPaySubHeadlineText text={localizationText.SEND_GIFT.PREVIEW} style={styles.newTopupText} regular />
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayView style={styles.container}>
      <IPayView style={styles.contentContainer}>
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
                <IPaySubHeadlineText
                  regular={false}
                  text={`${totalAmount} ${localizationText.COMMON.SAR}`}
                  style={styles.headlineText}
                />
              </IPayView>
              {formattedTransfersDetails.map((item, index) => {
                const { isAlinma } = item[0];
                const isFirstItem = index === 0;
                return (
                  <IPayView key={item[0].value} style={styles.walletBackground}>
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
                );
              })}
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
              onPress={() => navigate(ScreenNames.HOME)}
              textStyle={styles.btnStyle}
            />
          </IPayView>
        </IPayLinearGradientView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.SEND_GIFT.PREVIEW_GIFT}
        ref={previewBottomSheetRef}
        customSnapPoint={['1%', '70%']}
        enablePanDownToClose
        cancelBnt
      >
        <IPayView style={styles.bottomSheetContainer}>
          <IPayView style={styles.previewContainer}>
            <IPayImage image={images.logo} style={styles.logoStyles} />
            <IPayImage image={images.eidMubarak} style={styles.image} />
            <IPayView style={styles.amount}>
              <IPayTitle1Text text={giftAmount} regular={false} style={{ color: colors.backgrounds.orange }} />
              <IPayCaption1Text text={localizationText.COMMON.SAR} color={colors.backgrounds.orange} regular={false} />
            </IPayView>
            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText style={styles.messagePreviewText} text={notes} />
            </IPayScrollView>
            <IPayFootnoteText style={styles.messagePreviewText} text={`${localizationText.SEND_GIFT.FROM}: ${name}`} />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    </IPayView>
  );
};

export default IPayGiftTransferSuccess;
