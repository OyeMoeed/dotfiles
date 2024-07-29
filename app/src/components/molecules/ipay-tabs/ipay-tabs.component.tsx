import { IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { TabBase } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { IPayTabsProps } from './ipay-tabs.interface';
import { generateStyles } from './ipay-tabs.style';

const IPayTabs: React.FC<IPayTabsProps> = ({
  testID,
  tabs,
  onSelect,
  scrollable = false,
  variant = TabBase.Natural,
  customStyles,
  scrollEnabled,
  preSelectedTab,
  unSelectedTabStyle,
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0]);
  const { colors } = useTheme();
  const styles = generateStyles(variant, colors); // Generate styles based on variant

  useEffect(() => {
    if (preSelectedTab) setSelectedTab(preSelectedTab);
  }, [preSelectedTab]);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (onSelect) onSelect(tab);
  };

  const getTabStyle = (isSelected: boolean) => [
    styles.tab,
    isSelected ? styles.selectedTab : styles.unSelectedTab,
    !scrollable && styles.flexTab,
    isSelected ? styles.selectedTab : styles.unSelectedTab,
    !scrollable && styles.flexTab,
  ];

  return (
    <IPayView style={[styles.container, customStyles as ViewStyle]}>
      <ScrollView
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={scrollEnabled}
      >
        {tabs.map((tab) => (
          <IPayPressable
            testID={`${testID}-${tab}-tab`}
            key={tab}
            style={[getTabStyle(tab === selectedTab), tab !== selectedTab && unSelectedTabStyle]}
            onPress={() => handleTabClick(tab)}
          >
            <IPayFootnoteText
              style={tab === selectedTab ? styles.selected : styles.unselected}
              text={tab}
              regular={tab !== selectedTab}
            />
          </IPayPressable>
        ))}
      </ScrollView>
    </IPayView>
  );
};

export default IPayTabs;
