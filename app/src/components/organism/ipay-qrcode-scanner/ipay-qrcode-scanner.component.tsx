import images from '@app/assets/images';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import usePermissions from '@app/hooks/permissions.hook';
import useLoopingAnimation from '@app/hooks/use-looping-animation.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCodeScannerComponentStyles from './ipay-qrcode-scanner.style';

import { IPayImage, IPayView } from '@app/components/atoms';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { permissionTypes } from '@app/enums/permissions-types.enum';
import { goBack } from '@app/navigation/navigation-service.navigation';
import { scaleSize } from '@app/styles/mixins';
import { alertVariant } from '@app/utilities/enums.util';
import { ActivityIndicator, Animated } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IPayQRCodeScannerProps } from './ipay-qrcode-scanner.interface';

const IPayQRCodeScannerComponent: React.FC<IPayQRCodeScannerProps> = ({ testID, onRead }) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const { permissionStatus: _permissionStatus, checkPermission } = usePermissions(permissionTypes.CAMERA, true, true);

  const styles = QRCodeScannerComponentStyles(colors);
  const animatedStyle = useLoopingAnimation(1000, [0, -scaleSize(120)]);

  return (
    <IPayView testID={testID} style={styles.fill}>
      {_permissionStatus === permissionsStatus.UNKNOWN ? (
        <IPayView testID="qrcode-loader" style={[styles.fill, styles.loaderContainer]}>
          <ActivityIndicator size={'small'} color={colors.primary.primary500} />
        </IPayView>
      ) : _permissionStatus === permissionsStatus.GRANTED ? (
        <IPayView testID="qrcode-scanner" style={[styles.fill, styles.cameraContainerStyles]}>
          <QRCodeScanner
            onRead={({ data }) => onRead(data)}
            flashMode={RNCamera.Constants.FlashMode.off}
            showMarker={true}
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
      ) : (
        <IPayAlert
          secondaryAction={{
            text: localizationText.COMMON.GO_BACK,
            onPress: goBack,
          }}
          primaryAction={{
            text: localizationText.allow_access,
            onPress: checkPermission,
          }}
          variant={alertVariant.DESTRUCTIVE}
          title={localizationText.permission_denied}
          message={localizationText.enable_camera_permission}
        />
      )}
    </IPayView>
  );
};

export default IPayQRCodeScannerComponent;
