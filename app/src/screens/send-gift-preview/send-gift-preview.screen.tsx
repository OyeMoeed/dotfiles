import images from '@app/assets/images';
import { Play } from '@app/assets/svgs';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayImage,
  IPayLottieAnimation,
  IPayScrollView,
  IPayTitle1Text,
  IPayView,
} from '@app/components/atoms';
import IPayKeyboardAwareScrollView from '@app/components/atoms/ipay-keyboard-aware-scroll-view/ipay-keyboard-aware-scroll-view.component';
import { IPayButton, IPayHeader, IPayTextInput } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { typography } from '@app/styles/typography.styles';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { darkCards } from '../send-gift-card/send-gift-card.constants';
import sendGiftPreviewStyles from './send-gift-preview.style';

const SendGiftPreview: FC = ({ route }) => {
  const { occasion = '', selectedCard } = { ...route?.params };
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftPreviewStyles(colors);
  const MAX_LENGTH = 1000;
  const AMOUNT = '100';
  const [message, setMessage] = useState<string>('');
  const previewBottomSheetRef = useRef<bottomSheetTypes>(null);
  const senderName = 'Adam';

  const onChangeText = (value: string) => {
    setMessage(value);
  };

  const onPreview = () => {
    previewBottomSheetRef.current?.present();
    Keyboard.dismiss();
  };

  const onNext = () => {
    navigate(ScreenNames.WALLET_TRANSFER, {
      from: TRANSFERTYPE.SEND_GIFT,
      heading: localizationText.SEND_GIFT.SEND_GIFT,
      showHistory: false,
      giftDetails: { message, occasion, selectedCard },
    });
  };

  // to change text color on basis of card theme.
  const isDarkCard = darkCards.includes(selectedCard?.id);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SEND_GIFT.SEND_GIFT} applyFlex />
      <IPayKeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <IPayView style={styles.inputContainer}>
          <IPayTextInput
            label={localizationText.SEND_GIFT.WRITE_MESSAGE}
            onChangeText={onChangeText}
            text={message}
            multiline
            maxLength={MAX_LENGTH}
            style={styles.input}
            containerStyle={styles.message}
            assistiveText={`${message.length}/${MAX_LENGTH}`}
            assistiveTextStyle={styles.assistiveText}
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              large
              disabled={!message.length}
              btnText={localizationText.COMMON.NEXT}
              btnIconsDisabled
              onPress={onNext}
              btnStyle={styles.sendButton}
            />
            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              small
              onPress={onPreview}
              btnText={localizationText.SEND_GIFT.PREVIEW}
              leftIcon={<Play style={styles.playIcon} color={colors.primary.primary500} />}
              btnStyle={styles.sendButton}
            />
          </IPayView>
        </IPayView>
      </IPayKeyboardAwareScrollView>
      <IPayBottomSheet
        heading={localizationText.SEND_GIFT.PREVIEW_GIFT}
        ref={previewBottomSheetRef}
        customSnapPoint={['1%', '75%']}
        cancelBnt
        simpleBar
      >
        <IPayView style={styles.bottomSheetContainer}>
          <IPayView style={[styles.previewContainer, { backgroundColor: selectedCard?.bgColor }]}>
            <IPayImage image={isDarkCard ? images.textLogoLight : images.logo} style={styles.smallAlinmaLogo} />
            <IPayLottieAnimation source={selectedCard?.path} style={styles.image} loop />
            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText
                style={styles.messageText}
                color={isDarkCard ? colors.natural.natural0 : colors.primary.primary950}
                text={message}
              />
            </IPayScrollView>
            <IPayFootnoteText
              style={styles.messagePreviewText}
              text={`${localizationText.SEND_GIFT.FROM}: ${senderName}`}
              fontWeight={typography.FONT_WEIGHT_NORMAL}
              color={isDarkCard ? colors.natural.natural0 : colors.primary.primary950}
            />
          </IPayView>
        </IPayView>

        <IPayBottomSheet
          heading={localizationText.SEND_GIFT.PREVIEW_GIFT}
          ref={previewBottomSheetRef}
          customSnapPoint={SNAP_POINTS.MID_LARGE}
          enablePanDownToClose
          cancelBnt
        >
          <IPayView style={styles.bottomSheetContainer}>
            <IPayView style={styles.previewContainer}>
              <IPayImage image={images.logo} style={styles.logoStyles} />
              <IPayImage image={images.eidMubarak} style={styles.image} />
              <IPayView style={styles.amount}>
                <IPayTitle1Text text={AMOUNT} regular={false} style={{ color: colors.backgrounds.orange }} />
                <IPayCaption1Text
                  text={localizationText.COMMON.SAR}
                  color={colors.backgrounds.orange}
                  regular={false}
                />
              </IPayView>
              <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
                <IPayFootnoteText style={styles.messagePreviewText} text={message} />
              </IPayScrollView>
              <IPayFootnoteText
                style={styles.messagePreviewText}
                text={`${localizationText.SEND_GIFT.FROM}: ${senderName}`}
              />
            </IPayView>
          </IPayView>
        </IPayBottomSheet>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendGiftPreview;
