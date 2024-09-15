import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle1Text,
  IPayView,
} from '@app/components/atoms';
import { FlipCard, IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { GiftLocalizationKeys, GiftStatus, GiftTransactionKey } from '@app/enums/gift-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, dateTimeFormat } from '@app/utilities';
import { formatTimeAndDate } from '@app/utilities/date-helper.util';
import { buttonVariants, GiftCardDetailsKey, GiftCardStatus, ToastTypes } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import Share from 'react-native-share';
import { ItemProps } from './gift-details.interface';
import giftDetailsStyles from './gift-details.style';

const GiftDetailsScreen: React.FC = ({ route }) => {
  const { details, isSend } = route.params;
  const { colors } = useTheme();
  const styles = giftDetailsStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const message = localizationText.SEND_GIFT.GIFT_CARD_MESSAGE;
  const senderName = localizationText.SEND_GIFT.GIFT_CARD_NAME;
  const GiftTransactionKeys = [
    GiftTransactionKey.STATUS,
    GiftTransactionKey.RECEIVER_NAME,
    GiftTransactionKey.RECEIVER_MOBILE,
    GiftTransactionKey.AMOUNT,
    GiftTransactionKey.TRANSACTION_DATE_TIME,
  ];

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
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: ToastTypes.INFORMATION });
  };

  const getTitleColor = (subTitle: string) => {
    switch (subTitle) {
      case GiftStatus.INITIATED:
        return colors.warning.warning500;
      case GiftStatus.FAILED:
        return colors.error.error500;
      default:
        return colors.primary.primary800;
    }
  };

  /// TODO:  It's temporary formate
  const onPressShare = () => {
    const shareOptions = {
      subject: localizationText.SEND_GIFT.GIFT_DETAILS,
      title: senderName,
      message,
      url: 'AlinmaPay',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999',
      filename: 'test',
    };
    Share.open(shareOptions);
  };

  const getDynamicStyles = (stylesValue, dataDetails, item) => [
    stylesValue.subTitle,
    dataDetails[item]?.length > 20 && stylesValue.condtionalWidthSubtitle,
    item === GiftCardDetailsKey.AMOUNT && dataDetails?.status === GiftStatus.FAILED && stylesValue.textStyle,
    item === GiftCardDetailsKey.AMOUNT && stylesValue.currencyStyle,
  ];

  const titleText = useCallback(
    (value: string, item: string) => {
      const date = moment(value, dateTimeFormat.YearMonthDate, true);
      if (date.isValid()) {
        return formatTimeAndDate(value);
      }
      if (item === GiftCardDetailsKey.STATUS) {
        if (value === GiftStatus.INITIATED) return GiftCardStatus.UNOPENED;
        if (value === GiftStatus.FAILED) return GiftCardStatus.EXPIRED;
        if (value === GiftStatus.EXECUTED) return GiftCardStatus.OPENED;
      }
      return item === GiftCardDetailsKey.AMOUNT ? `${value} ${localizationText.COMMON.SAR}` : value;
    },
    [details],
  );

  const customRightComponent = () => (
    <IPayButton
      btnType={buttonVariants.LINK_BUTTON}
      small
      onPress={onPressShare}
      btnText={localizationText.TOP_UP.SHARE}
      leftIcon={<IPayIcon icon={icons.share} size={20} color={colors.primary.primary500} />}
    />
  );
  const giftCardFront = () => (
    <IPayView style={[styles.previewContainer, !isSend && styles.receivePreviewContainer]}>
      <IPayImage
        image={images.eidMubarak}
        style={[styles.giftCardFrontImage, !isSend && styles.receivedGiftCardFrontImage]}
      />
    </IPayView>
  );

  const giftCardBack = () => (
    <IPayView style={[styles.previewContainer, !isSend && styles.receivePreviewContainer]}>
      <IPayImage image={images.logo} style={[styles.logoStyles, !isSend && styles.receiveLogoStyles]} />
      <IPayImage image={images.eidMubarak2} style={[styles.image, !isSend && styles.receiveImage]} />
      <IPayView style={styles.amount}>
        <IPayTitle1Text
          style={styles.receiveAmountStyle}
          text={details?.amount}
          regular={false}
          color={colors.warning.warning600}
        />
        <IPayCaption1Text
          style={styles.receiveCurrencyStyle}
          text={localizationText.COMMON.SAR}
          color={colors.warning.warning600}
          regular={false}
        />
      </IPayView>
      <IPayView style={styles.messagePreview}>
        <IPayFootnoteText
          style={[styles.messagePreviewText, !isSend && styles.receiveMessageText]}
          text={details?.userNotes}
        />
      </IPayView>
      <IPayFootnoteText
        style={[styles.messagePreviewText, !isSend && styles.receiveNameText]}
        text={`${localizationText.SEND_GIFT.FROM}: ${details?.senderName}`}
      />
    </IPayView>
  );

  const renderCardDetails = ({ item }: ItemProps) => (
    <IPayView style={styles.dataCardView}>
      <IPayFootnoteText
        regular
        text={localizationText.SEND_GIFT[GiftLocalizationKeys[item]]}
        color={colors.natural.natural900}
      />
      <IPayView style={styles.transactionDetailsView}>
        <IPayView style={styles.detailsView}>
          <IPaySubHeadlineText
            regular
            text={titleText(details[item], item)}
            color={getTitleColor(details[item])}
            numberOfLines={1}
            style={getDynamicStyles(styles, details, item)}
          />
          {item === GiftCardDetailsKey.REF_NUMBER && (
            <IPayPressable style={styles.icon} onPress={() => onPressCopy(details[item])}>
              <IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />
            </IPayPressable>
          )}
        </IPayView>
      </IPayView>
    </IPayView>
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.SEND_GIFT.GIFT_DETAILS}
        customRightComponent={customRightComponent()}
      />
      <IPayView style={[styles.container, !isSend && styles.receiveContainer]}>
        <IPayView style={styles.giftCardView}>
          <FlipCard
            style={[styles.cardView, !isSend && styles.receiveCardView]}
            frontViewComponent={giftCardFront()}
            backViewComponent={giftCardBack()}
            returnFilpedIndex={setSelectedIndex}
            isExpired={details?.status === GiftStatus.FAILED && isSend}
          />
          <IPayView style={styles.swipeBtnView}>
            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              small
              btnText={localizationText.SEND_GIFT.SWIPE_TO_FLIP}
              textColor={colors.natural.natural500}
              rightIcon={<IPayIcon icon={icons.repeat} size={14} color={colors.natural.natural500} />}
            />
            <IPayView style={styles.indicatorParentView}>
              <IPayView style={[styles.indicator, selectedIndex === 0 && styles.selectedIndexIndicator]} />
              <IPayView style={[styles.indicator2, selectedIndex === 1 && styles.selectedIndexIndicator]} />
            </IPayView>
          </IPayView>
        </IPayView>

        {isSend ? (
          <IPayView style={styles.bottomView}>
            <IPayFlatlist
              data={Object.keys(details)
                .filter((key) => GiftTransactionKeys.includes(key))
                .sort((a, b) => GiftTransactionKeys.indexOf(a) - GiftTransactionKeys.indexOf(b))}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={renderCardDetails}
              itemSeparatorStyle={styles.itemSeparatorStyle}
            />
          </IPayView>
        ) : (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnIconsDisabled
            large
            btnText={localizationText.SEND_GIFT.SAY_THANKS}
            textColor={colors.natural.natural0}
          />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default GiftDetailsScreen;
