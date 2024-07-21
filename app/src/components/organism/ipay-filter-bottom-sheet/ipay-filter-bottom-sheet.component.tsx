import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayDatePicker, IPayFlatlist, IPayIcon, IPayText, IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import { IPayAnimatedTextInput, IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FiltersType } from '@app/utilities/enums.util';
import { IPayBottomSheet } from '@components/organism/index';
import moment from 'moment';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, ViewStyle } from 'react-native';
import { CurrentViewTypes, IPayFilterProps, FilterTypes, FilterValueTypes } from './ipay-filter-bottom-sheet.interface';
import filtersStyles from './ipay-filter-bottom-sheet.style';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

const IPayFilterBottomSheet: React.FC<IPayFilterProps> = forwardRef(
  ({ onSubmit, testID, showAmountFilter, showDateFilter, filters, defaultValues, heading }, ref) => {
    const localizationText = useLocalization();
    const [category, setCategory] = useState<FiltersType>();
    const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);
    const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<CurrentViewTypes>(CurrentViewTypes.FILTERS);
    const scrollViewRef = useRef<ScrollView>(null);
    const { colors } = useTheme();
    const styles = filtersStyles(colors);
    const filterSheetRef = useRef<bottomSheetTypes>(null);
    const {
      getValues,
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues,
    });

    const onSubmitEvent = (data: SubmitEvent) => {
      onSubmit && onSubmit(data);
      filterSheetRef.current?.close();
    };
    const showFilters = () => {
      filterSheetRef?.current?.present();
    };
    const closeFilter = () => {
      filterSheetRef?.current?.dismiss();
    };

    useImperativeHandle(ref, () => ({
      showFilters,
      closeFilter,
    }));

    const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
    const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
    const onToDateChange = (date: string) => {
      setValue('date_to', moment(date).format('DD/MM/YYYY'));
    };
    const onFromDateChange = (date: string) => {
      setValue('date_from', moment(date).format('DD/MM/YYYY'));
    };

    const onCloseFilterSheet = () => {
      if (currentView === CurrentViewTypes.FILTER_VALUES) {
        setCurrentView(CurrentViewTypes.FILTERS);
      } else {
        filterSheetRef.current?.close();
      }
    };

    const onPressDone = () => {
      reset();
      onSubmit({});
    };

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      });
    };

    const renderFilters = () => (
      <IPayView style={styles.inputContainer}>
        <IPayFlatlist
          scrollEnabled={false}
          data={filters}
          renderItem={({ item }) => (
            <Controller
              control={control}
              name={item.type}
              render={() => (
                <IPayAnimatedTextInput
                  label={item.label}
                  editable={false}
                  value={getValues(item.type)}
                  containerStyle={styles.inputContainerStyle as ViewStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => {
                    setCategory(item.type);
                    setCurrentView(CurrentViewTypes.FILTER_VALUES);
                  }}
                  isError={!!errors?.transaction_type}
                  assistiveText={errors?.transaction_type && localizationText.COMMON.REQUIRED_FIELD}
                  onChangeText={() => {}}
                />
              )}
            />
          )}
        />
        {showAmountFilter && (
          <IPayView style={styles.amountCard}>
            <IPayView style={styles.rowInputHeading}>
              <IPayIcon icon={icons.amount} />
              <IPayCaption1Text
                text={localizationText.TRANSACTION_HISTORY.BY_AMOUNT}
                style={styles.rowInputHeadingText}
              />
            </IPayView>

            <IPayView style={styles.rowInput}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IPayAnimatedTextInput
                    label={localizationText.TRANSACTION_HISTORY.FROM}
                    editable
                    inputMode="numeric"
                    value={value}
                    onChangeText={onChange}
                    containerStyle={styles.amount}
                    isError={!!errors?.amount_from}
                    assistiveText={errors?.amount_from && localizationText.COMMON.REQUIRED_FIELD}
                  />
                )}
                name="amount_from"
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <IPayAnimatedTextInput
                    label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                    editable
                    inputMode="numeric"
                    value={value}
                    onChangeText={onChange}
                    containerStyle={styles.amount as ViewStyle}
                    isError={!!errors?.amount_to}
                    assistiveText={errors?.amount_to && localizationText.COMMON.REQUIRED_FIELD}
                  />
                )}
                name="amount_to"
              />
            </IPayView>
          </IPayView>
        )}

        {showDateFilter && (
          <IPayView style={styles.dateHeading}>
            <IPayView style={styles.rowInputHeading}>
              <IPayIcon icon={icons.calendar} />
              <IPayCaption1Text
                text={localizationText.TRANSACTION_HISTORY.BY_DATE}
                style={styles.rowInputHeadingText}
              />
            </IPayView>

            <IPayView style={styles.rowInput}>
              <Controller
                control={control}
                name="date_from"
                render={({ field: { value } }) => (
                  <IPayTextInput
                    label={localizationText.TRANSACTION_HISTORY.FROM}
                    text={value}
                    showLeftIcon
                    leftIcon={listCheckIcon}
                    onClearInput={() => {
                      setShowFromDatePicker(!showFromDatePicker);
                      setShowToDatePicker(false);
                      scrollToBottom();
                    }}
                    caretHidden
                    closeIconStyle={styles.dropdownIcon}
                    containerStyle={styles.date}
                    isError={!!errors?.date_from}
                    assistiveText={errors?.date_from && localizationText.COMMON.REQUIRED_FIELD}
                    onChangeText={() => {}}
                  />
                )}
              />
              <Controller
                control={control}
                name="date_to"
                render={({ field: { value } }) => (
                  <IPayTextInput
                    label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                    editable
                    text={value}
                    showLeftIcon
                    leftIcon={listCheckIcon}
                    onClearInput={() => {
                      setShowToDatePicker(!showToDatePicker);
                      setShowFromDatePicker(false);
                      scrollToBottom();
                    }}
                    caretHidden
                    closeIconStyle={styles.dropdownIcon}
                    containerStyle={styles.date}
                    isError={!!errors?.date_to}
                    assistiveText={errors?.date_to && localizationText.COMMON.REQUIRED_FIELD}
                    onChangeText={() => {}}
                  />
                )}
              />
            </IPayView>
            <IPayView style={styles.datePickerContainer}>
              {showToDatePicker && (
                <IPayDatePicker
                  onDateChange={onToDateChange}
                  style={styles.datePicker}
                  androidStyle={styles.datePickerAndroidStyle}
                />
              )}
              {showFromDatePicker && (
                <IPayDatePicker
                  onDateChange={onFromDateChange}
                  style={styles.datePicker}
                  androidStyle={styles.datePickerAndroidStyle}
                />
              )}
            </IPayView>
          </IPayView>
        )}
      </IPayView>
    );

    const renderValues = () => (
      <IPayView style={styles.valuesContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            const currentFilter = filters.find((el: FilterTypes) => el.type === category);
            if (!currentFilter) {
              return <IPayView />;
            }

            return (
              <IPayFlatlist
                scrollEnabled={false}
                data={currentFilter.filterValues}
                keyExtractor={(item: FilterValueTypes) => item.key}
                renderItem={({ item }) => (
                  <IPayList
                    isShowIcon={value === item.value}
                    title={item.value}
                    icon={checkMark}
                    style={styles.listStyle as ViewStyle}
                    onPress={() => {
                      onChange(item.value);
                      setCurrentView(CurrentViewTypes.FILTERS);
                    }}
                  />
                )}
              />
            );
          }}
          name={filters.find((el: FilterTypes) => el.type === category)?.type || ''}
        />
      </IPayView>
    );

    return (
      <IPayBottomSheet
        heading={
          currentView === CurrentViewTypes.FILTERS
            ? heading
            : filters.find((el: FilterTypes) => el.type === category)?.label
        }
        enablePanDownToClose
        cancelBnt
        simpleBar
        doneBtn={currentView === CurrentViewTypes.FILTERS}
        doneButtonStyle={styles.actionButtonStyle}
        cancelButtonStyle={styles.actionButtonStyle}
        doneText={localizationText.TRANSACTION_HISTORY.CLEAR_FILTERS}
        onDone={onPressDone}
        customSnapPoint={['1%', isAndroidOS ? '94%' : '100%']}
        onCloseBottomSheet={onCloseFilterSheet}
        ref={filterSheetRef}
        bold
      >
        <IPayScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.filtersContainer}
          testID={testID}
        >
          {currentView === 'filters' ? renderFilters() : renderValues()}
        </IPayScrollView>
        {currentView == CurrentViewTypes.FILTERS && (
          <IPayView style={styles.buttonWrapper}>
            <IPayButton
              medium
              btnStyle={styles.applyButton}
              btnType="primary"
              btnText={localizationText.TRANSACTION_HISTORY.APPLY}
              large
              btnIconsDisabled
              onPress={handleSubmit(onSubmitEvent)}
            />
          </IPayView>
        )}
      </IPayBottomSheet>
    );
  },
);

export default IPayFilterBottomSheet;
