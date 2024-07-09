import { IPayText, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayNearestAtmLocations, IPayNearestAtmTabComponent } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { TabBase } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import nearestAtmStyles from './nearest-atm.style';

const NearestAtm: React.FC = () => {
  const { colors } = useTheme();
  const styles = nearestAtmStyles(colors);
  const localizationText = useLocalization();
  const nearestAtmTabs = ['List', 'Map'];
  const [childView, setChildView] = useState<string>('');

  const onSelectTab = (tab: string) => {
    setChildView(tab);
  };

  const nearestAtmFilters = ['All Types', 'Car', 'Branch', 'Lobby', 'Room'];

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.nearest_atm} />

      <IPayView style={styles.container}>
        <IPayTabs
          tabs={nearestAtmTabs}
          variant={TabBase.Natural}
          customStyles={styles.tabsView}
          scrollEnabled={false}
          onSelect={onSelectTab}
        />
      </IPayView>
      <IPayView style={childView === 'List' ? styles.fitlersTabListView : styles.filtersTabView}>
        <IPayNearestAtmTabComponent headingText={''} onPressDropdown={() => {}} nearestAtmFilters={nearestAtmFilters} />
      </IPayView>
      <IPayView style={styles.tabChildView}>
        {childView === 'List' ? <IPayText text="List View" /> : <IPayNearestAtmLocations />}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NearestAtm;
