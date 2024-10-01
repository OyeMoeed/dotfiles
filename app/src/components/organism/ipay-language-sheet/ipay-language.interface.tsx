import { LanguageCode } from '@app/utilities';

export interface IPayLanguageSheetProps {
  testID?: string;
}

export interface SelectedChangedLanguageProps {
  language: string;
  isRTL: boolean;
  code: LanguageCode;
}
