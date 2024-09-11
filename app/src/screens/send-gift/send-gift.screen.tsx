import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayIcon, IPayImage, IPaySubHeadlineText, IPayTitle1Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import sendGiftStyles from './send-gift.style';

const SendGiftScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftStyles(colors);

  const sendGiftNow = () => {
    navigate(ScreenNames.SEND_GIFT_LIST);
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={'SEND_GIFT.GIFTS'} applyFlex />
      <IPayView style={styles.sendGiftImage}>
        <IPayImage image={images.sendGift} />
      </IPayView>
      <IPayView style={styles.sendGiftDescription}>
        <IPayTitle1Text
          text={'SEND_GIFT.GIFT_ONE_OR_MORE_CONTACTS'}
          color={colors.primary.primary900}
          regular={false}
        />
        <IPaySubHeadlineText text={'SEND_GIFT.GIFT_DESCRIPTION'} regular />
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText={'SEND_GIFT.SEND_GIFT_NOW'}
          textStyle={styles.buttonText}
          hasRightIcon
          onPress={sendGiftNow}
          btnStyle={styles.sendButton}
          rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SendGiftScreen;
