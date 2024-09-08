import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import React from 'react';

interface ActionSheetOptions {
  title: string;
  customImage: React.JSX.Element;
  showIcon: boolean;
  message: string;
  options: string[];
  cancelButtonIndex: number;
  showCancel: boolean;
  destructiveButtonIndex: number;
  onPress: () => void;
}

const useActionSheetOptions = (delinkSucessfully: (index?: number) => void): ActionSheetOptions => {
  const localizationText = useLocalization();

  return {
    title: localizationText.COMMON.DELINK_ALERT.WANT_DELINK,
    customImage: <IPayIcon icon={icons.delinked} size={48} />,
    showIcon: true,
    message: localizationText.COMMON.DELINK_ALERT.LOGIN_AGAIN,
    options: [localizationText.COMMON.CANCEL, localizationText.COMMON.DELINK_ALERT.DELINK],
    cancelButtonIndex: 0,
    showCancel: true,
    destructiveButtonIndex: 1,
    onPress: delinkSucessfully,
  };
};

export default useActionSheetOptions;
