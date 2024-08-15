import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { logoutProcess } from '@app/network/utilities/network-session-helper';
import { hideSessionTimeoutAlert } from '@app/store/slices/alert-slice';
import { store } from '@app/store/store';
import { alertVariant } from '@app/utilities/enums.util';
import { FC } from 'react';
import { IPaySessionTimeoutAlertProps } from './ipay-session-timeout-alert.interface';

const IPaySessionTimeoutAlert: FC<IPaySessionTimeoutAlertProps> = ({ visible, testID }) => {
  const localizationText = useLocalization();
  const onClose = async () => {
    const { auth } = store.getState();
    if (auth?.isAuthorized) {
      store.dispatch(hideSessionTimeoutAlert());
      await logoutProcess();
    }
  };
  return (
    <IPayAlert
      testID={testID}
      visible={visible}
      onClose={onClose}
      title={localizationText.COMMON.SESSION_TIMEOUT}
      message={localizationText.COMMON.INACTIVITY_DESC}
      closeOnTouchOutside
      variant={alertVariant.DESTRUCTIVE}
      primaryAction={{
        text: localizationText.COMMON.OK,
        onPress: onClose,
      }}
    />
  );
};

export default IPaySessionTimeoutAlert;
