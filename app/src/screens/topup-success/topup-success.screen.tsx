import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayImage,
  IPayScrollView,
  IPayTitle1Text,
  IPayView,
} from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { payChannel } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { genratedStyles } from './topup-success.styles';

const TopUpSuccessScreen = () => {
  const route = useRoute();
  const { topupChannel, topupStatus } = route.params || { topupChannel: null, topupStatus: null };
  const AMOUNT = '100';
  const [message, setMessage] = useState<string>('');
  const { colors } = useTheme();
  const senderName = 'Adam';
  const localizationText = useLocalization();
  const previewBottomSheetRef = useRef<bottomSheetTypes>(null);
  const styles = genratedStyles(colors);
  const onPreview = () => {
    previewBottomSheetRef.current?.present();
  };
  const handleNavigation = (navigateTo: string) => {
    if (topupChannel === payChannel.WALLET) {
      navigate(screenNames.WALLET_TRANSFER);
    } else if (topupChannel === payChannel.GIFT) {
      navigate(screenNames.SEND_GIFT);
    } else {
      navigate(screenNames.TOP_UP, { variant: topupChannel });
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess
        completionStatus={topupStatus}
        topupChannel={topupChannel}
        goBack={handleNavigation}
        onPreview={onPreview}
      />
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
              <IPayCaption1Text text={localizationText.COMMON.SAR} color={colors.backgrounds.orange} regular={false} />
            </IPayView>
            <IPayScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.messagePreview}>
              <IPayFootnoteText style={styles.messagePreviewText} text={message} />
            </IPayScrollView>
            <IPayFootnoteText
              style={[styles.messagePreviewText]}
              text={`${localizationText.SEND_GIFT.FROM}: ${senderName}`}
            />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TopUpSuccessScreen;
