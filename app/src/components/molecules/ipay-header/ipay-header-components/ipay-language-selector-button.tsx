// IPayLanguageSelectorButton.tsx
import icon from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import { LanguageState } from '@app/store/slices/language-sclice.interface';
import { showLanguageSheet } from '@app/store/slices/language-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import { LanguageCode } from '@app/utilities/enums.util';
import { getFlagComponent, getSelectedLanguage } from '@app/utilities/language.utils';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPayLanguageSelectorButtonProps } from '../ipay-header.interface';

const IPayLanguageSelectorButton: FC<IPayLanguageSelectorButtonProps> = ({ color, showFlag = true, textColor }) => {
  const dispatch = useDispatch();
  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const showActionSheet = () => {
    dispatch(showLanguageSheet());
  };

  const { colors } = useTheme();

  return (
    <IPayButton
      onPress={showActionSheet}
      btnType="link-button"
      btnText={getSelectedLanguage(selectedLanguage)}
      leftIcon={showFlag ? getFlagComponent(selectedLanguage) : <></>}
      textColor={textColor || colors.natural.natural1000}
      rightIcon={<IPayIcon icon={icon.arrow_down} color={color || colors.natural.natural1000} />}
    />
  );
};

export default IPayLanguageSelectorButton;
