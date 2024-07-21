import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import { KycFormCategories } from '@app/enums/customer-knowledge.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IGetLovPayload, LovInfo } from '@app/network/services/core/lov/get-lov.interface';
import getLov from '@app/network/services/core/lov/get-lov.service';
import IPayCustomerKnowledgeDefault from './component/default-component';
import { IFormData, IPayCustomerKnowledgeProps } from './ipay-customer-knowledge.interface';
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
  const [occupationsLov, setOccupationLov] = useState<LovInfo[]>([]);
  const [citiesLov, setCitiesLov] = useState<LovInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);

  const getOccupationsLovs = async () => {
    setIsLoading(true);
    const payload: IGetLovPayload = {
      lovType: '36',
    };

    const apiResponse = await getLov(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      setOccupationLov(apiResponse?.response?.lovInfo as LovInfo[]);
    }
    setIsLoading(false);
  };

  const getCitiessLovs = async () => {
    setIsLoadingCities(true);
    const payload: IGetLovPayload = {
      lovType: '6',
    };

    const apiResponse = await getLov(payload);
    if (apiResponse.status.type === 'SUCCESS') {
      setCitiesLov(apiResponse?.response?.lovInfo as LovInfo[]);
    }
    setIsLoadingCities(false);
  };

  useEffect(() => {
    getOccupationsLovs();
    getCitiessLovs();
  }, []);

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitEvent = (formData: IFormData) => {
    if (onSubmit) onSubmit(formData);
  };

  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
  const searchIcon = <IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />;

  const incomeSourceKeys: Array<{ code: string; desc: string }> = [
    { code: 'Payroll', desc: localizationText.KYC.SALARIES },
    { code: 'Stock', desc: localizationText.KYC.STOCKS },
    { code: 'Trading', desc: localizationText.KYC.TRADE },
    { code: 'Other', desc: localizationText.KYC.OTHER },
  ];

  const monthlyIncomeKeys: Array<{ code: string; desc: string }> = [
    { code: '1', desc: `0 ${localizationText.COMMON.TO} 4999` },
    { code: '2', desc: `5000 ${localizationText.COMMON.TO} 8999` },
    { code: '3', desc: `9000 ${localizationText.COMMON.TO} 13999` },
    { code: '4', desc: `14000 ${localizationText.COMMON.TO} 19999` },
    { code: '5', desc: `${localizationText.COMMON.MORE_THAN} 19999` },
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
                const filteredData = occupationsLov.filter((item) =>
                  search ? item.recDescription.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return (
                    <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
                  );
                }
                return (
                  <>
                    {filteredData.map((item) => (
                      <IPayList
                        key={item?.recTypeCode}
                        isShowIcon={value?.recTypeCode === item?.recTypeCode}
                        title={item?.recDescription}
                        icon={checkMark}
                        style={styles.listStyle}
                        onPress={() => {
                          onChange(item);
                          if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                        }}
                      />
                    ))}
                  </>
                );
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
            render={({ field: { onChange, value } }) => (
              <>
                {incomeSourceKeys.map((item) => (
                  <IPayList
                    key={item?.code}
                    isShowIcon={value?.code === item?.code}
                    title={item?.desc}
                    icon={checkMark}
                    style={styles.listStyle}
                    onPress={() => {
                      onChange(item);
                      if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                    }}
                  />
                ))}
              </>
            )}
            name="income_source"
          />
        );
        break;
      case KycFormCategories.MONTHLY_INCOME:
        return (
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                {monthlyIncomeKeys.map((item) => (
                  <IPayList
                    key={item?.code}
                    isShowIcon={value?.code === item?.code}
                    title={item?.desc}
                    icon={checkMark}
                    style={styles.listStyle}
                    onPress={() => {
                      onChange(item);
                      if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                    }}
                  />
                ))}
              </>
            )}
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
                const filteredData = citiesLov.filter((item) =>
                  search ? item?.recDescription.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return (
                    <IPayList title={localizationText.REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle} />
                  );
                }
                return (
                  <>
                    {filteredData.map((item) => (
                      <IPayList
                        key={item?.recTypeCode}
                        isShowIcon={value?.recTypeCode === item?.recTypeCode}
                        title={item?.recDescription}
                        icon={checkMark}
                        style={styles.listStyle}
                        onPress={() => {
                          onChange(item);
                          if (onChangeCategory) onChangeCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
                        }}
                      />
                    ))}
                  </>
                );
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
      {(isLoading || isLoadingCities) && <IPaySpinner testID="spinnerForKyc" />}
      <IPayScrollView style={styles.main}>{renderFields(category)}</IPayScrollView>
    </IPayView>
  );
};

export default IPayCustomerKnowledge;
