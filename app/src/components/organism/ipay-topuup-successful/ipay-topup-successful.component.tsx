import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import { MasterCard } from '@app/assets/svgs';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayGradientText, IPayHeader, IPayShareableImageView } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, dateTimeFormat } from '@app/utilities';
import { TopupStatus, buttonVariants, PayChannel } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import IpayTopupSuccessProps, { PayData } from './ipay-topup-successful.interface';
import { TopUpSuccessStyles } from './ipay-topup-successful.styles';
import useData from './use-data';

const IPayTopupSuccess: React.FC<IpayTopupSuccessProps> = ({
  completionStatus,
  topupChannel,
  summaryData,
  goBack,
  amount,
  requestPaidSummaryData,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const { getDetails, renderText } = useData();
  const styles = TopUpSuccessStyles(colors, topupChannel);

  const { showToast } = useToastContext();
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const renderToast = () => {
    showToast({
      title: topupChannel === PayChannel.ORDER ? localizationText.ORDER_SCREEN.COPY : localizationText.TOP_UP.COPIED,
      // subTitle: subTitle,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      containerStyle: topupChannel === PayChannel.ORDER ? styles.orderToast : styles.toastContainer,
    });
  };
  const [cardPayDetails] = useState<any>([
    {
      id: '1',
      label: localizationText.TOP_UP.TOPUP_TYPE,
      value: localizationText.TOP_UP.CARDS,
      icon: icons.cards,
      color: colors.primary.primary800,
    },
    {
      id: '3',
      label: localizationText.TOP_UP.REF_NUMBER,
      value: summaryData?.response?.transactionId,
      detailsText: summaryData?.response?.transactionId,
      icon: icons.copy,
      color: colors.primary.primary500,
    },
    {
      id: '4',
      label: localizationText.TOP_UP.TOPUP_DATE,
      value: formatDateAndTime(new Date(), dateTimeFormat.DateAndTime),
      icon: null,
    },
  ]);

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    renderToast();
  };

  const renderPayItem = ({ item }: { item: PayData }) => {
    const { icon, detailsText, leftIcon, label, value, color } = item;
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.listView}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <MasterCard style={styles.leftIconCard} />
                {/* <IPayImage image={images.master} style={styles.leftIconCard} /> */}
              </IPayView>
            )}
            <IPayFootnoteText color={colors.natural.natural900} text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
            {icon && (
              <IPayPressable
                style={styles.copyIcon}
                onPress={() => {
                  if (icon === icons.copy) {
                    handleClickOnCopy(3, detailsText);
                  }
                }}
              >
                <IPayIcon icon={item.icon} color={color} size={18} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  const renderWallerPayItem = ({ item }: { item: PayData }) => {
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
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.walletListBackground}>
          <IPayView style={styles.iconLabel}>
            {renderLeftIcon()}
            <IPayFootnoteText text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            <IPayFootnoteText text={value} style={styles.detailsText} />
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
    );
  };

  const renderNonAlinmaPayItem = ({ item, index }) => {
    const isFirstItem = index === 0;

    return (
      <IPayView key={item.id}>
        {isFirstItem && !PayChannel.REQUEST_ACCEPT && (
          <IPayView style={styles.chipContainer}>
            <IPayChip
              containerStyle={styles.chipColors}
              icon={<IPayIcon icon={icons.SHEILD} color={colors.secondary.secondary500} size={18} />}
              textValue={localizationText.TRANSFER_SUMMARY.CHIP_TITLE}
              headingStyles={styles.chipColors}
            />
          </IPayView>
        )}
        {renderWallerPayItem({ item })}
      </IPayView>
    );
  };

  const renderActionLabel = () => {
    switch (topupChannel) {
      case PayChannel.APPLE:
      case PayChannel.WALLET:
        return (
          <IPayPressable style={styles.newTopup} onPress={goBack}>
            <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
            <IPaySubHeadlineText
              text={
                topupChannel === PayChannel.APPLE
                  ? localizationText.TOP_UP.NEW_TOP_UP
                  : localizationText.TOP_UP.NEW_TRANSFER
              }
              style={styles.newTopupText}
              regular
            />
          </IPayPressable>
        );
      default:
        return null;
    }
  };

  const renderDetails = () => {
    const isWalletOrRequestAccept = topupChannel === PayChannel.WALLET || topupChannel === PayChannel.APPLE;

    return isWalletOrRequestAccept ? (
      <IPayView>
        <IPayFlatlist
          style={styles.detailesFlex}
          scrollEnabled={false}
          data={getDetails()}
          renderItem={renderPayItem}
        />
      </IPayView>
    ) : (
      <IPayView style={styles.walletBackground}>
        <IPayFlatlist
          style={styles.detailesFlex}
          scrollEnabled
          data={
            topupChannel === PayChannel.REQUEST_ACCEPT
              ? requestPaidSummaryData
              : topupChannel === PayChannel.CARD
                ? cardPayDetails
                : getDetails()
          }
          renderItem={renderNonAlinmaPayItem}
          showsVerticalScrollIndicator={false}
        />
      </IPayView>
    );
  };

  const renderMoney = () =>
    topupChannel === PayChannel.MONEY && (
      <IPayView>
        <IPayPressable style={styles.newTopup} onPress={goBack}>
          <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
          <IPaySubHeadlineText text={localizationText.TOP_UP.NEW_TRANSFER} style={styles.newTopupText} regular />
        </IPayPressable>
      </IPayView>
    );

  const renderRequest = () =>
    topupChannel === PayChannel.REQUEST && (
      <IPayView>
        <IPayPressable style={styles.newTopup} onPress={goBack}>
          <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
          <IPaySubHeadlineText
            text={localizationText.REQUEST_SUMMARY.NEW_REQUEST}
            style={styles.newTopupText}
            regular
          />
        </IPayPressable>
      </IPayView>
    );

  const renderFailed = () =>
    completionStatus === TopupStatus.FAILED && (
      <>
        <IPayView style={styles.failedVariant}>
          <IPayIcon icon={icons.danger12} size={80} />
          <IPayTitle2Text text={localizationText.TOP_UP.TOPUP_FAILED} style={styles.failedText} />
          <IPayFootnoteText text={localizationText.TOP_UP.REVIEW_CARD} style={styles.failedSubtitle} />
        </IPayView>
        <IPayView>
          <IPayButton
            btnType="primary"
            btnText={localizationText.TOP_UP.START_OVER}
            large
            onPress={goBack}
            btnStyle={styles.btnStyle}
            leftIcon={<IPayIcon icon={icons.ARROW_LEFT} size={20} color={colors.natural.natural0} />}
            hasLeftIcon
          />

          <IPayButton
            btnType="outline"
            btnText={localizationText.COMMON.HOME}
            textStyle={styles.text}
            hasLeftIcon
            leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.primary.primary500} />}
            onPress={() => navigate(screenNames.HOME)}
            btnStyle={styles.home}
          />
        </IPayView>
      </>
    );

  const renderCard = () =>
    topupChannel === PayChannel.CARD && (
      <IPayView style={[styles.cardButton, styles.actionButton]}>
        <IPayButton
          onPress={goBack}
          btnType={buttonVariants.LINK_BUTTON}
          btnText={localizationText.TOP_UP.NEW_TOP_UP}
          leftIcon={<IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />}
        />
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          btnText={localizationText.TOP_UP.SHARE}
          leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
        />
      </IPayView>
    );

  const renderRequestAccept = () =>
    (topupChannel === PayChannel.REQUEST_ACCEPT || topupChannel === PayChannel.REQUEST) && (
      <IPayView style={[styles.cardButton, styles.margins]}>
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          btnText={localizationText.TOP_UP.SHARE}
          leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
        />
      </IPayView>
    );

  const renderWalletAndGiftShare = () =>
    (topupChannel === PayChannel.WALLET || topupChannel === PayChannel.GIFT) && (
      <IPayView style={styles.shareBackground}>
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          btnText={localizationText.TOP_UP.SHARE}
          leftIcon={<IPayIcon icon={icons.share} size={14} color={colors.primary.primary500} />}
        />
      </IPayView>
    );

  return (
    <IPayView style={styles.parent}>
      <IPayView style={styles.container}>
        <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />

        <IPayLinearGradientView
          style={styles.innerLinearGradientView}
          gradientColors={[colors.backgrounds.successBackground, colors.backgrounds.successBackground]}
        >
          <IPayShareableImageView
            otherView={
              <>
                {renderCard()}
                {renderRequestAccept()}
                {renderWalletAndGiftShare()}
              </>
            }
          >
            {completionStatus === TopupStatus.SUCCESS && (
              <IPayView>
                <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
                <IPayView style={styles.linearGradientTextView}>
                  <IPayGradientText
                    text={
                      summaryData?.response.pmtResultCd === 'P' ? localizationText.TOP_UP.PENDING_PAYMENT : renderText()
                    }
                    gradientColors={gradientColors}
                    style={styles.gradientTextSvg}
                    fontSize={styles.linearGradientText.fontSize}
                    fontFamily={styles.linearGradientText.fontFamily}
                  />
                  <IPaySubHeadlineText
                    regular={false}
                    text={`${amount || summaryData?.response?.totalTransactionAmount} ${localizationText.COMMON.SAR}`}
                    style={styles.headlineText}
                  />
                </IPayView>
                {renderDetails()}
              </IPayView>
            )}
          </IPayShareableImageView>
          <>
            {completionStatus === TopupStatus.SUCCESS && (
              <IPayView>
                {renderActionLabel()}
                {topupChannel === PayChannel.GIFT && (
                  <IPayView style={styles.giftText}>
                    <IPayPressable style={styles.newTopup} onPress={goBack}>
                      <IPayIcon icon={icons.refresh_48} size={14} color={colors.primary.primary500} />
                      <IPaySubHeadlineText
                        text={localizationText.SEND_GIFT.SEND_ANOTHER}
                        style={styles.newTopupText}
                        regular
                      />
                    </IPayPressable>
                    <IPayPressable style={styles.newTopup}>
                      <IPayIcon icon={icons.play} size={14} color={colors.primary.primary500} />
                      <IPaySubHeadlineText
                        text={localizationText.SEND_GIFT.PREVIEW}
                        style={styles.newTopupText}
                        regular
                      />
                    </IPayPressable>
                  </IPayView>
                )}
                {renderMoney()}
                {renderRequest()}
                {topupChannel === PayChannel.ORDER && (
                  <IPayView style={styles.cardButton}>
                    <IPayPressable style={styles.newTopup} onPress={goBack}>
                      <IPayIcon icon={icons.ARROW_LEFT} size={14} color={colors.primary.primary500} />
                      <IPaySubHeadlineText
                        text={localizationText.ORDER_SCREEN.BACK}
                        style={styles.newTopupText}
                        regular
                      />
                    </IPayPressable>
                    <IPayPressable style={styles.newTopup} onPress={goBack}>
                      <IPaySubHeadlineText
                        text={localizationText.ORDER_SCREEN.VAT_INVOICE}
                        style={styles.newTopupText}
                        regular
                      />
                      <IPayView style={styles.exportIcon}>
                        <IPayIcon icon={icons.export_2} size={14} color={colors.primary.primary500} />
                      </IPayView>
                    </IPayPressable>
                  </IPayView>
                )}
                <IPayButton
                  large
                  btnType={buttonVariants.PRIMARY}
                  btnStyle={styles.btn}
                  btnText={localizationText.COMMON.HOME}
                  btnColor={colors.primary.primary500}
                  hasLeftIcon
                  leftIcon={<IPayIcon icon={icons.HOME_2} size={20} color={colors.natural.natural0} />}
                  onPress={() => navigate(screenNames.HOME)}
                  textStyle={styles.text}
                />
              </IPayView>
            )}

            {renderFailed()}
          </>
        </IPayLinearGradientView>
      </IPayView>
    </IPayView>
  );
};

export default IPayTopupSuccess;
