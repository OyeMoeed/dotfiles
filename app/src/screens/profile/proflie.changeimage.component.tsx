import icons from '@app/assets/icons';
import { ProfileIcon } from '@app/assets/svgs';
import { IPayIcon } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayActionSheetProps } from '@app/components/organism/ipay-actionsheet/ipay-actionsheet-interface';
import IPayActionSheet from '@app/components/organism/ipay-actionsheet/ipay-actionsheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import React, { useCallback, useRef, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

interface UseChangeImageReturn {
  selectedImage: string | null;
  showActionSheet: () => void;
  IPayActionSheetComponent: React.JSX.Element;
  IPayAlertComponent: React.JSX.Element | null;
}

const useChangeImage = (): UseChangeImageReturn => {
  const actionSheetRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const localizationText = useLocalization();

  const showActionSheet = useCallback(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  }, []);

  const hideActionSheet = useCallback(() => {
    if (actionSheetRef.current) {
      actionSheetRef.current.hide();
    }
  }, []);

  const handleImagePicker = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        if (image.path) {
          setSelectedImage(image.path);
          hideActionSheet();
        }
      });
    }, 100);
  };

  const handleCameraPicker = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
      }).then((image) => {
        if (image.path) {
          setSelectedImage(image.path);
          hideActionSheet();
        }
      });
    }, 100);
  };

  const handleRemoveImg = useCallback(() => {
    setSelectedImage(null);
    setAlertVisible(false);
  }, []);

  const handleActionPress = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          handleCameraPicker();
          break;
        case 1:
          handleImagePicker();
          break;
        case 2:
          if (selectedImage) {
            hideActionSheet();
            setAlertVisible(true);
          } else {
            hideActionSheet();
          }
          break;
        case 3:
          hideActionSheet();
          break;
        default:
          break;
      }
    },
    [handleImagePicker, handleCameraPicker, selectedImage],
  );

  const actionSheetOptions: IPayActionSheetProps = {
    title: localizationText.PROFILE.CHANGE_PICTURE,
    showIcon: true,
    customImage: <ProfileIcon />,
    message: localizationText.PROFILE.SELECT_OPTION,
    options: selectedImage
      ? [
          localizationText.PROFILE.TAKE_PHOTO,
          localizationText.PROFILE.UPLOAD_PHOTO,
          localizationText.PROFILE.REMOVE,
          localizationText.COMMON.CANCEL,
        ]
      : [localizationText.PROFILE.TAKE_PHOTO, localizationText.PROFILE.UPLOAD_PHOTO, localizationText.COMMON.CANCEL],
    cancelButtonIndex: selectedImage ? 3 : 2,
    showCancel: true,
    destructiveButtonIndex: selectedImage ? 2 : undefined,
    onPress: handleActionPress,
  };

  const IPayActionSheetComponent = <IPayActionSheet ref={actionSheetRef} {...actionSheetOptions} />;

  const IPayAlertComponent = alertVisible && (
    <IPayAlert
      testID="removePhotoAlert"
      title={localizationText.PROFILE.REMOVE_PHOTO}
      message={localizationText.PROFILE.REMOVE_CONFIRM}
      icon={<IPayIcon icon={icons.TRASH} size={64} />}
      visible={alertVisible}
      variant={alertVariant.DESTRUCTIVE}
      closeOnTouchOutside
      animationType="fade"
      showIcon={false}
      onClose={() => {
        setAlertVisible(false);
      }}
      primaryAction={{
        text: localizationText.COMMON.CANCEL,
        onPress: () => {
          setAlertVisible(false);
        },
      }}
      secondaryAction={{
        text: localizationText.PROFILE.REMOVE,
        onPress: handleRemoveImg,
      }}
      type={alertType.SIDE_BY_SIDE}
    />
  );

  return {
    selectedImage,
    showActionSheet,
    IPayActionSheetComponent,
    IPayAlertComponent,
  };
};

export default useChangeImage;
