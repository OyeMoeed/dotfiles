import { useTypedSelector } from '@store/store';
import { appText, LocalizationKeys, LocalizationText } from '@app/localization/translations.localization';

const useLocalization = (): LocalizationText => {
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const lang = localizationFlag as LocalizationKeys;
  return appText[lang].translation; 
};

export default useLocalization;
