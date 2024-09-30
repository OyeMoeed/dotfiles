import React, { useEffect, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

const MusanedHistoryScreen: React.FC = () => {
  const { colors } = useTheme();
  const [, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const filterRef = useRef<bottomSheetTypes>(null);

  const { internationalTransferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const resetData = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      resetData();
    });
  }, []);

  const onPressFilters = () => {
    filterRef.current?.showFilters();
  };

  const onPressApplyFilters = () => {};

  const onClearFilters = () => {
    setFilters([]);
  };

  const handleCallbackForFilters = () => {};

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="transaction-header"
        backBtn
        title="COMMON.TRANSACTION_HISTORY"
        applyFlex
        rightComponent={
          <IPayPressable onPress={onPressFilters}>
            <IPayIcon
              icon={icons.filter}
              size={20}
              color={filters.length > 0 ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />

      <IPayFilterBottomSheet
        testID="filters-bottom-sheet"
        heading="TRANSACTION_HISTORY.FILTER"
        defaultValues={transferHistoryFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        filters={internationalTransferHistoryFilterData}
        applySearchOn={[FiltersType.BENEFICIARY_NAME_LIST]}
        customFiltersValue
        onSubmit={onPressApplyFilters}
        onClearFilters={onClearFilters}
        handleCallback={handleCallbackForFilters}
      />
    </IPaySafeAreaView>
  );
};

export default MusanedHistoryScreen;
