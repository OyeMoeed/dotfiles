import { IPayCaption1Text, IPayPressable, IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import React, { forwardRef } from 'react';
import { IPayBottomTabsProps } from './ipay-bottom-tabs-interface';
import styles from './ipay-bottom-tabs.style';

const IPayBottomTabs: React.FC = forwardRef<{}, IPayBottomTabsProps>(
  ({ testID, state, descriptors, navigation }: any, ref) => (
    <IPayView testID={testID} style={[styles.container]}>
      {state?.routes?.map((route: any, index: any) => {
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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonStyle}
          >
            <>
              <IMAGE color={isFocused ? colors.primary.primary500 : colors.natural.natural500} />
              <IPayCaption1Text
                style={[
                  styles.captionTextStyle,
                  {
                    color: isFocused ? colors.primary.primary900 : colors.natural.natural500,
                    fontWeight: isFocused ? '700' : '400',
                  },
                ]}
              >
                {label}
              </IPayCaption1Text>
            </>
          </IPayPressable>
        );
      })}
    </IPayView>
  ),
);

export default IPayBottomTabs;
