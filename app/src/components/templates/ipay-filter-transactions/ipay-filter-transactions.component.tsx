import { IPayCaption1Text, IPayDatePicker, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants, FiltersType } from '@app/utilities/enums.util';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPayAnimatedTextInput, IPayButton, IPayTextInput } from '@app/components/molecules';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { FORMAT_1 } from '@app/utilities/date-helper.util';
import icons from '@app/assets/icons';
import { useTranslation } from 'react-i18next';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { SNAP_POINT } from '@app/constants/constants';
import { getTransactionTypes } from '@app/network/services/core/transaction/transactions.service';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import LocalTransferBeneficiariesMockProps from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.interface';
import getlocalTransferBeneficiaries from '@app/network/services/local-transfer/local-transfer-beneficiaries/local-transfer-beneficiaries.service';
import LocalBeneficiaryMetaMockProps from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.interface';
import getlocalBeneficiaryMetaData from '@app/network/services/local-transfer/local-transfer-beneficiary-metadata/local-beneficiary-metadata.service';
import useConstantData from '@app/constants/use-constants';
import IPayFilterTransactionsStyles from './ipay-filter-transactions.styles';
import { IPayFilterTransactionsProps } from './ipay-filter-transactions.interface';

const IPayControlledInput = ({ control, label, message, isError, name, required, suffix }: any) => {
  const { colors } = useTheme();
  const styles = IPayFilterTransactionsStyles(colors);

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
          suffix={suffix}
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

const IPayControlledDatePicker = ({
  control,
  name,
  label,
  listCheckIcon,
  onClearInput,
  isError,
  required,
  message,
  showFocusStyle,
}: any) => {
  const { colors } = useTheme();
  const styles = IPayFilterTransactionsStyles(colors);
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <IPayTextInput
          label={label}
          editable={false}
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

const IPayFilterTransactions = ({
  testID,
  showTypeFilter,
  cards,
  contacts,
  showContactsFilter,
  showCardFilter,
  showAmountFilter,
  showDateFilter,
  showBeneficiaryFilter = false,
  showGiftFilters = false,
  onSubmit,
  defaultValues,
  heading,
  isVisible,
  onCloseFilterSheet,
  setSelectedCard,
}: IPayFilterTransactionsProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayFilterTransactionsStyles(colors);
  const [showToDatePicker, setShowToDatePicker] = useState<boolean>(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [transactionTypes, setTransactionTypes] = useState<ListItem[]>([]);
  const [beneficiaryData, setBeneficiaryData] = useState<ListItem[]>([]);
  const [bankList, setBankList] = useState<ListItem[]>([]);
  const [isCardFilterVisible, setIsCardFilterVisible] = useState<boolean | undefined>(false);

  // Todo: replace dummy data with real
  const { sendGiftBottomFilterData } = useConstantData();

  const [giftStatus, setGiftStatus] = useState<ListItem[]>(sendGiftBottomFilterData[0].filterValues);
  const [giftOccasion, setGiftOccasion] = useState<ListItem[]>(sendGiftBottomFilterData[1].filterValues);

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

  const onContactsList = useCallback(
    () =>
      contacts?.map((item: any, index: any) => ({
        id: index,
        key: item?.phoneNumbers[0]?.number,
        displayValue: item?.givenName,
        value: item?.phoneNumbers[0]?.number,
        description: item?.phoneNumbers[0]?.number,
      })),
    [contacts],
  );

  const mappedContacts = useMemo(() => onContactsList(), [onContactsList]);

  const getTransactionTypesData = async () => {
    const apiResponse: any = await getTransactionTypes({ hideSpinner: false });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const transactionTypesRes = apiResponse?.response?.transactionRequestTypeRecs;
      if (transactionTypesRes?.length) {
        const types: ListItem[] = transactionTypesRes?.map((transactionType: any, index: number) => ({
          id: index,
          key: transactionType?.transactionRequestType,
          value: transactionType?.defaultDescEn,
        }));
        setTransactionTypes(types);
      }
    }
  };

  const getBeneficiariesData = async () => {
    const apiResponse: LocalTransferBeneficiariesMockProps | undefined = await getlocalTransferBeneficiaries();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const beneficiaries = apiResponse?.response?.beneficiaries;
      if (beneficiaries?.length) {
        const beneficiariesData: ListItem[] = beneficiaries?.map((beneficiary: any) => ({
          id: beneficiary?.beneficiaryCode,
          key: beneficiary?.fullName,
          value: beneficiary?.fullName,
        }));
        setBeneficiaryData(beneficiariesData);
      }
    }
  };

  const getBankList = async () => {
    const apiResponse: LocalBeneficiaryMetaMockProps | undefined = await getlocalBeneficiaryMetaData();
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      const banksList = apiResponse?.response?.localBanks;
      const banksData: ListItem[] = banksList?.map((bank: any) => ({
        key: bank?.code,
        value: bank?.desc,
        image: bank?.code,
      }));
      setBankList(banksData);
    }
  };

  const listCheckIcon = (icon: string) => <IPayIcon icon={icon} size={24} color={colors.primary.primary500} />;
  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  const onPressDone = () => {
    reset();
    setIsCardFilterVisible(false);
    setShowFromDatePicker(false);
    setShowToDatePicker(false);
  };

  const onToDateChange = (date: string) => {
    setValue(FiltersType.DATE_TO, moment(date).format(FORMAT_1));
  };
  const onFromDateChange = (date: string) => {
    setValue(FiltersType.DATE_FROM, moment(date).format(FORMAT_1));
  };

  const getCardInfo = (card: string) => {
    if (cards?.length) {
      const foundCard = cards.find((item: any) => item?.key === card);
      return foundCard;
    }
    return '';
  };

  const getFilterTags = (data: any) => {
    const mapFilterTags = new Map();
    if (Object.keys(data)?.length) {
      const beneficiaryName = data?.beneficiaryName;
      if (beneficiaryName) mapFilterTags.set(beneficiaryName, { beneficiaryName: '' });

      const bankName = bankList?.find((bank: ListItem) => bank?.key === data?.beneficiaryBankName)?.value;
      if (bankName) mapFilterTags.set(bankName, { beneficiaryBankName: '' });

      const contactName = mappedContacts?.find(
        (contact: ListItem) => contact?.key === data?.contactNumber,
      )?.displayValue;

      if (contactName) mapFilterTags.set(contactName, { contactNumber: '' });

      const transactionType = transactionTypes?.find((type: ListItem) => type?.key === data?.transactionType)?.value;
      if (transactionType) mapFilterTags.set(transactionType, { transactionType: '' });

      const dateRange = data?.dateFrom || data?.dateTo ? `${data?.dateFrom} - ${data?.dateTo}` : '';
      if (dateRange && dateRange.length > 0) mapFilterTags.set(dateRange, { dateFrom: '', dateTo: '' });

      const amountRange =
        data?.amountFrom || data?.amountTo ? `${data?.amountFrom} - ${data?.amountTo} ${t('COMMON.SAR')}` : '';
      if (amountRange && amountRange.length > 0) mapFilterTags.set(amountRange, { amountFrom: '', amountTo: '' });

      const card = data?.card;
      if (card) {
        const cardInfo = getCardInfo(card);
        if (cardInfo && setSelectedCard) {
          setSelectedCard(cardInfo);
          const cardNumber = cardInfo?.value;
          mapFilterTags.set(cardNumber, { card: '' });
        }
      }
    }
    return mapFilterTags;
  };

  const onSubmitEvent = (data: any) => {
    if (moment(moment(getValues('dateTo'), FORMAT_1)).isBefore(moment(getValues('dateFrom'), FORMAT_1))) {
      setDateError(t('ERROR.DATE_ERROR'));
      return;
    }

    if (+getValues(FiltersType.AMOUNT_TO) < +getValues(FiltersType.AMOUNT_FROM)) {
      setAmountError(t('ERROR.AMOUNT_ERROR'));
      return;
    }

    const filterTags: Map<any, any> = getFilterTags(data);

    if (onSubmit) onSubmit(data, filterTags);
    onCloseFilterSheet();
    setDateError('');
    setAmountError('');
    setShowFromDatePicker(false);
    setShowToDatePicker(false);
    // reset();
  };

  const onSelectDateFilter = (dateType: FiltersType) => {
    if (!getValues(dateType)) {
      setValue(dateType, moment(new Date()).format(FORMAT_1));
    }
  };

  const handleSelectType = (selectedItem: string) => {
    if (showCardFilter && cards) {
      const CARD_TYPES = [
        'CIN_VISA_CASHBACK',
        'PAY_VCARD_POS_MADA',
        'PAY_VCARD_POS',
        'PAY_VCARD_POS_VISA',
        'PAY_VCARD_POS_NAQD_MADA',
        'PAY_VCARD_POS_NAQD_VISA',
        'PAY_VCARD_POS_NAQD',
        'PAY_VCARD_ECOM_MADA',
        'PAY_VCARD_ECOM_VISA',
      ];
      const foundItem: any = CARD_TYPES.find((cardType: string) => cardType === selectedItem) || null;
      setIsCardFilterVisible(!!foundItem);
    }
  };

  const renderDateFilter = () => (
    <IPayView style={styles.dateHeading}>
      <IPayView style={styles.rowInputHeading}>
        <IPayIcon icon={icons.calendar} />
        <IPayCaption1Text text="TRANSACTION_HISTORY.BY_DATE" style={styles.rowInputHeadingText} />
      </IPayView>

      <IPayView style={styles.rowInput}>
        <IPayControlledDatePicker
          control={control}
          isError={!!errors?.dateFrom}
          label="TRANSACTION_HISTORY.FROM"
          listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
          message="COMMON.REQUIRED_FIELD"
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
          label="TRANSACTION_HISTORY.TO_INPUT"
          listCheckIcon={listCheckIcon(icons.arrow_circle_down)}
          message={dateError || t('COMMON.REQUIRED_FIELD')}
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
  );

  const renderAmountFilter = () => (
    <IPayView style={styles.amountCard}>
      <IPayView style={styles.rowInputHeading}>
        <IPayIcon icon={icons.amount} />
        <IPayCaption1Text text="TRANSACTION_HISTORY.BY_AMOUNT" style={styles.rowInputHeadingText} />
      </IPayView>

      <IPayView style={styles.rowInput}>
        <IPayControlledInput
          label="TRANSACTION_HISTORY.FROM"
          control={control}
          suffix="COMMON.SAR"
          isError={!!errors?.amountFrom}
          message="COMMON.REQUIRED_FIELD"
          name={FiltersType.AMOUNT_FROM}
          required={!!getValues(FiltersType.AMOUNT_FROM)}
        />
        <IPayControlledInput
          label="TRANSACTION_HISTORY.TO_INPUT"
          control={control}
          suffix="COMMON.SAR"
          isError={!!amountError || !!errors?.amountTo}
          message={amountError || t('COMMON.REQUIRED_FIELD')}
          name={FiltersType.AMOUNT_TO}
          required={!!getValues(FiltersType.AMOUNT_FROM)}
        />
      </IPayView>
    </IPayView>
  );

  const rendeBeneficiaryFilters = () => (
    <>
      <Controller
        control={control}
        name={FiltersType.BENEFICIARY_NAME}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={beneficiaryData as ListItem[]}
            selectedValue={value}
            label="TRANSACTION_HISTORY.BENEFICIARY_NAME"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            isSearchable
            testID="beneficiary-name-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
      <Controller
        control={control}
        name={FiltersType.BANK_NAME_LIST}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={bankList as ListItem[]}
            selectedValue={value}
            label="TRANSACTION_HISTORY.BANK_NAME"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            testID="beneficiary-banks-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
    </>
  );

  const renderGiftFilters = () => (
    <>
      <Controller
        control={control}
        name={FiltersType.STATUS}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={giftStatus as ListItem[]}
            selectedValue={value}
            label="SEND_GIFT.STATUS"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            isSearchable
            testID="gift-status-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
      <Controller
        control={control}
        name={FiltersType.OCCASION}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={giftOccasion as ListItem[]}
            selectedValue={value}
            label="SEND_GIFT.OCCASION"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            testID="gift-occasion-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
    </>
  );

  const renderFilters = () => (
    <IPayView style={styles.inputContainer}>
      {showBeneficiaryFilter && rendeBeneficiaryFilters()}
      {showTypeFilter && (
        <Controller
          control={control}
          name={FiltersType.TRANSACTION_TYPE}
          render={({ field: { onChange, value } }) => (
            <IPayDropdownSelect
              data={transactionTypes as ListItem[]}
              selectedValue={value}
              label="TRANSACTION_HISTORY.TRANSACTION_TYPE"
              onSelectListItem={(selectedItem: string) => {
                handleSelectType(selectedItem);
                onChange();
              }}
              testID="transactionTypes-dropdown"
              labelKey="value"
              valueKey="key"
              containerStyle={styles.inputContainerStyle}
              customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
            />
          )}
        />
      )}
      {(showContactsFilter || showGiftFilters) && (
        <Controller
          control={control}
          name={FiltersType.CONTACT_NUMBER}
          render={({ field: { onChange, value } }) => (
            <IPayDropdownSelect
              data={mappedContacts as ListItem[]}
              selectedValue={value}
              label="WALLET_TO_WALLET.CONTACT_NUMBER_OR_NAME"
              onSelectListItem={(selectedItem: string) => onChange(selectedItem)}
              testID="contacts-dropdown"
              labelKey="displayValue"
              valueKey="value"
              customIcon={searchIcon}
              editable
              containerStyle={styles.inputContainerStyle}
              customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
            />
          )}
        />
      )}
      {isCardFilterVisible && (
        <Controller
          control={control}
          name={FiltersType.CARD}
          render={({ field: { onChange, value } }) => (
            <IPayDropdownSelect
              data={cards as ListItem[]}
              selectedValue={value}
              label="TRANSACTION_HISTORY.CARD"
              onSelectListItem={(selectedItem: string) => {
                onChange(selectedItem);
              }}
              isSearchable={false}
              testID="cards-dropdown"
              labelKey="value"
              valueKey="key"
              containerStyle={styles.inputContainerStyle}
            />
          )}
        />
      )}
      {showAmountFilter && renderAmountFilter()}
      {showDateFilter && renderDateFilter()}
      {showGiftFilters && renderGiftFilters()}
      <IPayView style={styles.buttonWrapper}>
        <IPayButton
          medium
          btnStyle={styles.applyButton}
          btnType={buttonVariants.PRIMARY}
          btnText="TRANSACTION_HISTORY.APPLY"
          large
          btnIconsDisabled
          onPress={handleSubmit(onSubmitEvent)}
          disabled={!isDirty && !getValues(FiltersType.DATE_FROM) && !getValues(FiltersType.DATE_TO)}
        />
      </IPayView>
    </IPayView>
  );

  const prepareData = async () => {
    if (showTypeFilter) await getTransactionTypesData();
    if (showBeneficiaryFilter) {
      await getBeneficiariesData();
      await getBankList();
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <IPayPortalBottomSheet
      testID="filters-bottom-sheet"
      heading={heading}
      enablePanDownToClose
      cancelBnt
      simpleBar
      doneBtn
      doneButtonStyle={styles.actionButtonStyle}
      cancelButtonStyle={styles.actionButtonStyle}
      doneText={t('TRANSACTION_HISTORY.CLEAR_FILTER')}
      disabled={!isDirty && !getValues(FiltersType.DATE_FROM) && !getValues(FiltersType.DATE_TO)}
      onDone={onPressDone}
      customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
      onCloseBottomSheet={onCloseFilterSheet}
      bold
      isVisible={isVisible}
    >
      <IPayScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles.filtersContainer}
        testID={testID}
      >
        {renderFilters()}
      </IPayScrollView>
    </IPayPortalBottomSheet>
  );
};

export default IPayFilterTransactions;
