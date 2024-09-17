import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLottieAnimation,
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
import {
  ExecuteGiftMockProps,
  ExecuteGiftRes,
} from '@app/network/services/transfers/execute-gift/execute-gift.interface';
import executeGift from '@app/network/services/transfers/execute-gift/execute-gift.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText, dateTimeFormat } from '@app/utilities';
import { formatTimeAndDate } from '@app/utilities/date-helper.util';
import { ApiResponseStatusType, buttonVariants, GiftCardDetailsKey, ToastTypes } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import Share from 'react-native-share';
import { darkCards, giftsCardData } from '../send-gift-card/send-gift-card.constants';
import { GiftDetails, GiftsCardDataProps } from '../send-gift-card/send-gift-card.interface';
import { GiftDetailsProps, ItemProps } from './gift-details.interface';
import giftDetailsStyles from './gift-details.style';

const GiftDetailsScreen: React.FC<GiftDetailsProps> = ({ route }) => {
  const { isSend, details } = route.params;
  const { colors } = useTheme();
  const styles = giftDetailsStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [giftDetails, setGiftDetails] = useState<ExecuteGiftRes>({} as ExecuteGiftRes);

  const message = localizationText.SEND_GIFT.GIFT_CARD_MESSAGE;
  const senderName = localizationText.SEND_GIFT.GIFT_CARD_NAME;
  const trxReqType = 'COUT_GIFT';
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

  const executeReceivedGift = async () => {
    const payload = {
      trxReqType,
      trxId: details?.requestID ?? '',
      deviceInfo: await getDeviceInfo(),
    };
    try {
      const apiResponse: ExecuteGiftMockProps = await executeGift(walletNumber, payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setGiftDetails(apiResponse?.response);
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast({
            title: localizationText.ERROR.API_ERROR_RESPONSE,
            toastType: ToastTypes.WARNING,
            icon: <IPayIcon icon={icons.warning} size={24} />,
          });
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    if (!isSend && details?.status === GiftStatus.INITIATED) executeReceivedGift();
  }, [details]);

  const onPressCopy = (refNo: string) => {
    copyText(refNo);
    renderToast({ title: localizationText.TOP_UP.REF_NUMBER_COPIED, toastType: ToastTypes.INFORMATION });
  };

  const statusMapping = {
    [GiftStatus.INITIATED]: localizationText.SEND_GIFT.UNOPENED,
    [GiftStatus.EXECUTED]: localizationText.SEND_GIFT.OPENED,
    [GiftStatus.FAILED]: localizationText.SEND_GIFT.EXPIRED,
  };

  const getTitleColor = (subTitle: string) => {
    switch (subTitle) {
      case GiftStatus.INITIATED:
        return colors.warning.warning500;
      case GiftStatus.FAILED:
        return colors.error.error500;
      case GiftStatus.EXECUTED:
        return colors.success.success500;
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
    (value: string, key: string) => {
      const date = moment(value, dateTimeFormat.YearMonthDate, true);

      switch (key) {
        case GiftTransactionKey.TRANSACTION_DATE_TIME:
          if (date.isValid()) {
            return formatTimeAndDate(value);
          }
          break;
        case GiftTransactionKey.AMOUNT:
          return `${value} ${localizationText.COMMON.SAR}`;
        case GiftTransactionKey.STATUS:
          return statusMapping[value as keyof typeof statusMapping];
        default:
          break;
      }
      return key === GiftCardDetailsKey.AMOUNT ? `${value} ${localizationText.COMMON.SAR}` : value;
    },
    [details],
  );

  const getGiftCardAnimation = () => {
    if (details) {
      const cardId = details?.giftCategory;
      const category = cardId?.split('_')[0].toLowerCase();

      const getCardsList = giftsCardData[category as keyof GiftsCardDataProps];
      if (!getCardsList) return {} as GiftDetails;

      const allCards = getCardsList(colors);

      const matchedGiftCard = allCards.find((card) => card.id === cardId);

      return matchedGiftCard || ({} as GiftDetails);
    }
    return {} as GiftDetails;
  };

  const isDarkCard = darkCards.includes(getGiftCardAnimation()?.id);

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
    <IPayView
      style={[
        styles.previewContainer,
        !isSend && styles.receivePreviewContainer,
        { backgroundColor: getGiftCardAnimation()?.bgColor },
      ]}
    >
      <IPayLottieAnimation
        source={getGiftCardAnimation()?.path ?? ''}
        style={(styles.giftCardFrontImage, !isSend && styles.receivedGiftCardFrontImage)}
        loop
      />
    </IPayView>
  );

  const giftCardBack = () => (
    <IPayView
      style={[
        styles.previewContainer,
        !isSend && styles.receivePreviewContainer,
        { backgroundColor: getGiftCardAnimation()?.bgColor },
      ]}
    >
      <IPayImage
        image={isDarkCard ? images.textLogoLight : images.logo}
        style={[styles.logoStyles, !isSend && styles.receiveLogoStyles]}
      />
      <IPayLottieAnimation
        source={getGiftCardAnimation()?.path ?? ''}
        style={[styles.image, !isSend && styles.receiveImage]}
        loop
      />
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
          color={isDarkCard ? colors.backgrounds.orange : colors.primary.primary950}
        />
      </IPayView>
      <IPayFootnoteText
        color={isDarkCard ? colors.backgrounds.orange : colors.primary.primary950}
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
            text={titleText(details?.[item], item)}
            color={getTitleColor(details?.[item])}
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
                ?.filter((key) => GiftTransactionKeys?.includes(key))
                ?.sort((a, b) => GiftTransactionKeys.indexOf(a) - GiftTransactionKeys.indexOf(b))}
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
