import images from '@app/assets/images';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import usePermissions from '@app/hooks/permissions.hook';
import useLoopingAnimation from '@app/hooks/use-looping-animation.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { IPayImage, IPayView } from '@app/components/atoms';
import { PermissionsStatus, PermissionTypes } from '@app/enums';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { scaleSize } from '@app/styles/mixins';
import { alertVariant } from '@app/utilities/enums.util';
import { debounce } from 'lodash';
import { ActivityIndicator, Animated } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IPayQRCodeScannerProps } from './ipay-qrcode-scanner.interface';
import qrCodeScannerComponentStyles from './ipay-qrcode-scanner.style';

const IPayQRCodeScannerComponent: React.FC<IPayQRCodeScannerProps> = ({ testID, onRead }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const { permissionStatus: permissionStatusCheck, retryPermission } = usePermissions(PermissionTypes.CAMERA, true);

  const styles = qrCodeScannerComponentStyles();
  const animatedStyle = useLoopingAnimation(1000, [0, -scaleSize(120)]);

  const goBackQr = debounce(() => {
    goBack();
  }, 100);

  const renderComponent = () => {
    switch (permissionStatusCheck) {
      case PermissionsStatus.UNKNOWN:
        return (
          <IPayView testID="qrcode-loader" style={[styles.fill, styles.loaderContainer]}>
            <ActivityIndicator size="small" color={colors.primary.primary500} />
          </IPayView>
        );
      case PermissionsStatus.GRANTED:
        return (
          <IPayView testID="qrcode-scanner" style={[styles.fill, styles.cameraContainerStyles]}>
            <QRCodeScanner
              onRead={({ data }) => onRead(data)}
              flashMode={RNCamera.Constants.FlashMode.off}
              showMarker
              containerStyle={styles.fill}
              cameraStyle={styles.fullHeightWidth}
              customMarker={
                <IPayView style={styles.scannerMarkerContainer}>
                  <Animated.View style={[styles.markerAnimatedBar, animatedStyle]} />
                  <IPayImage style={styles.fullHeightWidth} image={images.scannerMarker} />
                </IPayView>
              }
            />
          </IPayView>
        );
      default:
        return (
          <IPayAlert
            secondaryAction={{
              text: localizationText.COMMON.GO_BACK,
              onPress: goBackQr,
            }}
            primaryAction={{
              text: localizationText.PERMISSIONS.ALLOW_ACCESS,
              onPress: retryPermission,
            }}
            variant={alertVariant.DESTRUCTIVE}
            title={'PERMISSIONS.PERMISSION_DENIED'}
            message={'PERMISSIONS.ENABLE_CAMERA_ACCESS'}
          />
        );
    }
  };

  return (
    <IPayView testID={testID} style={styles.fill}>
      {renderComponent()}
    </IPayView>
  );
};

export default IPayQRCodeScannerComponent;
