import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import { KycFormCategories } from '@app/enums/customer-knowledge.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import IPayCustomerKnowledgeDefault from './component/default-component';
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
            <IPayCustomerKnowledgeDefault
              onChangeCategory={onChangeCategory}
              getValues={getValues}
              control={control}
              errors={errors}
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
