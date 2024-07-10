import { IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayNearestAtmLocations, IPayNearestAtmTabComponent } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { TabBase } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import NearestAtmListComponent from './nearest-atm-list-component';
import { AtmDetailsProps } from './nearest-atm-list.interface';
import nearestAtmStyles from './nearest-atm.style';

const NearestAtm: React.FC = () => {
  const { colors } = useTheme();
  const styles = nearestAtmStyles(colors);
  const localizationText = useLocalization();
  const { NEAREST_ATM, LIST, MAP, SELECTED_CITY, ATM_FILTERS } = localizationText.ATM_WITHDRAWAL;
  const { ALL_TYPES, CAR, BRANCH, LOBBY, ROOM } = ATM_FILTERS;
  const nearestAtmTabs = [LIST, MAP];
  const nearestAtms = constants.NEAREST_ATMS;

  const [childView, setChildView] = useState<string>(LIST);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [filteredData, setFilteredData] = useState<AtmDetailsProps[] | null>(null);

  useEffect(() => {
    setFilteredData(nearestAtms);
  }, [nearestAtms]);

  const onSelectTab = (tab: string) => {
    setSelectedTab(ALL_TYPES);
    setFilteredData(nearestAtms);
    setChildView(tab);
  };

  const nearestAtmFilters = [ALL_TYPES, CAR, BRANCH, LOBBY, ROOM];

  const onPressAtmCard = () => {};

  const onSelectFilterTab = (filterTab: string) => {
    if (filterTab === ALL_TYPES) {
      setFilteredData(nearestAtms);
    } else {
      const data = nearestAtms.filter((item) => item.type === filterTab);
      setFilteredData(data);
    }
    setSelectedTab(filterTab);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={NEAREST_ATM} />

      <IPayView style={styles.container}>
        <IPayTabs
          tabs={nearestAtmTabs}
          variant={TabBase.Natural}
          customStyles={styles.tabsView}
          scrollEnabled={false}
          onSelect={onSelectTab}
        />
      </IPayView>
      <IPayView style={childView === LIST ? styles.fitlersTabListView : styles.filtersTabView}>
        <IPayNearestAtmTabComponent
          headingText={SELECTED_CITY}
          onPressDropdown={() => {}}
          nearestAtmFilters={nearestAtmFilters}
          onSelectTab={onSelectFilterTab}
          selectedTab={selectedTab}
        />
      </IPayView>
      <IPayView style={styles.tabChildView}>
        {childView === LIST ? (
          <NearestAtmListComponent onPressAtmCard={onPressAtmCard} nearestAtms={filteredData} />
        ) : (
          <IPayNearestAtmLocations nearestAtms={filteredData} />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NearestAtm;
