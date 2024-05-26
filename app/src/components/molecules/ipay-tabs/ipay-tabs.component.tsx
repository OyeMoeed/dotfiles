import { RNFootnoteText, RNPressable, RNView } from '@app/components/atoms';
import { TabBase } from '@app/utilities/enums';
import React, { useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { IPayTabsProps } from './ipay-tabs.interface';
import { generateStyles } from './ipay-tabs.style';

const IPayTabs: React.FC<IPayTabsProps> = ({
  tabs,
  onSelect,
  scrollable = false,
  variant = TabBase.Natural,
  customStyles
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0]);
  const styles = generateStyles(variant); // Generate styles based on variant

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onSelect && onSelect();
  };

  const getTabStyle = (isSelected: boolean) => [
    styles.tab,
    isSelected ? styles.selectedTab : styles.unSelectedTab, //{ backgroundColor: colors.primary.primary500 } : { backgroundColor: colors.primaryOverlay },
    !scrollable && styles.flexTab
  ];

  return (
    <RNView style={[styles.container, customStyles as ViewStyle]}>
      <ScrollView
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => (
          <RNPressable key={tab} style={getTabStyle(tab === selectedTab)} onPress={() => handleTabClick(tab)}>
            <RNFootnoteText
              style={tab === selectedTab ? styles.selected : styles.unselected}
              text={tab}
              regular={tab === selectedTab ? false : true}
            />
          </RNPressable>
        ))}
      </ScrollView>
    </RNView>
  );
};

export default IPayTabs;
