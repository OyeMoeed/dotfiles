import { IPayIcon } from '@app/components/atoms';
import { IPayToast } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { showServiceCallErrorToast } from '@app/store/slices/alert-slice';
import { store, useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import icons from '@assets/icons';
import { FC, useEffect } from 'react';
import { IPayServiceErrorToastProps } from './ipay-service-error-toast.interface';
import IPayServiceErrorToastStyles from './ipay-service-error-toast.styles';

const IPayServiceErrorToast: FC<IPayServiceErrorToastProps> = ({ testID }) => {
  const localizationText = useLocalization();
  const styles = IPayServiceErrorToastStyles();
  const serviceCallError = useTypedSelector((state) => state.alertReducer.serviceCallError);
  const TOAST_DURATION = 4000;
  const hideErrorToast = async () => {
    store.dispatch(showServiceCallErrorToast(''));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (serviceCallError) store.dispatch(showServiceCallErrorToast(''));
    }, TOAST_DURATION);
    return () => clearTimeout(timeout);
  }, [serviceCallError]);

  return serviceCallError ? (
    <IPayToast
      testID={`error-toast-${testID}`}
      title={localizationText.ERROR[serviceCallError as keyof typeof localizationText.ERROR] || serviceCallError}
      isShowSubTitle
      isShowLeftIcon
      leftIcon={<IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />}
      onPress={hideErrorToast}
      containerStyle={styles.toast}
      titleStyle={styles.messageStyle}
    />
  ) : null;
};

export default IPayServiceErrorToast;
