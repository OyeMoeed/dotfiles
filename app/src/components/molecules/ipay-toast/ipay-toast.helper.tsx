import { IPayIcon } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import React from 'react';
import IPayToast from './ipay-toast.component';
import { IPayToastContainerProps } from './ipay-toast.interface';
import styles from './ipay-toast.style';

const IPayToastContainer: React.FC<IPayToastContainerProps> = ({ visible, toastProps, hideToast }) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(colors);

  return (
    <>
      {visible && (
        <IPayToast
          testID="error-message-toast"
          title={toastProps.title}
          isShowSubTitle={toastProps.isShowSubTitle !== undefined ? toastProps.isShowSubTitle : true}
          subTitle={toastProps.subTitle}
          borderColor={toastProps.borderColor || colors.error.error25}
          isShowLeftIcon={toastProps.isShowLeftIcon !== undefined ? toastProps.isShowLeftIcon : true}
          viewText={toastProps.viewText || ''}
          isShowRightIcon={toastProps.isShowRightIcon !== undefined ? toastProps.isShowRightIcon : false}
          rightIcon={
            toastProps.rightIcon || <IPayIcon icon={icons.crossIcon} size={18} color={colors.primary.primary500} />
          }
          leftIcon={toastProps.leftIcon || <IPayIcon icon={icons.warning} size={24} />}
          onPress={toastProps.onPress || hideToast}
          containerStyle={toastProps.containerStyle || dynamicStyles.toast}
          isBottomSheet={toastProps.isBottomSheet}
          toastType={toastProps.toastType}
          titleStyle={toastProps.titleStyle}
        />
      )}
    </>
  );
};

export default IPayToastContainer;
