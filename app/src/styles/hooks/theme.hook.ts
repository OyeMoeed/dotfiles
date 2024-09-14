import { useTypedSelector } from '@store/store';
import theme from '@styles/index';
import { ThemeType } from '../themes.styles';

/**
 * Custom hook for accessing theme-related data from Redux store.
 * @returns {} An object containing colors and icons based on the current theme.
 */
const useTheme = () => {
  /**
   * Selects the current theme from the Redux store.
   */
  const { appTheme } = useTypedSelector((state) => state.themeReducer);

  /**
   * Retrieves the current theme object from the theme index.
   */
  const currentTheme = theme.theme && (appTheme as ThemeType) && theme.theme[appTheme as ThemeType];

  /**
   * Returns colors and icons based on the current theme.
   */
  return {
    colors: currentTheme.colors,
  };
};

export default useTheme;
