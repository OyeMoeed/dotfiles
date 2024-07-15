import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayDatePicker, IPayIcon, IPayView } from '@app/components/atoms';
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
import { ScrollView } from 'react-native';
import { IPayFilterProps } from './ipay-filter-bottom-sheet.interface';
import filtersStyles from './ipay-filter-bottom-sheet.style';

const IPayFilterBottomSheet: React.FC<IPayFilterProps> = forwardRef(({ onSubmit, testID }, ref) => {
  const localizationText = useLocalization();
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '94%' : '100%']);
  const [category, setCategory] = useState<string>(FiltersType.FILTER);
  const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { colors } = useTheme();
  const styles = filtersStyles(colors);
  const filterSheetRef = useRef(null);
  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { transaction_type: '', card: '', amount_from: '', amount_to: '', date_to: '', date_from: '' },
  });
  const isSmallSheet = category === FiltersType.TRANSACTION_TYPE || category === FiltersType.CARD;

  const handleChangeCategory = (value: string) => {
    setSnapPoint(
      !isSmallSheet
        ? ['1%', isAndroidOS ? '50%' : '70%', isAndroidOS ? '94%' : '90%']
        : ['1%', isAndroidOS ? '94%' : '100%'],
    );
    setCategory(value);
  };
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

  const transactionKeys: Array<string> = [
    'POS_PURSHASE',
    'SEND_MONEY',
    'RECEIVED_MONEY',
    'LOCAL_TRANSFER',
    'ATM_WITHDRAWALS',
    'CASHBACK_PROMO',
  ];

  const cardKeys: Array<string> = [
    `${localizationText.CARD_OPTIONS.DEBIT_CARD} - **** 2222`,
    `${localizationText.TOP_UP.CREDIT_CARD} - **** 2222`,
  ];

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
    if (category !== FiltersType.FILTER) {
      setSnapPoint(['1%', isAndroidOS ? '94%' : '100%']);
      setCategory(FiltersType.FILTER);
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

  const renderFields = (value: string) => {
    switch (value) {
      case FiltersType.TRANSACTION_TYPE:
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              if (!transactionKeys.length) {
                return (
                  <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
                );
              }
              return transactionKeys.map((key) => (
                <IPayList
                  key={key}
                  isShowIcon={value === localizationText.HOME[key]}
                  title={localizationText.HOME[key]}
                  icon={checkMark}
                  style={styles.listStyle}
                  onPress={() => {
                    onChange(localizationText.HOME[key]);
                    handleChangeCategory(FiltersType.FILTER);
                  }}
                />
              ));
            }}
            name="transaction_type"
          />
        );
        break;
      case 'card':
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              if (!cardKeys.length) {
                return (
                  <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
                );
              }
              return cardKeys.map((key) => (
                <IPayList
                  key={key}
                  isShowIcon={value === key}
                  title={key}
                  icon={checkMark}
                  style={styles.listStyle}
                  onPress={() => {
                    onChange(key);
                    handleChangeCategory(FiltersType.FILTER);
                  }}
                />
              ));
            }}
            name="card"
          />
        );
        break;

      default:
        return (
          <IPayView style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => {
                return (
                  <IPayAnimatedTextInput
                    label={localizationText.TRANSACTION_HISTORY.TRANSACTION_TYPE}
                    editable={false}
                    value={getValues(FiltersType.TRANSACTION_TYPE)}
                    containerStyle={styles.inputContainerStyle}
                    showRightIcon
                    customIcon={listCheckIcon}
                    onClearInput={() => handleChangeCategory(FiltersType.TRANSACTION_TYPE)}
                    isError={!!errors?.transaction_type}
                    assistiveText={errors?.transaction_type && localizationText.COMMON.REQUIRED_FIELD}
                  />
                );
              }}
              name="transaction_type"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              name="card"
              render={() => {
                return (
                  <IPayAnimatedTextInput
                    label={localizationText.TRANSACTION_HISTORY.CARD}
                    editable={false}
                    value={getValues('card')}
                    containerStyle={styles.inputContainerStyle}
                    showRightIcon
                    customIcon={listCheckIcon}
                    onClearInput={() => handleChangeCategory(FiltersType.CARD)}
                    isError={!!errors?.card}
                    assistiveText={errors?.card && localizationText.COMMON.REQUIRED_FIELD}
                  />
                );
              }}
            />

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
                  rules={{ required: true }}
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
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <IPayAnimatedTextInput
                      label={localizationText.TRANSACTION_HISTORY.TO_INPUT}
                      editable
                      inputMode="numeric"
                      value={value}
                      onChangeText={onChange}
                      containerStyle={styles.amount}
                      isError={!!errors?.amount_to}
                      assistiveText={errors?.amount_to && localizationText.COMMON.REQUIRED_FIELD}
                    />
                  )}
                  name="amount_to"
                />
              </IPayView>
            </IPayView>

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
                  rules={{ required: true }}
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
                    />
                  )}
                />
                <Controller
                  control={control}
                  rules={{ required: true }}
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
          </IPayView>
        );
    }
  };
    
  return (
    <IPayBottomSheet
      heading={localizationText.TRANSACTION_HISTORY[category]}
      enablePanDownToClose
      cancelBnt
      simpleBar
      doneBtn={category === FiltersType.FILTER}
      doneButtonStyle={styles.actionButtonStyle}
      cancelButtonStyle={styles.actionButtonStyle}
      doneText={localizationText.TRANSACTION_HISTORY.CLEAR_FILTERS}
      onDone={onPressDone}
      customSnapPoint={snapPoint}
      onCloseBottomSheet={onCloseFilterSheet}
      ref={filterSheetRef}
      bold
      isPanningGesture={isSmallSheet}
    >
      <IPayScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles.filtersContainer}
        testID={testID}
      >
        <IPayView>{renderFields(category)}</IPayView>
      </IPayScrollView>
      {category === FiltersType.FILTER && (
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
});

export default IPayFilterBottomSheet;
