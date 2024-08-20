import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import {
  IPayAmountInput,
  IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayListView,
  IPayToggleButton,
} from '@app/components/molecules';

import IPayTransactionService from '@app/components/molecules/ipay-transaction-service/ipay-transaction-service.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { COUNTRIES_DATA, CURRENCIES_DATA, SNAP_POINTS, TRANSFER_METHOD_DATA } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useRef, useState } from 'react';
import { FilterType, TransactionDetails, dropDownItem } from './price-calculator.interface';
import priceCalculatorStyles from './price-calculator.styles';

const PriceCalculatorScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = priceCalculatorStyles(colors);
  const localizationText = useLocalization();
  const [amount, setAmount] = useState<number | string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const { transferTypesData } = useConstantData();
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType>(FilterType.Country);

  const renderTransferType = (type: { type: TransactionDetails }) => {
    return (
      <IPayTransactionService
        transaction={type}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
    );
  };

  const dropdownRef = useRef<bottomSheetTypes>(null);

  const openFilterBottomSheet = (filterType: FilterType) => {
    setSelectedFilterType(filterType);
    dropdownRef?.current?.present();
  };

  const closeDropdownBottomSheet = () => {
    dropdownRef?.current?.close();
  };

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedTransferType, setselectedTransferType] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  const getDropdownListData = useCallback(() => {
    switch (selectedFilterType) {
      case FilterType.Country:
        return COUNTRIES_DATA;
      case FilterType.TransferMethod:
        return TRANSFER_METHOD_DATA;
      case FilterType.Currency:
        return CURRENCIES_DATA;
      default:
        return [];
    }
  }, [selectedFilterType]);

  const handleListSelection = useCallback(
    ({ text }: dropDownItem) => {
      switch (selectedFilterType) {
        case FilterType.Country:
          setSelectedCountry(text);
          break;
        case FilterType.TransferMethod:
          setselectedTransferType(text);
          break;
        case FilterType.Currency:
          setSelectedCurrency(text);
          break;
      }
      closeDropdownBottomSheet();
    },
    [selectedFilterType],
  );

  const getDropdownListLabel = useCallback(() => {
    switch (selectedFilterType) {
      case FilterType.Country:
        return localizationText.REPLACE_CARD.COUNTRY;
      case FilterType.TransferMethod:
        return localizationText.COMMON.DELIVERY_TYPE;
      case FilterType.Currency:
        return localizationText.COMMON.CURRENCY;
      default:
        return '';
    }
  }, [selectedFilterType]);

  const getSelected = useCallback(() => {
    switch (selectedFilterType) {
      case FilterType.Country:
        return selectedCountry;
      case FilterType.TransferMethod:
        return selectedTransferType;
      case FilterType.Currency:
        return selectedCurrency;
      default:
        return '';
    }
  }, [selectedFilterType]);
  const handleCurrencyFilter = () => {
    openFilterBottomSheet(FilterType.Currency);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.PRICE_CALCULATOR.TITLE} applyFlex />
      <IPayView style={styles.innerContainer}>
        <IPayView style={styles.gradientView}>
          <IPayAnimatedTextInput
            label={localizationText.REPLACE_CARD.COUNTRY}
            editable={false}
            containerStyle={styles.inputContainerStyle}
            value={selectedCountry}
            showRightIcon
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
            onClearInput={() => openFilterBottomSheet(FilterType.Country)}
          />

          <IPayAnimatedTextInput
            label={localizationText.COMMON.DELIVERY_TYPE}
            editable={false}
            containerStyle={styles.inputContainerStyle}
            value={selectedTransferType}
            showRightIcon
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
            onClearInput={() => openFilterBottomSheet(FilterType.TransferMethod)}
          />

          <IPayAnimatedTextInput
            label={localizationText.COMMON.CURRENCY}
            editable={false}
            containerStyle={styles.inputContainerStyle}
            value={selectedCurrency}
            showRightIcon
            customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
            onClearInput={() => openFilterBottomSheet(FilterType.Currency)}
          />
          <IPayView style={styles.inputContainer}>
            <IPayFootnoteText style={styles.textStyles} text={localizationText.COMMON.FROM} />
            <IPayAmountInput
              style={styles.amountInput}
              inputStyles={styles.inputText}
              currencyStyle={styles.currencyStyle}
              amount={amount}
              onAmountChange={setAmount}
              isEditable={true}
            />
            <IPayPressable onPress={handleCurrencyFilter} style={styles.pressableStyles}>
              <IPaySubHeadlineText text={localizationText.COMMON.SAR} regular={true} />
              <IPayIcon icon={icons.arrow_down} size={18} color={colors.natural.natural1000} />
            </IPayPressable>
          </IPayView>
        </IPayView>
        <IPayView style={styles.cardStyle}>
          <IPayView style={styles.cardText}>
            <IPayCaption1Text style={styles.textColor}>
              {localizationText.PRICE_CALCULATOR.INCLUDES_FEES}
            </IPayCaption1Text>
          </IPayView>
          <IPayToggleButton toggleState={true} />
        </IPayView>
        <IPayFlatlist
          data={transferTypesData}
          renderItem={({ item }) => renderTransferType(item)}
          keyExtractor={(item) => item.recordID}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
        />

        <IPayButton
          btnIconsDisabled
          large
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.PRICE_CALCULATOR.TRANSFER_NOW}
          btnStyle={styles.buttonStyles}
        />
      </IPayView>
      <IPayBottomSheet
        heading={getDropdownListLabel()}
        onCloseBottomSheet={closeDropdownBottomSheet}
        customSnapPoint={SNAP_POINTS.MEDIUM}
        ref={dropdownRef}
        simpleHeader
        simpleBar
        cancelBnt
        doneBtn
        bold
      >
        <IPayListView
          selectedListItem={getSelected()}
          list={getDropdownListData()}
          onPressListItem={handleListSelection}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default PriceCalculatorScreen;
