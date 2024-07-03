import React, { useEffect, useRef } from 'react';

import images from '@app/assets/images';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import QRCodeScanner from 'react-native-qrcode-scanner';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import QRCodeScannerComponentStyles from './ipay-qrcode-scanner.style';

import { goBack } from '@app/navigation/navigation-service.navigation';
import { RNCamera } from 'react-native-camera';
import { scaleSize } from '@app/styles/mixins';
import { alertVariant } from '@app/utilities/enums.util';
import { permissionTypes } from '@app/enums/permissions-types.enum';
import { permissionsStatus } from '@app/enums/permissions-status.enum';
import { IPayImage, IPayView } from '@app/components/atoms';
import { IPayQRCodeScannerProps } from './ipay-qrcode-scanner.interface';
import { ActivityIndicator, Animated, Easing } from 'react-native';

const IPayQRCodeScannerComponent: React.FC<IPayQRCodeScannerProps> = ({ testID, onRead }) => {
  const localizationText = useLocalization();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const { permissionStatus: _permissionStatus, checkPermission } = usePermissions(permissionTypes.CAMERA, true, true);

  const styles = QRCodeScannerComponentStyles(colors);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -scaleSize(120)],
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [animatedValue]);

  return (
    <IPayView testID={testID} style={styles.fill}>
      {_permissionStatus === permissionsStatus.UNKNOWN ? (
        <IPayView testID='qrcode-loader' style={[styles.fill, styles.loaderContainer]}>
          <ActivityIndicator size={'small'} color={colors.primary.primary500} />
        </IPayView>
      ) : _permissionStatus === permissionsStatus.GRANTED ? (
        <IPayView testID='qrcode-scanner' style={[styles.fill, styles.cameraContainerStyles]}>
          <QRCodeScanner
            onRead={({ data }) => onRead(data)}
            flashMode={RNCamera.Constants.FlashMode.off}
            showMarker={true}
            containerStyle={styles.fill}
            cameraStyle={styles.fullHeightWidth}
            customMarker={
              <IPayView style={styles.scannerMarkerContainer}>
                <Animated.View style={[styles.markerAnimatedBar, { transform: [{ translateY }] }]} />
                <IPayImage style={styles.fullHeightWidth} image={images.scannerMarker} />
              </IPayView>
            }
          />
        </IPayView>
      ) : (
        <IPayAlert
          secondaryAction={{
            text: localizationText.go_back,
            onPress: () => {
              goBack();
            },
          }}
          primaryAction={{
            text: localizationText.allow_access,
            onPress: () => {
              checkPermission();
            },
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
