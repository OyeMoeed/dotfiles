import icons from '@app/assets/icons';
import { ProfileIcon } from '@app/assets/svgs';
import { IPayIcon, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayActionSheetProps } from '@app/components/organism/ipay-actionsheet/ipay-actionsheet-interface';
import IPayActionSheet from '@app/components/organism/ipay-actionsheet/ipay-actionsheet.component';

import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant } from '@app/utilities/enums.util';
import React, { useCallback, useRef, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import { removeProfileImage } from '@app/network/services/core/update-wallet/update-wallet.service';
import { setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { useTranslation } from 'react-i18next';
import profileStyles from './profile.style';

interface UseChangeImageReturn {
  selectedImage: string | null;
  showActionSheet: () => void;
  IPayActionSheetComponent: React.JSX.Element;
  IPayAlertComponent: React.JSX.Element | null;
}

const useChangeImage = (): UseChangeImageReturn => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = profileStyles(colors);

  const actionSheetRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [, setIsLoading] = useState<boolean>(false);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const dispatch = useTypedDispatch();
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
        includeBase64: true,
        cropping: true,
      }).then((image: any) => {
        if (image?.data) {
          setSelectedImage(`data:image/jpeg;base64,${image?.data}`);
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
        includeBase64: true,
      }).then((image: any) => {
        if (image.data) {
          setSelectedImage(`data:image/jpeg;base64,${image?.data}`);
          hideActionSheet();
        }
      });
    }, 100);
  };

  const onRemoveProfileImage = async () => {
    setIsLoading(true);
    const apiResponse = await removeProfileImage(walletInfo.walletNumber);
    if (apiResponse?.status?.type === 'SUCCESS') {
      dispatch(setWalletInfo({ profileImage: '' }));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleRemoveImg = useCallback(() => {
    setSelectedImage(null);
    setAlertVisible(false);
    onRemoveProfileImage();
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
          if (selectedImage || walletInfo.profileImage) {
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

  const walletOptions = [t('PROFILE.TAKE_PHOTO'), t('PROFILE.UPLOAD_PHOTO'), t('PROFILE.REMOVE'), t('COMMON.CANCEL')];
  const actionSheetOptions: IPayActionSheetProps = {
    title: t('PROFILE.CHANGE_PICTURE'),
    showIcon: true,
    customImage: <ProfileIcon />,
    message: t('PROFILE.SELECT_OPTION'),
    options:
      selectedImage || walletInfo.profileImage
        ? walletOptions
        : [t('PROFILE.TAKE_PHOTO'), t('PROFILE.UPLOAD_PHOTO'), t('COMMON.CANCEL]')],
    cancelButtonIndex: selectedImage || walletInfo.profileImage ? 3 : 2,
    showCancel: true,
    destructiveButtonIndex: selectedImage || walletInfo.profileImage ? 2 : undefined,
    onPress: handleActionPress,
  };

  const IPayActionSheetComponent = (
    <IPayActionSheet bodyStyle={styles.actionSheetBody} ref={actionSheetRef} {...actionSheetOptions} />
  );

  const IPayAlertComponent = alertVisible ? (
    <IPayAlert
      testID="removePhotoAlert"
      title="PROFILE.REMOVE_PHOTO"
      message="PROFILE.REMOVE_CONFIRM"
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
        text: t('COMMON.CANCEL'),
        onPress: () => {
          setAlertVisible(false);
        },
      }}
      secondaryAction={{
        text: t('PROFILE.REMOVE'),
        onPress: handleRemoveImg,
      }}
      type={alertType.SIDE_BY_SIDE}
    />
  ) : (
    <IPayView />
  );

  return {
    selectedImage,
    showActionSheet,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IPayActionSheetComponent,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IPayAlertComponent,
  };
};

export default useChangeImage;
