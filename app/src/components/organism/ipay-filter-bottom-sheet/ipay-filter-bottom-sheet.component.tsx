/* eslint-disable max-lines-per-function */
import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayDatePicker, IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import { IPayAnimatedTextInput, IPayButton, IPayList, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import { REGEX } from '@app/constants/app-validations';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FORMAT_1 } from '@app/utilities/date-helper.util';
import { FilterValue, FiltersType, buttonVariants } from '@app/utilities/enums.util';
import renderFilterInputImage from '@app/utilities/filter-sheet-helper.utils';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { IPayBottomSheet } from '@components/organism/index';
import moment from 'moment';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import {
  ControlFormField,
  CurrentViewTypes,
  FilterTypes,
  FilterValueTypes,
  IPayFilterProps,
} from './ipay-filter-bottom-sheet.interface';
import filtersStyles from './ipay-filter-bottom-sheet.style';

/**
 * Represents a form field controlled by a control instance.
 * @param {ControlFormField} props - The props for the ControlFormField component.
 * @param {Control<FieldValues>} props.control - Control instance managing field values in the form.
 * @param {string} props.name - Identifier/key for the input field.
 * @param {string} props.label - Textual label for the input field.
 * @param {React.ReactElement<any>} [props.listCheckIcon] - Icon element indicating checked state in lists.
 * @param {() => void} [props.onClearInput] - Callback function for clearing the input field.
 * @param {boolean} [props.isError] - Indicates error state for the input field.
 * @param {string} [props.message] - Error message associated with the input field.
 * @returns {JSX.Element} - The rendered component.
 */

const IPayControlledInput = ({ control, label, message, isError, name, required }: ControlFormField) => {
  const { colors } = useTheme();
  const styles = filtersStyles(colors);

  return (
    <Controller
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <IPayAnimatedTextInput
          label={label}
          editable
          inputMode="numeric"
          value={value}
          onChangeText={onChange}
          containerStyle={styles.amount}
          isError={isError}
          assistiveText={isError ? message : ''}
        />
      )}
      name={name}
    />
  );
};

const IPayControlledDatePicker: React.FC<ControlFormField> = ({
  control,
  name,
  label,
  listCheckIcon,
  onClearInput,
  isError,
  required,
  message,
  showFocusStyle,
}) => {
  const { colors } = useTheme();
  const styles = filtersStyles(colors);
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <IPayTextInput
          label={label}
          editable
          text={value}
          showLeftIcon
          leftIcon={listCheckIcon}
          onClearInput={onClearInput}
          caretHidden
          closeIconStyle={styles.dropdownIcon}
          containerStyle={styles.date}
          isError={isError}
          assistiveText={isError ? message : ''}
          onChangeText={onChange}
          showFocusStyle={showFocusStyle}
        />
      )}
    />
  );
};

