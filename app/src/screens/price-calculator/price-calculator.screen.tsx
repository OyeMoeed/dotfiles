import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayCheckbox,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
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
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { COUNTRIES_DATA, CURRENCIES_DATA, DELIVERY_TYPES_DATA } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import { ConversionDetail } from './price-calculator.interface';
import localTransferStyles from './price-calculator.styles';

const PriceCalculatorScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = localTransferStyles(colors);
  const localizationText = useLocalization();
  const [amount, setAmount] = useState<number | string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const { servicesData } = useConstantData();
  const [selectedFilterType, setSelectedFilterType] = useState<'Country' | 'DeliveryType' | 'Currency'>('Country');

  const renderItem = ({ item }: { item: ConversionDetail }) => {
    const { serviceName, exchangeRate, fees, total, serviceLogo, recordID } = item;
    return (
      <IPayView style={styles.cardStyle}>
        <IPayView style={styles.itemDetails}>
          <IPayView style={styles.rowStyles}>
            <IPayImage image={serviceLogo} style={styles.logoStyles} />
            <IPayFootnoteText style={styles.textColor} regular={false} text={serviceName} />
          </IPayView>
          <IPayView style={[styles.rowStyles]}>
            <IPayCaption2Text
              style={[styles.lightTextColor, styles.chipColor]}
              text={`1 SAR = ${exchangeRate}`}
              regular
            />
            <IPayCaption2Text style={[styles.lightTextColor, styles.chipColor]} text={`Fees: ${fees}`} regular />
          </IPayView>
        </IPayView>
        <IPayView style={styles.rowStyles}>
          <IPayFootnoteText style={styles.textColor} text={total} regular={false} />
          <IPayFootnoteText style={styles.textColor} text={'EGP'} regular />
        </IPayView>
        <IPayCheckbox isCheck={selectedService === recordID} onPress={() => setSelectedService(recordID)} />
      </IPayView>
    );
  };

  const filterRef = useRef<bottomSheetTypes>(null);

  const openFilterBottomSheet = (filterType: 'Country' | 'DeliveryType' | 'Currency') => {
    setSelectedFilterType(filterType);
    filterRef?.current?.present();
  };

  const closeFilterBottomSheet = () => {
    filterRef?.current?.close();
  };

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const getFilterData = () => {
    switch (selectedFilterType) {
      case 'Country':
        return COUNTRIES_DATA;
      case 'DeliveryType':
        return DELIVERY_TYPES_DATA;
      case 'Currency':
        return CURRENCIES_DATA;
      default:
        return [];
    }
  };

  const handleFilterSelect = (item: string) => {
    console.log('selectedFilterType', selectedFilterType);

    switch (selectedFilterType) {
      case 'Country':
        setSelectedCountry(item);
        break;
      case 'DeliveryType':
        setSelectedDeliveryType(item);
        break;
      case 'Currency':
        setSelectedCurrency(item);
        break;
    }
    closeFilterBottomSheet();
  };

  const getFilterLabel = () => {
    switch (selectedFilterType) {
      case 'Country':
        return localizationText.REPLACE_CARD.COUNTRY;
      case 'DeliveryType':
        return localizationText.COMMON.DELIVERY_TYPE;
      case 'Currency':
        return localizationText.COMMON.CURRENCY;
      default:
        return '';
    }
  };

  const getSelected = () => {
    switch (selectedFilterType) {
      case 'Country':
        return selectedCountry;
      case 'DeliveryType':
        return selectedDeliveryType;
      case 'Currency':
        return selectedCurrency;
      default:
        return '';
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.PRICE_CALCULATOR.TITLE} applyFlex />

      <IPayView style={styles.innerContainer}>
        <IPayAnimatedTextInput
          label={localizationText.REPLACE_CARD.COUNTRY}
          editable={false}
          containerStyle={styles.inputContainerStyle}
          value={selectedCountry}
          showRightIcon
          customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
          onClearInput={() => openFilterBottomSheet('Country')}
        />

        <IPayAnimatedTextInput
          label={localizationText.COMMON.DELIVERY_TYPE}
          editable={false}
          containerStyle={styles.inputContainerStyle}
          value={selectedDeliveryType}
          showRightIcon
          customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
          onClearInput={() => openFilterBottomSheet('DeliveryType')}
        />

        <IPayAnimatedTextInput
          label={localizationText.COMMON.CURRENCY}
          editable={false}
          containerStyle={styles.inputContainerStyle}
          value={selectedCurrency}
          showRightIcon
          customIcon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />}
          onClearInput={() => openFilterBottomSheet('Currency')}
        />

        <IPayView style={styles.gradientView}>
          <IPayView style={styles.inputContainer}>
            <IPayFootnoteText style={styles.textStyles} text={localizationText.COMMON.FROM} />
            <IPayAmountInput
              inputStyles={styles.inputText}
              currencyStyle={styles.currencyStyle}
              amount={amount}
              onAmountChange={setAmount}
              isEditable={true}
            />
            <IPayPressable style={{flexDirection:'row', gap:6}}>
              <IPaySubHeadlineText text={'SAR'} regular={true} />
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
          data={servicesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.recordID}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
        />

        <IPayButton
          btnIconsDisabled
          large
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.PRICE_CALCULATOR.TRANSFER_NOW}
        />
      </IPayView>
      <IPayBottomSheet
        heading={getFilterLabel()}
        onCloseBottomSheet={closeFilterBottomSheet}
        customSnapPoint={['20%', '75%']}
        ref={filterRef}
        simpleHeader
        simpleBar
        cancelBnt
        doneBtn
        bold
      >
        <IPayListView selectedListItem={getSelected()} list={getFilterData()} onPressListItem={handleFilterSelect} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default PriceCalculatorScreen;
