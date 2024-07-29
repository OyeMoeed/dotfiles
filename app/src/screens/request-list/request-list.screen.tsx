import React, { useState, useRef } from 'react';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import SectionHeader from '@app/components/molecules/ipay-section-header/ipay-section-header.component';
import colors from '@app/styles/colors.const';
import IpayRequestCard from '@app/components/molecules/ipay-request-card/ipay-request-card.component';
import { pendingRequests, previousRequests } from './request-list.mock';
import styles from './request-list.styles';
import icons from '@app/assets/icons';
import { FiltersType } from '@app/utilities/enums.util';
import { IPayFilterBottomSheet } from '@app/components/organism';
import SelectedFilters from '@app/components/molecules/ipay-selected-filters-list/ipay-selected-filters-list.component';
import useConstantData from '@app/constants/use-constants';

const RequestList: React.FC = () => {
  const localization = useLocalization();
  const [filters, setFilters] = useState<string[]>([]);
  const filterSheetRef = useRef<any>(null);
  const constants = useConstantData();

  const openFilters = () => {
    filterSheetRef.current?.showFilters();
  };

  const handleFilterSubmit = (data: any) => {
    console.log('Filter Data:', data);
    setFilters(Object.values(data).filter((value) => value) as string[]);
  };

  const onRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  return (
    <IPaySafeAreaView style={styles.safeArea}>
      <IPayHeader
        title={localization.NOTIFICATION_CENTER.REQUESTS}
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={openFilters}>
            <IPayIcon
              icon={filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      {filters.length > 0 ? <SelectedFilters filters={filters} onRemoveFilter={onRemoveFilter} /> : <></>}

      <IPayScrollView contentContainerStyle={styles.scrollViewContent}>
        <>
          <IPayView style={styles.sectionContainer}>
            <SectionHeader
              leftTextColor={colors.warning.warning500}
              isLeftTextRegular={true}
              leftText={`${pendingRequests.length} Pending Requests`}
            />
            {pendingRequests.map((request, index) => (
              <IpayRequestCard
                key={index}
                isPending={request.isPending}
                description={request.description}
                dateTime={request.dateTime}
              />
            ))}
          </IPayView>
          <IPayView style={styles.sectionContainer}>
            <SectionHeader
              leftTextColor={colors.natural.natural500}
              isLeftTextRegular={true}
              leftText="Previous Requests"
            />
            {previousRequests.map((request, index) => (
              <IpayRequestCard
                key={index}
                isPending={request.isPending}
                status={request.status!}
                description={request.description}
                dateTime={request.dateTime}
              />
            ))}
          </IPayView>
        </>
      </IPayScrollView>
      <IPayFilterBottomSheet
        ref={filterSheetRef}
        onSubmit={handleFilterSubmit}
        testID="filterBottomSheet"
        showAmountFilter
        showDateFilter
        filters={constants.notificationRequestFilters}
        defaultValues={{
          [FiltersType.BENEFICIARY_NAME]: '',
          [FiltersType.STATUS]: '',
          [FiltersType.AMOUNT_FROM]: '',
          [FiltersType.AMOUNT_TO]: '',
          [FiltersType.DATE_FROM]: '',
          [FiltersType.DATE_TO]: '',
        }}
        heading="Filter Requests"
      />
    </IPaySafeAreaView>
  );
};

export default RequestList;
