
import colors from '@app/styles/colors';
import { SCALE_8, SCALE_20, SCALE_28 } from '@app/styles/spacing';
import { StyleSheet, ViewStyle, TextStyle, FlexAlignType } from 'react-native';

interface IPayTabsStyles {
    selectedTab: ViewStyle;
    unSelectedTab: ViewStyle;
    selected: TextStyle;
    unselected: TextStyle;
    container: ViewStyle;
    scrollContainer: ViewStyle;
    tab: ViewStyle;
    flexTab: ViewStyle;
}

export const generateStyles = (variant: 'Natural' | 'Colored'): IPayTabsStyles => {
    const containerStyles = {
        container: variant === 'Natural' ? styles.containerNatural : styles.containerColored,
        scrollContainer: styles.scrollContainer,
        tab: styles.tab,
        flexTab: styles.flexTab,
    };

    const textColors = {
        selected: {
            color: variant === 'Natural' ? colors.natural.natural0 : colors.primary.primary500,
        } as TextStyle,
        unselected: {
            color: variant === 'Natural' ? colors.natural.natural500 : colors.natural.natural0,
        } as TextStyle,
    };

    const tabColors = {
        selectedTab: {
            backgroundColor: variant === 'Natural' ? colors.primary.primary500 : colors.natural.natural0,
        } as ViewStyle,
        unSelectedTab: {
            backgroundColor: variant === 'Natural' ? colors.natural.natural0 : colors.primaryOverlay,
        } as ViewStyle,
    };

    return StyleSheet.create({
        ...containerStyles,
        ...textColors,
        ...tabColors,
    });
};

const styles = {
    containerNatural: {
        backgroundColor: colors.natural.natural100,
    } as ViewStyle,
    containerColored: {
        backgroundColor: colors.primary.primary500,
    } as ViewStyle,
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start' as FlexAlignType,
        gap: SCALE_8,
        paddingHorizontal: SCALE_20,
        paddingVertical: SCALE_8,
    } as ViewStyle,
    tab: {
        height: SCALE_28,
        paddingHorizontal: 12,
        borderRadius: SCALE_8,
        justifyContent: 'center',
        alignItems: 'center' as FlexAlignType,
    } as ViewStyle,
    flexTab: {
        flex: 1,
    } as ViewStyle,
};

export default styles;
