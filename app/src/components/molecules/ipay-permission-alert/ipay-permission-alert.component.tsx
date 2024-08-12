import { IPayFootnoteText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import { isAndroidOS } from '@app/utilities/constants';

import IPayOverlay from '@app/components/atoms/ipay-overlay/ipay-overlay.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import { Linking, Modal } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { IPayPermissionAlertProps } from './ipay-permission-alert.interface';
import alertStyles from './ipay-permission-alert.styles';

const IPayPermissionAlert: FC<IPayPermissionAlertProps> = ({ onClose, visible, testID }) => {
  const { title, description } = useTypedSelector((state) => state.permissionAlertReducer);
  const localizationText = useLocalization();

  // Function to navigate to settings
  const onGoToSettings = () => {
    onClose();
    if (isAndroidOS) {
      openSettings();
    } else {
      Linking.openURL(`App-Prefs:Privacy&path=LOCATION`);
    }
  };
  const { colors } = useTheme();
  const styles = alertStyles(colors);
  return (
    <Modal
      testID={`${testID}-iapy-permission-alert`}
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <IPayView style={styles.container}>
        <IPayOverlay />
        <IPayView style={styles.alertBox}>
          <IPaySubHeadlineText style={styles.title}>{title}</IPaySubHeadlineText>
          <IPayFootnoteText style={styles.message}>{description}</IPayFootnoteText>
          <IPayView style={styles.rowStyles}>
            <IPayPressable style={styles.cancelBtn} onPress={onClose}>
              <IPaySubHeadlineText style={styles.textColor}>{localizationText.COMMON.CANCEL}</IPaySubHeadlineText>
            </IPayPressable>
            <IPayPressable style={styles.settignsBtn} onPress={onGoToSettings}>
              <IPaySubHeadlineText regular style={styles.textColor}>
                {localizationText.LOCATION.GO_TO_SETTINGS}
              </IPaySubHeadlineText>
            </IPayPressable>
          </IPayView>
        </IPayView>
      </IPayView>
    </Modal>
  );
};

export default IPayPermissionAlert;
