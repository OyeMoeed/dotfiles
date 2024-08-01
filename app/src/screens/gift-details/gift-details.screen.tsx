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
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { formatTimeAndDate } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { GiftCardStatus, buttonVariants, toastTypes } from '@app/utilities/enums.util';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import Share from 'react-native-share';
import { ItemProps } from './gift-details.interface';
import giftDetailsStyles from './gift-details.style';

const GiftDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = giftDetailsStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const cardDetails = constants.GIFT_CARD_DETAILS;
  const giftAmount = '400';
  const message = localizationText.SEND_GIFT.GIFT_CARD_MESSAGE;
  const senderName = localizationText.SEND_GIFT.GIFT_CARD_NAME;

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

  const getTitleColor = (subTitle: string) => {
    switch (subTitle) {
      case GiftCardStatus.UNOPENED:
        return colors.warning.warning500;
      case GiftCardStatus.EXPIRED:
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

  const titleText = useCallback(
    (value: string) => {
      const date = moment(value, dateTimeFormat.YearMonthDate, true);
      if (date.isValid()) {
        return formatTimeAndDate(value);
      }
      return value;
    },
    [cardDetails],
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
    <IPayView style={styles.previewContainer}>
      <IPayImage image={images.eidMubarak} style={styles.giftCardFrontImage} />
    </IPayView>
  );

  const giftCardBack = () => (
    <IPayView style={styles.previewContainer}>
      <IPayImage image={images.logo} style={styles.logoStyles} />
      <IPayImage image={images.eidMubarak} style={styles.image} />
      <IPayView style={styles.amount}>
        <IPayTitle1Text text={giftAmount} regular={false} color={colors.warning.warning600} />
        <IPayCaption1Text text={localizationText.COMMON.SAR} color={colors.warning.warning600} regular={false} />
      </IPayView>
      <IPayView style={styles.messagePreview}>
        <IPayFootnoteText style={styles.messagePreviewText} text={message} />
      </IPayView>
      <IPayFootnoteText style={styles.messagePreviewText} text={`${localizationText.SEND_GIFT.FROM}: ${senderName}`} />
    </IPayView>
  );

  const renderCardDetails = ({ item }: ItemProps) => {
    const { title, subTitle, icon } = item;
    return (
      <IPayView style={styles.dataCardView}>
        <IPayFootnoteText regular text={title} color={colors.natural.natural900} />
        <IPayView style={styles.transactionDetailsView}>
          <IPayView style={styles.detailsView}>
            <IPaySubHeadlineText
              regular
              text={titleText(subTitle)}
              color={getTitleColor(subTitle)}
              numberOfLines={1}
              style={[styles.subTitle, subTitle.length > 20 && styles.condtionalWidthSubtitle]}
            />
            {icon && (
              <IPayPressable style={styles.icon} onPress={() => onPressCopy(subTitle)}>
                <IPayIcon icon={icon} size={18} color={colors.primary.primary500} />
              </IPayPressable>
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.SEND_GIFT.GIFT_DETAILS}
        customRightComponent={customRightComponent()}
      />
      <IPayView style={styles.container}>
        <IPayView style={styles.giftCardView}>
          <FlipCard
            style={StyleSheet.flatten(styles.cardView)}
            frontViewComponent={giftCardFront()}
            backViewComponent={giftCardBack()}
            returnFilpedIndex={setSelectedIndex}
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

        <IPayView style={styles.bottomView}>
          <IPayFlatlist
            data={cardDetails}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderCardDetails}
            itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
          />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default GiftDetailsScreen;
