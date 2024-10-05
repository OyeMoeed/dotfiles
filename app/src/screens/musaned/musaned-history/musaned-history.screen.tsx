import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/core';

import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useTheme from '@app/styles/hooks/theme.hook';
import { FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';

import IPayMusnaedSalaryTypeBottomSheet from '../components/ipay-musaned-salary-type-bottom-sheet';

const MusanedHistoryScreen: React.FC = () => {
  const { params } = useRoute();
  const { musnaedData } = params || {};
  const laborerNames = musnaedData.map((value) => ({ id: value.name, text: value.name }));

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [selectSalaryType, setSelectSalaryType] = useState<SelectedValue | null>(null);
  const [selectLaborerNames, setSelectLaborerNames] = useState<SelectedValue | null>(null);

  const filterRef = useRef<bottomSheetTypes>(null);
  const salaryTypeBottomSheetRef = useRef<any>(null);
  const laborerNamesBottomSheetRef = useRef<any>(null);

  const { musanedTransferHistoryFilterData, transferHistoryFilterDefaultValues } = useConstantData();

  const onPressSelectSalaryTypeItem = (item: SelectedValue) => {
    setSelectSalaryType(item);
    filterRef?.current?.setCurrentViewAndSearch(FiltersType.SALARY_TYPE, t(item.text));
    salaryTypeBottomSheetRef?.current?.onHideSalaryType();
  };

  const onPressSelectLaborerNameItem = (item: SelectedValue) => {
    setSelectLaborerNames(item);
    filterRef?.current?.setCurrentViewAndSearch(FiltersType.LABORER_NAME, item.text);
    laborerNamesBottomSheetRef?.current?.onHideSalaryType();
  };

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

  const onReset = () => {
    setSelectSalaryType(null);
    setSelectLaborerNames(null);
    filterRef?.current?.setCurrentViewAndSearch(FiltersType.SALARY_TYPE, '');
    filterRef?.current?.setCurrentViewAndSearch(FiltersType.LABORER_NAME, '');
  };

  const onClearFilters = () => {
    setFilters([]);
    onReset();
  };

  const handleCallbackForFilters = (sheetName: string) => {
    if (sheetName === FiltersType.LABORER_NAME) {
      laborerNamesBottomSheetRef?.current?.onShowSalaryType();
    } else if (sheetName === FiltersType.SALARY_TYPE) {
      salaryTypeBottomSheetRef?.current?.onShowSalaryType();
    }
  };

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
        filters={musanedTransferHistoryFilterData}
        applySearchOn={[FiltersType.LABORER_NAME]}
        customFiltersValue
        onSubmit={onPressApplyFilters}
        onClearFilters={onClearFilters}
        handleCallback={handleCallbackForFilters}
        onReset={onReset}
      />
      <IPayMusnaedSalaryTypeBottomSheet
        onPressSelectSalaryTypeItem={onPressSelectSalaryTypeItem}
        salaryType={selectSalaryType}
        ref={salaryTypeBottomSheetRef}
        isFilter
      />
      <IPayMusnaedSalaryTypeBottomSheet
        onPressSelectSalaryTypeItem={onPressSelectLaborerNameItem}
        salaryType={selectLaborerNames}
        ref={laborerNamesBottomSheetRef}
        anotherArray={laborerNames}
        isFilter
      />
    </IPaySafeAreaView>
  );
};

export default MusanedHistoryScreen;
