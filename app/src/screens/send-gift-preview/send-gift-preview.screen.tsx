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
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { typography } from '@app/styles/typography.styles';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { isIosOS } from '@app/utilities/constants';
import { useTranslation } from 'react-i18next';
import { darkCards } from '../send-gift-card/send-gift-card.constants';
import sendGiftPreviewStyles from './send-gift-preview.style';

const SendGiftPreview: FC = ({ route }) => {
  const { occasion = '', selectedCard } = { ...route?.params };
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = sendGiftPreviewStyles(colors);
  const MAX_LENGTH = 1000;
  const AMOUNT = '100';
  const [message, setMessage] = useState<string>('');
  const previewBottomSheetRef = useRef<bottomSheetTypes>(null);
  const firstName = useTypedSelector((state) => state.walletInfoReducer.walletInfo.firstName);

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
      heading: t('SEND_GIFT.SEND_GIFT'),
      showHistory: false,
      giftDetails: { message, occasion, selectedCard },
    });
  };

  // to change text color on basis of card theme.
  const isDarkCard = darkCards.includes(selectedCard?.id);

  const logoImage = isDarkCard ? images.textLogoLight : images.logo;

  const themeTextColor = isDarkCard ? colors.natural.natural0 : colors.primary.primary950;

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="SEND_GIFT.SEND_GIFT" applyFlex />
      <IPayKeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <IPayView style={styles.inputContainer}>
          <IPayTextInput
            label="SEND_GIFT.WRITE_MESSAGE"
            onChangeText={onChangeText}
            text={message}
            multiline
            maxLength={MAX_LENGTH}
            style={styles.input}
            returnKeyLabel="return"
            containerStyle={styles.message}
            assistiveText={`${message.length}/${MAX_LENGTH}`}
            assistiveTextStyle={styles.assistiveText}
          />
          <IPayView style={styles.buttonContainer}>
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              large
              disabled={!message.length}
              btnText="COMMON.NEXT"
              btnIconsDisabled
              onPress={onNext}
              btnStyle={styles.sendButton}
            />
            <IPayButton
              btnType={buttonVariants.LINK_BUTTON}
              small
              onPress={onPreview}
              btnText="SEND_GIFT.PREVIEW"
              leftIcon={<Play style={styles.playIcon} color={colors.primary.primary500} />}
              btnStyle={styles.sendButton}
            />
          </IPayView>
        </IPayView>
      </IPayKeyboardAwareScrollView>
      <IPayBottomSheet
        heading="SEND_GIFT.PREVIEW_GIFT_2"
        ref={previewBottomSheetRef}
        customSnapPoint={['1%', '75%']}
        cancelBnt
        simpleBar
      >
        <IPayView style={styles.bottomSheetContainer}>
          <IPayView style={[styles.previewContainer, { backgroundColor: selectedCard?.bgColor }]}>
            <IPayImage image={logoImage} style={styles.smallAlinmaLogo} />
            <IPayLottieAnimation source={selectedCard?.path} style={styles.image} loop />
            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText style={styles.messageText} color={themeTextColor} text={message} />
            </IPayScrollView>
            <IPayFootnoteText
              shouldTranslate={false}
              style={styles.messagePreviewText}
              text={`${t('SEND_GIFT.FROM')}: ${firstName}`}
              fontWeight={typography.FONT_WEIGHT_NORMAL}
              color={themeTextColor}
            />
          </IPayView>
        </IPayView>

        <IPayBottomSheet
          heading="SEND_GIFT.PREVIEW_GIFT"
          customSnapPoint={isIosOS ? SNAP_POINTS.MID_LARGE : SNAP_POINTS.X_SMALL}
          enablePanDownToClose
          cancelBnt
        >
          <IPayView style={styles.bottomSheetContainer}>
            <IPayView style={styles.previewContainer}>
              <IPayImage image={images.logo} style={styles.logoStyles} />
              <IPayImage image={images.eidMubarak} style={styles.image} />
              <IPayView style={styles.amount}>
                <IPayTitle1Text text={AMOUNT} regular={false} style={{ color: colors.backgrounds.orange }} />
                <IPayCaption1Text text="COMMON.SAR" color={colors.backgrounds.orange} regular={false} />
              </IPayView>
              <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
                <IPayFootnoteText style={styles.messagePreviewText} text={message} />
              </IPayScrollView>
              <IPayFootnoteText style={styles.messagePreviewText} text={`${t('SEND_GIFT.FROM')}: ${firstName}`} />
            </IPayView>
          </IPayView>
        </IPayBottomSheet>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendGiftPreview;
