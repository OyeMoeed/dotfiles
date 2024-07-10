import React, { useRef, useState } from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayButton, IPayHeader, IPayList, IPayTextInput } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
// eslint-disable-next-line max-len
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import constants from '@app/constants/constants';
import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities/enums.util';
import { ViewStyle } from 'react-native';
import { IPayTermsAndConditions, IPayBottomSheet } from '@app/components/organism';
import { Controller, useForm } from 'react-hook-form';
import replaceCardStyles from './replace-card-choose-address.style';
import { TermsAndConditionsRefTypes, OpenBottomSheetRefTypes } from './replace-card-choose-address.interface';

const COUNTRY = 'Saudi Arabia';
const CITIES = ['Riyadh', 'Al-Khobar', 'Dammam'];
const DISTRICT = 'Al Olaya';

const ReplaceCardChooseAddressScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = replaceCardStyles(colors);
  const localizationText = useLocalization();
  const termsAndConditionSheetRef = useState<TermsAndConditionsRefTypes>();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const openBottomSheet = useRef<OpenBottomSheetRefTypes>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0]);

  const { control } = useForm();

  const searchIcon = <IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />;
  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const onCloseBottomSheet = () => {
    openBottomSheet.current?.close();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD} backBtn applyFlex />
      <IPayView style={styles.contentContainer}>
        <IPayCardDetailsBannerComponent
          containerStyle={styles.zeroMargin}
          cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
          cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
          carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
          cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
        />
        <IPayFootnoteText
          text={localizationText.REPLACE_CARD.CHOOSE_SHIPPING_ADDRESS}
          style={styles.chooseAddressText}
        />
        <IPayList
          containerStyle={styles.countryButtonStyle}
          textStyle={[styles.titleStyle, styles.textGray]}
          subTextStyle={{ ...styles.subTextStyle, ...styles.textGray }}
          title={localizationText.REPLACE_CARD.COUNTRY}
          isShowSubTitle
          subTitle={COUNTRY}
        />
        <IPayList
          onPress={() => openBottomSheet.current?.present()}
          containerStyle={styles.cityDistrict}
          textStyle={styles.titleStyle}
          subTextStyle={styles.subTextStyle}
          title={localizationText.REPLACE_CARD.CITY_NAME}
          isShowSubTitle
          subTitle={selectedCity}
          isShowIcon
          icon={<IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary600} />}
        />
        <IPayList
          containerStyle={styles.cityDistrict}
          textStyle={styles.titleStyle}
          subTextStyle={styles.subTextStyle}
          title={localizationText.REPLACE_CARD.DISTRICT}
          isShowSubTitle
          subTitle={DISTRICT}
        />

        <IPayView style={styles.bottomContainer}>
          <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer as ViewStyle}>
            <IPayView style={styles.termsChildContainer}>
              <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
              <IPayFootnoteText style={styles.termText} text={localizationText.COMMON.TERMS_AND_CONDITIONS_TEXT} />
              <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
            </IPayView>
          </IPayPressable>
          <IPayButton
            large
            btnIconsDisabled
            btnType={buttonVariants.PRIMARY}
            btnText={localizationText.COMMON.CONFIRM}
          />
        </IPayView>
      </IPayView>
      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
      <IPayBottomSheet
        heading={localizationText.REPLACE_CARD.SELECT_CITY}
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '50%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <IPayView style={styles.citySheetContainer}>
          <IPayScrollView style={styles.citySheetContainerChild}>
            <>
              <IPayTextInput
                label=""
                text={search}
                onChangeText={setSearch}
                placeholder={localizationText.search}
                rightIcon={searchIcon}
                simpleInput
                containerStyle={styles.citySearchStyle}
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                  const filteredData = CITIES.filter((key) =>
                    search ? key.toLowerCase().includes(search.toLowerCase()) : true,
                  );

                  if (!filteredData.length) {
                    return (
                      <IPayList
                        title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH}
                        style={styles.listStyle}
                      />
                    );
                  }
                  return filteredData.map((key) => (
                    <IPayList
                      key={key}
                      isShowIcon={value === key}
                      title={key}
                      icon={checkMark}
                      style={styles.listStyle}
                      onPress={() => {
                        setSelectedCity(key);
                        onChange(key);
                        onCloseBottomSheet();
                      }}
                    />
                  ));
                }}
                name="city_name"
              />
            </>
          </IPayScrollView>
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default ReplaceCardChooseAddressScreen;
