import { IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ViewStyle } from 'react-native';
import { IPayTabsProps } from './ipay-segmented-controls.interface';
import tabStyles from './ipay-segmented-controls.style';

const IPaySegmentedControls: React.FC<IPayTabsProps> = ({
  testID,
  tabs,
  onSelect,
  selectedTab,
  customStyles,
  selectedTabStyle,
  unselectedTabStyle,
}) => {
  const { colors } = useTheme();
  const styles = tabStyles(colors);

  const handleTabClick = (tab: string, index: number) => {
    onSelect?.(tab, index);
  };

  return (
    <IPayView style={[styles.scrollContainer, customStyles as ViewStyle]}>
      {tabs.map((tab, index) => (
        <IPayPressable
          testID={`${testID}-${tab}-segmented-tab`}
          key={`${testID}-${tab}-segmented-tab`}
          onPress={() => handleTabClick(tab, index)}
          style={
            tab === selectedTab ? [styles.selectedTab, selectedTabStyle] : [styles.unSelectedTab, unselectedTabStyle]
          }
        >
          <IPayFootnoteText
            style={[styles.tabBaseStyles, tab === selectedTab ? styles.selected : styles.unselected]}
            text={tab}
            regular={tab !== selectedTab}
          />
        </IPayPressable>
      ))}
    </IPayView>
  );
};

export default IPaySegmentedControls;
