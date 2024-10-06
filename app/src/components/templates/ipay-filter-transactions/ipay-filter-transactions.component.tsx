import { IPayScrollView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, FiltersType } from '@app/utilities/enums.util';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IPayButton } from '@app/components/molecules';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { FORMAT_1 } from '@app/utilities/date-helper.util';
import { useTranslation } from 'react-i18next';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import {
  IPayFilterAmountRange,
  IPayFilterBeneficiaries,
  IPayFilterCards,
  IPayFilterContacts,
  IPayFilterDateRange,
  IPayFilterGifts,
  IPayFilterTransactionTypes,
} from '@app/components/organism';
import { useFilterSettings } from '@app/hooks';
import IPayFilterTransactionsStyles from './ipay-filter-transactions.styles';
import { IPayFilterTransactionsProps } from './ipay-filter-transactions.interface';

const IPayFilterTransactions = ({
  testID,
  showTypeFilter,
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
}: IPayFilterTransactionsProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayFilterTransactionsStyles(colors);
  const [hideDatePicKer, setHideDatePicKer] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  const {
    mappedContacts,
    transactionTypes,
    beneficiaryData,
    bankList,
    giftStatus,
    giftOccasion,
    mappedCards,
    isCardFilterVisible,
    setIsCardFilterVisible,
    handleSelectType,
  } = useFilterSettings(
    showTypeFilter,
    showContactsFilter,
    contacts,
    showCardFilter,
    showBeneficiaryFilter,
    showGiftFilters,
  );

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
    setHideDatePicKer(true);
  };

  const getCardInfo = (card: string) => {
    if (mappedCards?.length) {
      const foundCard = mappedCards.find((item: any) => item?.key === card);
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
        if (cardInfo) {
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
    setHideDatePicKer(true);
    setIsCardFilterVisible(false);
    // reset();
  };

  const onSelectDateFilter = (dateType: FiltersType) => {
    if (!getValues(dateType)) {
      setValue(dateType, moment(new Date()).format(FORMAT_1));
    }
  };

  const renderFilters = () => (
    <IPayView style={styles.inputContainer}>
      {showBeneficiaryFilter && (
        <IPayFilterBeneficiaries control={control} beneficiaryData={beneficiaryData} bankList={bankList} />
      )}
      {showTypeFilter && (
        <IPayFilterTransactionTypes
          handleSelectType={handleSelectType}
          control={control}
          transactionTypes={transactionTypes}
        />
      )}
      {(showContactsFilter || showGiftFilters) && <IPayFilterContacts control={control} contacts={contacts ?? []} />}
      {isCardFilterVisible && (
        <IPayFilterCards control={control} cards={mappedCards ?? []} label={t('TRANSACTION_HISTORY.CARD')} />
      )}
      {showAmountFilter && (
        <IPayFilterAmountRange
          control={control}
          title={t('TRANSACTION_HISTORY.BY_AMOUNT')}
          fromLabel={t('TRANSACTION_HISTORY.FROM')}
          toLabel={t('TRANSACTION_HISTORY.TO_INPUT')}
          errors={errors}
          required={false}
          amountError={amountError}
        />
      )}
      {showDateFilter && (
        <IPayFilterDateRange
          control={control}
          title={t('TRANSACTION_HISTORY.BY_DATE')}
          fromLabel={t('TRANSACTION_HISTORY.FROM')}
          toLabel="TRANSACTION_HISTORY.TO_INPUT"
          errors={errors}
          dateError={dateError}
          setValue={setValue}
          required={false}
          scrollToBottom={scrollToBottom}
          onSelectDateFilter={onSelectDateFilter}
          hideDatePicKer={hideDatePicKer}
        />
      )}
      {showGiftFilters && <IPayFilterGifts control={control} giftOccasion={giftOccasion} giftStatus={giftStatus} />}
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
