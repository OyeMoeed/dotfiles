import { useTypedSelector } from '@store/store';
import { appText, LocalizationKeys, LocalizationText } from '@app/localization/translations.localization';

const useLocalization = (): LocalizationText => {
  const { selectedLanguage } = useTypedSelector((state) => state.languageReducer);
  const lang = selectedLanguage as LocalizationKeys;
  return appText[lang].translation; 
};

export default useLocalization;
