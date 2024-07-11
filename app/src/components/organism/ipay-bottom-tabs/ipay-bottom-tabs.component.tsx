import { IPayCaption1Text, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { forwardRef } from 'react';
import { IPayBottomTabsProps } from './ipay-bottom-tabs-interface';
import bottomTabStyles from './ipay-bottom-tabs.style';

const IPayBottomTabs: React.FC = forwardRef<{}, IPayBottomTabsProps>(
  ({ testID, state, descriptors, navigation }, ref) => {
    const { colors } = useTheme();
    const styles = bottomTabStyles(colors);

    return (
      <IPayView testID={testID} style={[styles.container, styles.tabBar]}>
        {state.routes.map((route, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const IMAGE = options.tabBarIcon;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <IPayPressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonStyle}
            >
              <IMAGE
                isFocused={isFocused}
                color={isFocused ? colors.primary.primary500 : colors.natural.natural500}
                filled={true}
              />

              <IPayCaption1Text style={[styles.captionTextStyle, isFocused ? styles.focusedText : styles.blurText]}>
                {label}
              </IPayCaption1Text>
            </IPayPressable>
          );
        })}
      </IPayView>
    );
  },
);

export default IPayBottomTabs;
