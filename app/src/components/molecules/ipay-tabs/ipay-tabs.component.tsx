import { IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { tabBase } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { IPayTabsProps } from './ipay-tabs.interface';
import TabStyles from './ipay-tabs.style';

const IPayTabs: React.FC<IPayTabsProps> = ({
  testID,
  tabs,
  onSelect,
  scrollable = false,
  variant = tabBase.Natural,
  customStyles,
}) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0]);
  const { colors } = useTheme();
  const styles = TabStyles.generateStyles(variant, colors); // Generate styles based on variant

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onSelect && onSelect();
  };

  const getTabStyle = (isSelected: boolean) => [
    styles.tab,
    isSelected ? styles.selectedTab : styles.unSelectedTab, // { backgroundColor: colors.primary.primary500 } : { backgroundColor: colors.primaryOverlay },
    !scrollable && styles.flexTab,
    isSelected ? styles.selectedTab : styles.unSelectedTab, // { backgroundColor: colors.primary.primary500 } : { backgroundColor: colors.primaryOverlay },
    !scrollable && styles.flexTab,
  ];

  return (
    <IPayView style={[styles.container, customStyles as ViewStyle]}>
      <ScrollView
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {tabs.map((tab) => (
          <IPayPressable
            testID={`${testID}-${tab}-tab`}
            key={tab}
            style={getTabStyle(tab === selectedTab)}
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
