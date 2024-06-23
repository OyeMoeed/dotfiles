import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayText } from '@app/components/atoms/index';
import { IPayAnimatedTextInput, IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';

import icons from '@app/assets/icons';
import { kycFormCategories } from '@app/enums/customer-knowledge.enum';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPayCustomerKnowledgeProps } from './ipay-customer-knowledge.interface';
import customerKnowledgeStyles from './ipay-customer-knowledge.style';

const IPayCustomerKnowledge: React.FC<IPayCustomerKnowledgeProps> = ({
  testID,
  category = kycFormCategories.CUSTOMER_KNOWLEDGE,
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
    onSubmit && onSubmit();
  };

  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={25} color={colors.primary.primary500} />;
  const searchIcon = <IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />;
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />;

  const occupationKeys: Array<string> = [
    'govt_employee',
    'private_sector_employee',
    'freelancer',
    'investor',
    'unemployed',
    'diplomatic_employee',
  ];

  const incomeSourceKeys: Array<string> = ['salaries', 'stocks', 'trade', 'other'];

  const monthlyIncomeKeys: Array<string> = [
    `0 ${localizationText.to} 4999`,
    `5000 ${localizationText.to} 8999`,
    `9000 ${localizationText.to} 14999`,
    `${localizationText.more_than} 19999`,
  ];

  const selectCityKeys: Array<string> = ['Riyadh', 'Al-Khobar', 'Dammam'];

  const renderFields = (value: string) => {
    switch (value) {
      case kycFormCategories.OCCUPATION:
        return (
          <>
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              placeholder={localizationText.search}
              rightIcon={searchIcon}
              simpleInput
              containerStyle={[styles.searchInputStyle]}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = occupationKeys.filter((key) => {
                  return search ? key.toLowerCase().includes(search.toLowerCase()) : true;
                });

                if (!filteredData.length) {
                  return <IPayList title={localizationText.no_data_for_given_search} style={styles.listStyle} />;
                }
                return filteredData.map((key) => (
                  <IPayList
                    key={key}
                    isShowIcon={value === localizationText[key]}
                    title={localizationText[key]}
                    icon={checkMark}
                    style={styles.listStyle}
                    onPress={() => {
                      onChange(localizationText[key]);
                      onChangeCategory && onChangeCategory(kycFormCategories.CUSTOMER_KNOWLEDGE);
                    }}
                  />
                ));
              }}
              name="occupation"
            />
          </>
        );
        break;
      case kycFormCategories.INCOME_SOURCE:
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) =>
              incomeSourceKeys.map((key) => (
                <IPayList
                  key={key}
                  isShowIcon={value === localizationText[key]}
                  title={localizationText[key]}
                  icon={checkMark}
                  style={styles.listStyle}
                  onPress={() => {
                    onChange(localizationText[key]);
                    onChangeCategory && onChangeCategory(kycFormCategories.CUSTOMER_KNOWLEDGE);
                  }}
                />
              ))
            }
            name="income_source"
          />
        );
        break;
      case kycFormCategories.MONTHLY_INCOME:
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
                    onChangeCategory && onChangeCategory(kycFormCategories.CUSTOMER_KNOWLEDGE);
                  }}
                />
              ))
            }
            name="monthly_income"
          />
        );
        break;
      case kycFormCategories.SELECT_CITY:
        return (
          <>
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              placeholder={localizationText.search}
              rightIcon={searchIcon}
              simpleInput
              containerStyle={[styles.searchInputStyle]}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = selectCityKeys.filter((key) => {
                  return search ? key.toLowerCase().includes(search.toLowerCase()) : true;
                });

                if (!filteredData.length) {
                  return <IPayList title={localizationText.no_data_for_given_search} style={styles.listStyle} />;
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
                      onChangeCategory && onChangeCategory(kycFormCategories.CUSTOMER_KNOWLEDGE);
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
            <IPayText text={localizationText.employment_details} style={styles.heading} varient="natural" />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => {
                return (
                  <IPayAnimatedTextInput
                    label={localizationText.occupation}
                    editable={false}
                    value={getValues('occupation')}
                    containerStyle={styles.inputContainerStyle}
                    showRightIcon
                    customIcon={listCheckIcon}
                    onClearInput={() => onChangeCategory && onChangeCategory(kycFormCategories.OCCUPATION)}
                    isError={!!errors?.occupation}
                    assistiveText={errors?.occupation && localizationText.required_validation_message}
                  />
                );
              }}
              name="occupation"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.employee_name}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.employee_name}
                  assistiveText={errors?.employee_name && localizationText.required_validation_message}
                />
              )}
              name="employee_name"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.income_source}
                  editable={false}
                  value={getValues('income_source')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(kycFormCategories.INCOME_SOURCE)}
                  isError={!!errors?.income_source}
                  assistiveText={errors?.income_source && localizationText.required_validation_message}
                />
              )}
              name="income_source"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.monthly_income}
                  editable={false}
                  value={getValues('monthly_income')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(kycFormCategories.MONTHLY_INCOME)}
                  isError={!!errors?.monthly_income}
                  assistiveText={errors?.monthly_income && localizationText.required_validation_message}
                />
              )}
              name="monthly_income"
            />
            <IPayText text={localizationText.national_address_details} varient="natural" style={styles.heading} />
            <Controller
              control={control}
              rules={{ required: true }}
              render={() => (
                <IPayAnimatedTextInput
                  label={localizationText.city_name}
                  editable={false}
                  value={getValues('city_name')}
                  containerStyle={styles.inputContainerStyle}
                  showRightIcon
                  customIcon={listCheckIcon}
                  onClearInput={() => onChangeCategory && onChangeCategory(kycFormCategories.SELECT_CITY)}
                  isError={!!errors?.city_name}
                  assistiveText={errors?.city_name && localizationText.required_validation_message}
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
                  label={localizationText.district}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.district}
                  assistiveText={errors?.district && localizationText.required_validation_message}
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
                  label={localizationText.street_name}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.district}
                  assistiveText={errors?.district && localizationText.required_validation_message}
                />
              )}
              name="street_name"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <IPayAnimatedTextInput
                  label={localizationText.postal_code}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.postal_code}
                  assistiveText={errors?.postal_code && localizationText.required_validation_message}
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
                  label={localizationText.additional_code}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.additional_code}
                  assistiveText={errors?.additional_code && localizationText.required_validation_message}
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
                  label={localizationText.building_number}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.building_number}
                  assistiveText={errors?.building_number && localizationText.required_validation_message}
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
                  label={localizationText.unit_number}
                  editable
                  value={value}
                  onChangeText={onChange}
                  containerStyle={styles.inputContainerStyle}
                  isError={!!errors?.unit_number}
                  assistiveText={errors?.unit_number && localizationText.required_validation_message}
                />
              )}
              name="unit_number"
            />
            <IPayView style={styles.buttonWrapper}>
              <IPayButton
                btnType="primary"
                btnText={localizationText.save}
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
