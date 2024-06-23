import { IPayIcon, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons';
import IPayToast from './ipay-toast.component';
import useToast from './ipay-toast.hook';
import styles from './ipay-toast.style';

const IPayToastContainer = () => {
  const { colors } = useTheme();
  const { visible, toastProps } = useToast();
  const dynamicStyles = styles({});

  return (
    <IPayView>
      {visible && (
        <IPayToast
          testID="error-message-toast"
          title={toastProps.title}
          isShowSubTitle={toastProps.isShowSubTitle !== undefined ? toastProps.isShowSubTitle : true}
          subTitle={toastProps.subTitle}
          borderColor={toastProps.borderColor || colors.error.red25}
          isShowLeftIcon={toastProps.isShowLeftIcon !== undefined ? toastProps.isShowLeftIcon : true}
          viewText={toastProps.viewText || ''}
          isShowRightIcon={toastProps.isShowRightIcon !== undefined ? toastProps.isShowRightIcon : true}
          rightIcon={
            toastProps.rightIcon || <IPayIcon icon={icons.crossIcon} size={18} color={colors.primary.primary500} />
          }
          leftIcon={toastProps.leftIcon || <IPayIcon icon={icons.warning} size={24} />}
          onPress={toastProps.onPress || (() => {})}
          containerStyle={toastProps.containerStyle || dynamicStyles.toast}
        />
      )}
    </IPayView>
  );
};

export default IPayToastContainer;
