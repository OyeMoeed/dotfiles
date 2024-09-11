import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayChip, IPayHeader, IPayNoResult, IPayOrdersCard } from '@app/components/molecules';
import { IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import allOrdersStyle from './all-orders.style';

const AllOrdersScreen: React.FC = () => {
  const { colors } = useTheme();
  const { allOrders, orderHistoryFilterDefaultValues } = useConstantData();
  const styles = allOrdersStyle(colors);
  const localizationText = useLocalization();
  const [filters, setFilters] = useState<Array<string>>([]);

  const filterRef = useRef<bottomSheetTypes>(null);

  const handleFiltersShow = () => {
    filterRef.current?.showFilters();
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
  };

  const handleSubmit = (data: SubmitEvent) => {
    let filtersArray: string[] = [];
    if (Object.keys(data)?.length) {
      const { dateFrom, dateTo } = data;
      const dateRange = `${dateFrom} - ${dateTo}`;
      filtersArray = [dateRange];
    }
    setFilters(filtersArray);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        title={'SHOP.TITLE'}
        applyFlex
        rightComponent={
          <IPayPressable onPress={handleFiltersShow}>
            <IPayIcon
              icon={filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      {!!filters.length && (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((text) => (
              <IPayChip
                key={text}
                containerStyle={styles.chipContainer}
                headingStyles={styles.chipHeading}
                textValue={text}
                icon={
                  <IPayPressable onPress={() => onPressClose(text)}>
                    <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={colors.secondary.secondary500} />
                  </IPayPressable>
                }
              />
            ))}
          </IPayScrollView>
        </IPayView>
      )}
      <IPayView style={styles.container}>
        {allOrders && allOrders.length > 0 ? (
          <IPayOrdersCard data={allOrders} />
        ) : (
          <IPayNoResult showEmptyBox message={'SHOP.NO_ORDER'} />
        )}
      </IPayView>

      <IPayFilterBottomSheet
        heading={'TRANSACTION_HISTORY.FILTER'}
        defaultValues={orderHistoryFilterDefaultValues}
        showDateFilter
        ref={filterRef}
        onSubmit={handleSubmit}
      />
    </IPaySafeAreaView>
  );
};

export default AllOrdersScreen;
