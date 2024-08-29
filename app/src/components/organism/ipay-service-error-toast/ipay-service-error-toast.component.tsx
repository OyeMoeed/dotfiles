import useLocalization from '@app/localization/hooks/localization.hook';
import { showServiceCallErrorToast } from '@app/store/slices/alert-slice';
import { store, useTypedSelector } from '@app/store/store';
import { FC } from 'react';
import { IPayIcon } from '@app/components/atoms';
import { IPayToast } from '@app/components/molecules';
import icons from '@assets/icons';
import { IPayServiceErrorToastProps } from './ipay-service-error-toast.interface';
import IPayServiceErrorToastStyles from './ipay-serice-error-toast.styles';

const IPayServiceErrorToast: FC<IPayServiceErrorToastProps> = ({ testID }) => {
  const localizationText = useLocalization();
  const styles = IPayServiceErrorToastStyles();
  const serviceCallError = useTypedSelector((state) => state.alertReducer.serviceCallError);
  const hideErrorToast = async () => {
    store.dispatch(showServiceCallErrorToast(''));
  };

  return serviceCallError ? (
    <IPayToast
      testID={`error-toast-${testID}`}
      title={localizationText.ERROR[serviceCallError as keyof typeof localizationText.ERROR] || serviceCallError}
      isShowSubTitle
      isShowLeftIcon
      leftIcon={<IPayIcon icon={icons.warning} size={24} />}
      onPress={hideErrorToast}
      containerStyle={styles.toast}
      titleStyle={styles.messageStyle}
    />
  ) : null;
};

export default IPayServiceErrorToast;
