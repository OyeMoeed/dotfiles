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
  setSelectedTab,
  selectedTab,
  customStyles,
}) => {
  const { colors } = useTheme();
  const styles = tabStyles(colors);

  const handleTabClick = (tab: string, index: number) => {
    setSelectedTab(tab);
    onSelect && onSelect(index);
  };

  return (
    <IPayView style={[styles.scrollContainer, customStyles as ViewStyle]}>
      {tabs.map((tab, index) => (
        <IPayPressable
          testID={`${testID}-${tab}-segmented-tab`}
          key={tab}
          onPress={() => handleTabClick(tab, index)}
          style={tab === selectedTab ? styles.selectedTab : styles.unSelectedTab}
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