const IPayFilterBottomSheet: React.FC<IPayFilterProps> = forwardRef(
  (
    {
      onSubmit,
      testID,
      showAmountFilter,
      showDateFilter,
      filters = [],
      isBottomDropdowns,
      bottomFilters = [],
      defaultValues,
      heading,
      applySearchOn = [],
      inputStyle,
      customFiltersValue,
      handleCallback,
    },
    ref,
  ) => {
    const localizationText = useLocalization();
    const [category, setCategory] = useState<FiltersType>();
    const [search, setSearch] = useState<string>('');
    const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);
    const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<CurrentViewTypes>(CurrentViewTypes.FILTERS);
    const [amountError, setAmountError] = useState<string>('');
    const [dateError, setDateError] = useState<string>('');
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
      formState: { errors, isDirty },
    } = useForm({
      defaultValues,
    });

    const onSubmitEvent = (data: SubmitEvent) => {
      if (moment(moment(getValues('dateTo'), FORMAT_1)).isBefore(moment(getValues('dateFrom'), FORMAT_1))) {
        setDateError(localizationText.ERROR.DATE_ERROR);
        return;
      }

      if (+getValues(FiltersType.AMOUNT_TO) < +getValues(FiltersType.AMOUNT_FROM)) {
        setAmountError(localizationText.ERROR.AMOUNT_ERROR);
        return;
      }
      filterSheetRef.current?.close();
      if (onSubmit) onSubmit(data);
      setDateError('');
      setAmountError('');
      setShowFromDatePicker(false);
      setShowToDatePicker(false);
      reset();
    };
    const showFilters = () => {
      filterSheetRef?.current?.present();
    };
    const closeFilter = () => {
      filterSheetRef?.current?.dismiss();
    };

    const filterItems = [...filters, ...bottomFilters];

    const getFilterType = () => filterItems?.find((el: FilterTypes) => el.type === category);

    const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
    const listCheckIcon = (icon: string) => <IPayIcon icon={icon} size={24} color={colors.primary.primary500} />;
    const onToDateChange = (date: string) => {
      setValue(FiltersType.DATE_TO, moment(date).format(FORMAT_1));
    };
    const onFromDateChange = (date: string) => {
      setValue(FiltersType.DATE_FROM, moment(date).format(FORMAT_1));
    };

    const onCloseFilterSheet = () => {
      if (currentView === CurrentViewTypes.FILTER_VALUES) {
        setCurrentView(CurrentViewTypes.FILTERS);
        setSearch('');
      } else {
        filterSheetRef.current?.close();
        setDateError('');
        setAmountError('');
      }
    };

    const onPressDone = () => {
      reset();
      setShowFromDatePicker(false);
      setShowToDatePicker(false);
    };

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      });
    };

    const customSnapPoint = ['1%', isAndroidOS ? '94%' : '95%'];

    const getFilteredData = (filterValues: FilterValue[]) =>
      search ? filterValues.filter((item) => item.value.toLowerCase().includes(search.toLowerCase())) : filterValues;

    const renderImage = (type: string, src: string) => {
      const filterImage = renderFilterInputImage(filters, type, getValues);

      return filterImage ? (
        <IPayImage image={filterImage} style={styles.bankImage} />
      ) : (
        <IPayIcon icon={src} size={18} color={colors.primary.primary500} />
      );
    };

    const onSelectDateFilter = (dateType: FiltersType) => {
      if (!getValues(dateType)) {
        setValue(dateType, moment(new Date()).format(FORMAT_1));
      }
    };

    const numberValidation = (type: string) => {
      if (type === FiltersType.CONTACT_NUMBER && REGEX.DIGITS_ONLY.test(getValues(FiltersType.CONTACT_NUMBER))) {
        return { value: REGEX.SaudiMobileNumber, message: localizationText.COMMON.INCORRECT_MOBILE_NUMBER };
      }
      return {};
    };

    const extractTitleByValue = (value: string) => {
      const filterData = getFilterType();
      if (filterData?.type === FiltersType.CONTACT_NUMBER) {
        try {
          const contact = filterData.filterValues.find((item) => item.value === value);
          return contact?.displayValue || value;
        } catch (error) {
          return value;
        }
      }
      return value;
    };

    // Use useImperativeHandle to expose methods to the parent
    useImperativeHandle(ref, () => ({
      showFilters,
      closeFilter,
      getChildFilterType: () => getFilterType()?.filterValues,
      setCurrentViewAndSearch: (categoryType: FiltersType, value: string, type?: string) => {
        if (type !== 'Digital Wallet') setValue('transactionType', type);
        setValue(categoryType, value);
        setCurrentView(CurrentViewTypes.FILTERS); // Ensure CurrentViewTypes.FILTERS is a valid enum value
        setSearch('');
      },
    }));

    const renderFilters = () => (
      <IPayView style={styles.inputContainer}>
        <IPayFlatlist
          scrollEnabled={false}
          data={filters}
          renderItem={({ item: { type, label, icon, dropdownIcon, isRequired = true, editable = false } }) => (
            <Controller
              control={control}
              name={type}
              rules={{
                required: { value: isRequired, message: localizationText.COMMON.REQUIRED_FIELD },
                pattern: numberValidation(type),
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={label}
                  editable={editable}
                  value={extractTitleByValue(value)}
                  containerStyle={[styles.inputContainerStyle, inputStyle]}
                  inputStyle={styles.input}
                  showRightIcon
                  customIcon={listCheckIcon(dropdownIcon || icons.arrow_circle_down)}
                  onClearInput={() => {
                    setCategory(type);
                    setCurrentView(
                      customFiltersValue &&
                        (type === FiltersType.DELIVERY_TYPE || type === FiltersType.BENEFICIARY_NAME_LIST)
                        ? CurrentViewTypes.BOTTOM_SHEET
                        : CurrentViewTypes.FILTER_VALUES,
                    );
                  }}
                  isError={!!errors[type]}
                  assistiveText={errors[type] && errors[type].message}
                  onChangeText={onChange}
                  rightIcon={renderImage(type, icon)}
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
              <IPayControlledInput
                label={localizationText.TRANSACTION_HISTORY.FROM}
                control={control}
                isError={!!errors?.amountFrom}
                message={localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.AMOUNT_FROM}
                required={!!getValues(FiltersType.AMOUNT_FROM)}
              />
              <IPayControlledInput
                label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                control={control}
                isError={!!amountError || !!errors?.amountTo}
                message={amountError || localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.AMOUNT_TO}
                required={!!getValues(FiltersType.AMOUNT_FROM)}
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
              <IPayControlledDatePicker
                control={control}
                isError={!!errors?.dateFrom}
                label={localizationText.TRANSACTION_HISTORY.FROM}
                listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
                message={localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.DATE_FROM}
                required={!!getValues(FiltersType.DATE_FROM)}
                showFocusStyle={showFromDatePicker && !showToDatePicker}
                onClearInput={() => {
                  setShowToDatePicker(false);
                  setShowFromDatePicker(!showFromDatePicker);
                  scrollToBottom();
                  onSelectDateFilter(FiltersType.DATE_FROM);
                }}
              />
              <IPayControlledDatePicker
                control={control}
                isError={!!dateError || !!errors?.dateTo}
                label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
                message={dateError || localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.DATE_TO}
                required={!!getValues(FiltersType.DATE_FROM)}
                showFocusStyle={showToDatePicker && showFromDatePicker}
                onClearInput={() => {
                  setShowToDatePicker(!showToDatePicker);
                  setShowFromDatePicker(false);
                  scrollToBottom();
                  onSelectDateFilter(FiltersType.DATE_TO);
                }}
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

        {isBottomDropdowns && (
          <IPayFlatlist
            scrollEnabled={false}
            data={bottomFilters}
            renderItem={({ item: { type, label, icon, dropdownIcon } }) => (
              <Controller
                control={control}
                name={type}
                rules={{ required: true }}
                render={() => (
                  <IPayAnimatedTextInput
                    label={label}
                    editable={false}
                    value={getValues(type)}
                    containerStyle={styles.inputContainerStyle}
                    showRightIcon
                    customIcon={listCheckIcon(dropdownIcon || icons.arrow_circle_down)}
                    onClearInput={() => {
                      setCategory(type);
                      setCurrentView(CurrentViewTypes.FILTER_VALUES);
                    }}
                    isError={!!errors[type]}
                    assistiveText={errors[type] && localizationText.COMMON.REQUIRED_FIELD}
                    onChangeText={() => {}}
                    rightIcon={renderImage(type, icon)}
                  />
                )}
              />
            )}
          />
        )}
      </IPayView>
    );

    const renderValues = () => {
      const currentFilter = getFilterType();
      return (
        <IPayView style={styles.valuesContainer}>
          {applySearchOn.includes(currentFilter?.type as string) && (
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholder={currentFilter?.searchPlaceholder || localizationText.COMMON.SEARCH}
              rightIcon={<IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />}
              simpleInput
              containerStyle={styles.searchInputStyle}
            />
          )}
          {getFilteredData(currentFilter.filterValues).length ? (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                if (!currentFilter) {
                  return <IPayView />;
                }
                return (
                  <IPayFlatlist
                    scrollEnabled={false}
                    data={getFilteredData(currentFilter.filterValues)}
                    keyExtractor={(item: FilterValueTypes) => item.key}
                    renderItem={({ item: { value: title, description, image, displayValue } }) => (
                      <IPayList
                        isShowIcon={value === title}
                        title={displayValue || title}
                        icon={checkMark}
                        isShowSubTitle={!!description}
                        subTitle={description}
                        textStyle={currentFilter?.listTitleStyle}
                        style={styles.listStyle}
                        containerStyle={styles.input}
                        onPress={() => {
                          onChange(title);
                          setCurrentView(CurrentViewTypes.FILTERS);
                          setSearch('');
                        }}
                        isShowLeftIcon={image}
                        leftIcon={<IPayImage image={image} style={styles.bankImage} />}
                      />
                    )}
                  />
                );
              }}
              name={getFilterType()?.type || ''}
            />
          ) : (
            <IPayView style={styles.noRecordContainer}>
              <IPayNoResult
                containerStyle={styles.noRecordWrapper}
                message={localizationText.COMMON.NO_RESULTS_FOUND}
                showIcon
                icon={icons.note_remove1}
                iconSize={40}
                iconColor={colors.primary.primary800}
              />
            </IPayView>
          )}
        </IPayView>
      );
    };

    const renderFilterUI = () => {
      if (currentView === CurrentViewTypes.FILTERS) {
        return renderFilters();
      }
      if (currentView === CurrentViewTypes.FILTER_VALUES) {
        return renderValues();
      }
      if (category === FiltersType.DELIVERY_TYPE) {
        handleCallback?.(FiltersType.DELIVERY_TYPE);
      } else {
        handleCallback?.(FiltersType.BENEFICIARY_NAME);
      }

      return renderFilters();
    };

    return (
      <IPayBottomSheet
        testID="filters-bottom-sheet"
        heading={currentView === CurrentViewTypes.FILTERS || customFiltersValue ? heading : getFilterType()?.label}
        enablePanDownToClose
        cancelBnt
        simpleBar
        doneBtn={currentView === CurrentViewTypes.FILTERS}
        doneButtonStyle={styles.actionButtonStyle}
        cancelButtonStyle={styles.actionButtonStyle}
        doneText={localizationText.TRANSACTION_HISTORY.CLEAR_FILTERS}
        onDone={onPressDone}
        customSnapPoint={customSnapPoint}
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
          {renderFilterUI()}
        </IPayScrollView>
        {currentView === CurrentViewTypes.FILTERS ? (
          <IPayView style={styles.buttonWrapper}>
            <IPayButton
              medium
              btnStyle={styles.applyButton}
              btnType={buttonVariants.PRIMARY}
              btnText={localizationText.TRANSACTION_HISTORY.APPLY}
              large
              btnIconsDisabled
              onPress={handleSubmit(onSubmitEvent)}
            />
          </IPayView>
        ) : (
          <IPayView />
        )}
      </IPayBottomSheet>
    );
  },
);

export default IPayFilterBottomSheet;
