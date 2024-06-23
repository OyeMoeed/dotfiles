import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';

interface ActionSheetOptions {
  title: string;
  customImage: JSX.Element;
  showIcon: boolean;
  message: string;
  options: string[];
  cancelButtonIndex: number;
  showCancel: boolean;
  destructiveButtonIndex: number;
  onPress: () => void;
}


const useActionSheetOptions = (delinkSucessfully: () => void): ActionSheetOptions => {
  const localizationText = useLocalization();

  return {
    title: localizationText.want_delink,
    customImage: <IPayIcon icon={icons.delinked} size={48}/>,
    showIcon: true,
    message: localizationText.login_again,
    options: [localizationText.cancel, localizationText.delink],
    cancelButtonIndex: 0,
    showCancel: true,
    destructiveButtonIndex: 1,
    onPress: delinkSucessfully,
  };
};

export default useActionSheetOptions;
