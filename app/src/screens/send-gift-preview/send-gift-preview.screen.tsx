import images from '@app/assets/images';
import { Play } from '@app/assets/svgs';
import { IPayFootnoteText, IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayTextInput } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import TRANSFERTYPE from '@app/enums/wallet-transfer.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { typography } from '@app/styles/typography.styles';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { FC, useRef, useState } from 'react';
import sendGiftPreviewStyles from './send-gift-preview.style';

const SendGiftPreview: FC = ({ route }) => {
  const { occasion = '' } = { ...route?.params };
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
  };

  const onNext = () => {
    navigate(ScreenNames.WALLET_TRANSFER, {
      from: TRANSFERTYPE.SEND_GIFT,
      heading: localizationText.SEND_GIFT.SEND_GIFT,
      giftDetails: { message, occasion },
    });
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SEND_GIFT.SEND_GIFT} applyFlex />

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

      <IPayBottomSheet
        heading={localizationText.SEND_GIFT.PREVIEW_GIFT}
        ref={previewBottomSheetRef}
        customSnapPoint={['1%', '75%']}
        cancelBnt
        simpleBar
      >
        <IPayView style={styles.bottomSheetContainer}>
          <IPayView style={styles.previewContainer}>
            <IPayImage image={images.logo} style={styles.smallAlinmaLogo} />
            <IPayImage image={images.eidMubarak} style={styles.image} />

            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText style={styles.messageText} color={colors.primary.primary950} text={message} />
            </IPayScrollView>
            <IPayFootnoteText
              style={[styles.messagePreviewText]}
              text={`${localizationText.SEND_GIFT.FROM}: ${senderName}`}
              fontWeight={typography.FONT_WEIGHT_NORMAL}
              color={colors.primary.primary950}
            />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default SendGiftPreview;
