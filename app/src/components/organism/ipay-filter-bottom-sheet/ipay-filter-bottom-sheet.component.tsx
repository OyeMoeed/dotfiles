import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayDatePicker, IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import { IPayAnimatedTextInput, IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
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

const IPayControlledInput = ({ control, label, message, isError, name }: ControlFormField) => {
  const { colors } = useTheme();
  const styles = filtersStyles(colors);

  return (
    <Controller
      control={control}
      rules={{ required: true }}
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

  message,
}) => {
  const { colors } = useTheme();
  const styles = filtersStyles(colors);
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
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
      filters,
      isBottomDropdowns,
      bottomFilters = [],
      defaultValues,
      heading,
      applySearchOn = [],
      inputStyle,
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
      formState: { errors },
    } = useForm({
      defaultValues,
    });

    const onSubmitEvent = (data: SubmitEvent) => {
      
      if (getValues('date_to') < getValues('date_from')) {
        setDateError(localizationText.ERROR.DATE_ERROR);
        return;
      }
      if (onSubmit) onSubmit(data);
      filterSheetRef.current?.close();
      setDateError('');
      setAmountError('');
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

    const filterItems = [...filters, ...bottomFilters];

    const getFilterType = () => filterItems?.find((el: FilterTypes) => el.type === category);

    const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
    const listCheckIcon = (icon: string) => <IPayIcon icon={icon} size={18} color={colors.primary.primary500} />;
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
    };

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      });
    };

    const customSnapPoint = ['1%', isAndroidOS ? '94%' : '100%'];

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

    const renderFilters = () => (
      <IPayView style={styles.inputContainer}>
        <IPayFlatlist
          scrollEnabled={false}
          data={filters}
          renderItem={({ item: { type, label, icon, dropdownIcon, isRequired=true } }) => (
            <Controller
              control={control}
              name={type}
              rules={{ required: isRequired }}
              render={() => (
                <IPayAnimatedTextInput
                  label={label}
                  editable={false}
                  value={getValues(type)}
                  containerStyle={[styles.inputContainerStyle, inputStyle]}
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
                isError={!!errors?.amount_from}
                message={localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.AMOUNT_FROM}
              />
              <IPayControlledInput
                label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                control={control}
                isError={!!amountError || !!errors?.amount_to}
                message={amountError || localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.AMOUNT_TO}
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
                isError={!!errors?.date_from}
                label={localizationText.TRANSACTION_HISTORY.FROM}
                listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
                message={localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.DATE_FROM}
                onClearInput={() => {
                  setShowToDatePicker(false);
                  setShowFromDatePicker(!showFromDatePicker);
                  scrollToBottom();
                }}
              />
              <IPayControlledDatePicker
                control={control}
                isError={!!dateError || !!errors?.date_to}
                label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
                message={dateError || localizationText.COMMON.REQUIRED_FIELD}
                name={FiltersType.DATE_TO}
                onClearInput={() => {
                  setShowToDatePicker(!showToDatePicker);
                  setShowFromDatePicker(false);
                  scrollToBottom();
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
              rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
              simpleInput
              containerStyle={styles.searchInputStyle}
            />
          )}
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
                  renderItem={({ item: { value: title, description, image } }) => (
                    <IPayList
                      isShowIcon={value === title}
                      title={title}
                      icon={checkMark}
                      isShowSubTitle={!!description}
                      subTitle={description}
                      textStyle={currentFilter?.listTitleStyle}
                      style={styles.listStyle}
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
        </IPayView>
      );
    };

    return (
      <IPayBottomSheet
        heading={currentView === CurrentViewTypes.FILTERS ? heading : getFilterType()?.label}
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
          {currentView === CurrentViewTypes.FILTERS ? renderFilters() : renderValues()}
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
