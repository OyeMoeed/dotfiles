import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayTextInput } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { FC, useState } from 'react';
import sendGiftPreviewStyles from './send-gift-preview.style';

const SendGiftPreview: FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftPreviewStyles(colors);
  const MAX_LENGTH = 1000;
  const [message, setMessage] = useState<string>('');

  const onChangeText = (value: string) => {
    setMessage(value);
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
      </IPayView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          large
          btnText={localizationText.COMMON.NEXT}
          btnIconsDisabled
          btnStyle={styles.sendButton}
        />
        <IPayButton
          btnType={buttonVariants.LINK_BUTTON}
          small
          btnText={localizationText.SEND_GIFT.PREVIEW}
          leftIcon={<IPayIcon icon={icons.play} color={colors.primary.primary500} />}
          btnStyle={styles.sendButton}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SendGiftPreview;
