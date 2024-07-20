import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import { KycFormCategories } from '@app/enums/customer-knowledge.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPayCustomerKnowledgeProps } from './ipay-customer-knowledge.interface';
import customerKnowledgeStyles from './ipay-customer-knowledge.style';

/**
 * A component that contains customer knowledge input fields.
 * @param {IPayCustomerKnowledgeProps} props - The props for the IPayInput component.
 * @param {string} testID - test ID for testing purposes.
 * @param {string} category - category used to identify which category form to display
 * @param {function} onChangeCategory - is used to perform any action on change category.
 * @returns {JSX.Element} - The rendered component.
 */

const IPayCustomerKnowledge: React.FC<IPayCustomerKnowledgeProps> = ({
  testID,
  category = KycFormCategories.CUSTOMER_KNOWLEDGE,
  onChangeCategory,
  onSubmit,
}: IPayCustomerKnowledgeProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = customerKnowledgeStyles(colors);
  const [search, setSearch] = useState<string>('');

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitEvent = () => {
    if (onSubmit) onSubmit();
  };

  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
  const searchIcon = <IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />;
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />;

  const occupationKeys: Array<string> = [
    localizationText.KYC.GOVT_EMPLOYEE,
    localizationText.KYC.PRIVATE_SECTOR_EMPLOYEE,
    localizationText.KYC.FREELANCER,
    localizationText.KYC.INVESTOR,
    localizationText.KYC.UNEMPLOYED,
    localizationText.KYC.DIPLOMATIC_EMPLOYEE,
  ];

  const incomeSourceKeys: Array<string> = [
    localizationText.KYC.SALARIES,
    localizationText.KYC.STOCKS,
    localizationText.KYC.TRADE,
    localizationText.KYC.OTHER,
  ];

  const monthlyIncomeKeys: Array<string> = [
    `0 ${localizationText.COMMON.TO} 4999`,
    `5000 ${localizationText.COMMON.TO} 8999`,
    `9000 ${localizationText.COMMON.TO} 14999`,
    `${localizationText.COMMON.MORE_THAN} 19999`,
  ];

  const selectCityKeys: Array<string> = [
    localizationText.CITY.RIYADH,
    localizationText.CITY.AL_KHOBAR,
    localizationText.CITY.DAMMAM,
  ];

  const renderFields = (categoryTypes: string) => {
    switch (categoryTypes) {
      case KycFormCategories.OCCUPATION:
        return (
          <>
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              placeholder={localizationText.COMMON.SEARCH}
              rightIcon={searchIcon}
              simpleInput
              containerStyle={[styles.searchInputStyle]}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = occupationKeys.filter((key) =>
                  search ? key.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return (
                    <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
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
                      onChange(key);
                      if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                    }}
                  />
                ));
              }}
              name="occupation"
            />
          </>
        );
        break;
      case KycFormCategories.INCOME_SOURCE:
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) =>
              incomeSourceKeys.map((key) => (
                <IPayList
                  key={key}
                  isShowIcon={value === key}
                  title={key}
                  icon={checkMark}
                  style={styles.listStyle}
                  onPress={() => {
                    onChange(key);
                    if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                  }}
                />
              ))
            }
            name="income_source"
          />
        );
        break;
      case KycFormCategories.MONTHLY_INCOME:
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) =>
              monthlyIncomeKeys.map((key) => (
                <IPayList
                  key={key}
                  isShowIcon={value === key}
                  title={key}
                  icon={checkMark}
                  style={styles.listStyle}
                  onPress={() => {
                    onChange(key);
                    if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                  }}
                />
              ))
            }
            name="monthly_income"
          />
        );
        break;
      case KycFormCategories.SELECT_CITY:
        return (
          <>
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              placeholder={localizationText.COMMON.SEARCH}
              rightIcon={searchIcon}
              simpleInput
              containerStyle={[styles.searchInputStyle]}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = selectCityKeys.filter((key) =>
                  search ? key.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return (
                    <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
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
                      onChange(key);
                      if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                    }}
                  />
                ));
              }}
              name="city_name"
            />
          </>
        );
        break;
      default:
        return (
          <>
            <IPayText text={localizationText.PROFILE.EMPLOYMENT_DETAILS} style={styles.heading} varient="natural" />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.OCCUPATION}
                  editable={false}
                  value={getValues('occupation')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.OCCUPATION)}
                  isError={!!errors?.occupation}
                  assistiveText={errors?.occupation && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="occupation"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.EMPLOYEE_NAME}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.employee_name}
                  assistiveText={errors?.employee_name && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="employee_name"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.INCOME_SOURCE}
                  editable={false}
                  value={getValues('income_source')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.INCOME_SOURCE)}
                  isError={!!errors?.income_source}
                  assistiveText={errors?.income_source && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="income_source"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.MONTHLY_INCOME}
                  editable={false}
                  value={getValues('monthly_income')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.MONTHLY_INCOME)}
                  isError={!!errors?.monthly_income}
                  assistiveText={errors?.monthly_income && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="monthly_income"
            />
            <IPayText
              text={localizationText.PROFILE.NATIONAL_ADDRESS_DETAILS}
              varient="natural"
              style={styles.heading}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.CITY_NAME}
                  editable={false}
                  value={getValues('city_name')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.SELECT_CITY)}
                  isError={!!errors?.city_name}
                  assistiveText={errors?.city_name && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="city_name"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.DISTRICT}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.district}
                  assistiveText={errors?.district && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="district"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.STREET_NAME}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.district}
                  assistiveText={errors?.district && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="street_name"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.POSTAL_CODE}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.postal_code}
                  assistiveText={errors?.postal_code && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="postal_code"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.ADDITIONAL_CODE}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.additional_code}
                  assistiveText={errors?.additional_code && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="additional_code"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.BUILDING_NUMBER}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.building_number}
                  assistiveText={errors?.building_number && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="building_number"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.PROFILE.UNIT_NUMBER}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.unit_number}
                  assistiveText={errors?.unit_number && localizationText.COMMON.REQUIRED_FIELD}
                />
              )}
              name="unit_number"
            />
            <IPayView style={styles.buttonWrapper}>
              <IPayButton
                btnType="primary"
                btnText={localizationText.COMMON.SAVE}
                large
                btnIconsDisabled
                onPress={handleSubmit(onSubmitEvent)}
              />
            </IPayView>
          </>
        );
    }
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView style={styles.main}>{renderFields(category)}</IPayScrollView>
    </IPayView>
  );
};

export default IPayCustomerKnowledge;
