import { appText } from '@app/localization/translations';
import { useTypedSelector } from '@store/store';

const useLocalization = () => {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);

  const lag = localizationFlag as keyof typeof appText;
  return appText[lag].translation;
};

export default useLocalization;
