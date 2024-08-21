import { IPayFootnoteText, IPayImage, IPayPressable, IPayView } from '@app/components/atoms';
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
  tabsIcon,
  imageStyle,
  tabStyles,
}) => {
  const tabsData = tabsIcon || tabs;
  const defaultTab = typeof tabsData?.[0] !== 'string' ? tabsData?.[0]?.text : tabsData?.[0];
  const [selectedTab, setSelectedTab] = useState<string | undefined>(defaultTab);
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
    isSelected ? styles.selectedTab : [styles.unSelectedTab,unSelectedTabStyle],
    !scrollable && styles.flexTab,
    isSelected ? styles.selectedTab : [styles.unSelectedTab,unSelectedTabStyle],
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
        {tabsData?.map((tab, index) => {
          const tabText = typeof tab !== 'string' ? tab?.text : tab;
          const tabImage = typeof tab !== 'string' && tab?.image;
          return (
            <IPayPressable
              testID={`${testID}-${tabText}-tab`}
              key={`${index + 1}`}
              style={[getTabStyle(tabText === selectedTab), tabImage ? styles.listWrapper : {}, tabStyles]}
              onPress={() => handleTabClick(tabText)}
            >
              {tabImage ? <IPayImage image={tab?.image} style={[styles.imageStyle, imageStyle]} /> : <IPayView />}
              <IPayFootnoteText
                style={tabText === selectedTab ? styles.selected : styles.unselected}
                text={tabText}
                regular={tabText !== selectedTab}
              />
            </IPayPressable>
          );
        })}
      </ScrollView>
    </IPayView>
  );
};

export default IPayTabs;
