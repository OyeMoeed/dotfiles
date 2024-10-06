import { IPayView } from '@app/components/atoms';
import { IPayDropdownComponent, IPayHeader } from '@app/components/molecules';
import { ListItem } from '@app/components/molecules/ipay-dropdown/ipay-dropdown.interface';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import {
  IPayAtmDetails,
  IPayBottomSheet,
  IPayNearestAtmFilterComponent,
  IPayNearestAtmLocations,
} from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { IGetCoreManagementLovPayload } from '@app/network/services/core/lov/get-lov.interface';
import { geCoreManagementLov } from '@app/network/services/core/lov/get-lov.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import useTheme from '@app/styles/hooks/theme.hook';
import { isTablet } from '@app/utilities/constants';
import { TabBase } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import IPayLocationPermissionSheet from '@app/components/organism/ipay-location-permission-sheet/ipay-location-permission-sheet.component';
import NearestAtmListComponent from './nearest-atm-list-component';
import { AtmDetailsProps } from './nearest-atm-list.interface';
import nearestAtmStyles from './nearest-atm.style';

const NearestAtmScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = nearestAtmStyles(colors);
  const { t } = useTranslation();
  const ALL_TYPES = t('ATM_WITHDRAWAL.ATM_FILTERS.ALL_TYPES');
  const LIST = t('ATM_WITHDRAWAL.LIST');
  const MAP = t('ATM_WITHDRAWAL.MAP');

  const nearestAtmTabs = [LIST, MAP];
  // const cities = constants.CITIES;
  const citiesFilterSheetRef = useRef<bottomSheetTypes>(null);
  const selectCitySheetRef = useRef<any>(null);
  const atmDetailsSheetRef = useRef<any>(null);

  const [nearestAtms, setNearestAtms] = useState<AtmDetailsProps[]>([]);
  const [cities, setCities] = useState<ListItem[]>([]);
  const [nearestAtmFilters, setNearestAtmFilters] = useState<{ id: string; title: string }[]>([]);

  const [childView, setChildView] = useState<string>(LIST);
  const [selectedTab, setSelectedTab] = useState<string>(ALL_TYPES);
  const [filteredData, setFilteredData] = useState<AtmDetailsProps[] | null>(null);
  const [selectedCity, setSelectedCity] = useState<ListItem>();
  const [atmDetails, setAtmDetials] = useState<AtmDetailsProps | null>(null);
  // const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>();
  const [searchText, setSearchText] = useState<string>('');

  const toRadians = (degree: number) => {
    // degrees to radians
    const rad: number = (degree * Math.PI) / 180;
    return rad;
  };

  const getDistance = useCallback(
    (latitude: number, longitude: number, currentLocation: { latitude: number; longitude: number }) => {
      if (currentLocation) {
        const R = 6372.8; // km
        const dlat = toRadians(currentLocation.latitude - latitude);
        const dlon = toRadians(currentLocation.longitude - longitude);
        const lat1 = toRadians(latitude);
        const lat2 = toRadians(currentLocation.latitude);
        const a =
          Math.sin(dlat / 2) * Math.sin(dlat / 2) +
          Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.asin(Math.sqrt(a));
        return (R * c).toFixed(2);
      }
      return 0;
    },
    [],
  );

  const sortNearestAtmByDistance = (atmList: AtmDetailsProps[]): AtmDetailsProps[] => {
    const sortedATM = atmList.sort((a, b) => {
      const keyA = +a.distance;
      const keyB = +b.distance;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    return sortedATM;
  };

  const getNearestATM = useCallback(
    async (currentLocation: { latitude: number; longitude: number }, filterKeys: { id: string; title: string }[]) => {
      const payload: IGetCoreManagementLovPayload = {
        lovType: '293',
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      };
      const apiResponse = await geCoreManagementLov(payload);
      if (apiResponse?.status.type === 'SUCCESS') {
        if (apiResponse?.response?.lovInfo) {
          const mappedData = apiResponse?.response?.lovInfo.map((item) => ({
            type: filterKeys.filter((tab) => tab.id === item.attribute6)[0]?.title,
            city: item.attribute2,
            title: `${item.recDesc} ${item.recTypeCode}`,
            address: item.recDesc,
            distance: getDistance(+item.attribute4, +item.attribute3, currentLocation).toString(),
            location: { latitude: +item.attribute4, longitude: +item.attribute3 } as GeoCoordinates,
          }));
          const sortedAtmByDistance = sortNearestAtmByDistance(mappedData);
          setNearestAtms(sortedAtmByDistance);
        }
      }
    },
    [getDistance],
  );

  const getFilterKeys = useCallback(
    async (currentLocation: { latitude: number; longitude: number }) => {
      const payload: IGetCoreManagementLovPayload = {
        lovType: '295',
        deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
      };
      const apiResponse = await geCoreManagementLov(payload);
      if (apiResponse?.status.type === 'SUCCESS') {
        if (apiResponse?.response?.lovInfo) {
          const mappedFilterKeys = apiResponse?.response?.lovInfo.map((item) => ({
            id: item.recTypeCode,
            title: item.recDesc,
          }));

          const filterKeys = [{ id: '#', title: ALL_TYPES }, ...mappedFilterKeys];

          setNearestAtmFilters(filterKeys);
          getNearestATM(currentLocation, filterKeys);
        }
      }
    },
    [ALL_TYPES, getNearestATM],
  );

  const getCities = async () => {
    const payload: IGetCoreManagementLovPayload = {
      lovType: '291',
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await geCoreManagementLov(payload);
    if (apiResponse) {
      if (apiResponse?.response?.lovInfo) {
        setCities(
          apiResponse?.response?.lovInfo.map((item) => ({
            id: item.recTypeCode,
            title: item.recDesc,
          })),
        );
      }
    }
  };

  useEffect(() => {
    setFilteredData(nearestAtms);
  }, [nearestAtms]);

  const onSelectTab = (tab: string) => {
    // setSelectedTab(ALL_TYPES);
    // setFilteredData(nearestAtms);
    setChildView(tab);
  };

  const onPressAtmCard = (atmData: AtmDetailsProps) => {
    setAtmDetials(atmData);
    atmDetailsSheetRef?.current?.present();
  };

  const onSelectFilterTab = (filterTab: string) => {
    if (selectedCity) {
      if (filterTab === ALL_TYPES) {
        const data = nearestAtms?.filter((item) => item?.city === selectedCity?.id);
        setFilteredData(data);
      } else {
        const data = nearestAtms?.filter((item) => item?.type === filterTab && item?.city === selectedCity.id);
        setFilteredData(data);
      }
    } else if (filterTab === ALL_TYPES) {
      setFilteredData(nearestAtms);
    } else {
      const data = nearestAtms.filter((item) => item.type === filterTab);
      setFilteredData(data);
    }
    setSelectedTab(filterTab);
  };

  const onSelectCity = (city: ListItem) => {
    if (selectedTab === ALL_TYPES) {
      const data = nearestAtms?.filter((item) => (city?.id ? item?.city === city?.id : true));
      setFilteredData(data);
    } else {
      const data = nearestAtms?.filter(
        (item) => item.type === selectedTab && (city?.id ? item?.city === city?.id : true),
      );
      setFilteredData(data);
    }
    setSelectedCity(city);
  };

  const onPressDropDown = () => {
    setSearchText('');
    citiesFilterSheetRef?.current?.present();
  };

  const onPressReset = () => {
    setSearchText('');
    selectCitySheetRef?.current?.resetSelectedListItem();
  };

  const onOpenGoogleMaps = (latitude: number, longitude: number) => {
    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}&amp;ll=`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });
    if (url) Linking.openURL(url).catch(() => {});
  };

  const onSaveFilter = () => {
    citiesFilterSheetRef?.current?.close();
  };

  const onLocationSelected = useCallback(
    async (value: GeoCoordinates) => {
      await getFilterKeys(value);
      await getCities();
    },
    [getFilterKeys],
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn titleStyle={styles.title} applyFlex title="ATM_WITHDRAWAL.NEAREST_ATM" />

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
        <IPayNearestAtmFilterComponent
          headingText="ATM_WITHDRAWAL.SELECT_CITY"
          onPressDropdown={onPressDropDown}
          nearestAtmFilters={nearestAtmFilters?.map((item) => item?.title)}
          onSelectTab={onSelectFilterTab}
          selectedTab={selectedTab}
          subHeadlinText={selectedCity?.title}
        />
      </IPayView>
      <IPayView style={styles.tabChildView}>
        {childView === LIST ? (
          <NearestAtmListComponent onPressAtmCard={onPressAtmCard} nearestAtms={filteredData} />
        ) : (
          <IPayNearestAtmLocations onPressAtmCard={onPressAtmCard} nearestAtms={filteredData} />
        )}
      </IPayView>

      <IPayBottomSheet
        heading="ATM_WITHDRAWAL.SELECT_CITY"
        customSnapPoint={['20%', '99%']}
        ref={citiesFilterSheetRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        doneBtn
        doneText="COMMON.RESET"
        onDone={onPressReset}
        closeBottomSheetOnDone={false}
      >
        <IPayDropdownComponent
          onSave={onSaveFilter}
          searchText={searchText}
          setSearchText={setSearchText}
          ref={selectCitySheetRef}
          list={cities}
          onSelectListItem={onSelectCity}
          selectedItem={selectedCity}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        noGradient
        heading="ATM_WITHDRAWAL.ATM_DETAILS"
        customSnapPoint={['20%', isTablet ? '70' : '73%']}
        ref={atmDetailsSheetRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
      >
        <IPayAtmDetails data={atmDetails as AtmDetailsProps} openGoogleMapsWeb={onOpenGoogleMaps} />
      </IPayBottomSheet>
      <IPayLocationPermissionSheet onLocationSelected={onLocationSelected} />
    </IPaySafeAreaView>
  );
};

export default NearestAtmScreen;
