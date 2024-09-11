import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayList, IPayTextInput } from '@app/components/molecules';
import { KycFormCategories } from '@app/enums';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IGetLovPayload, LovInfo } from '@app/network/services/core/lov/get-lov.interface';
import getLov from '@app/network/services/core/lov/get-lov.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { spinnerVariant } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm();

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

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

  const setDefaultValues = () => {
    setValue('income_source', incomeSourceKeys.filter((el) => el.code === walletInfo.accountBasicInfo.incomeSource)[0]);
    setValue(
      'monthly_income',
      monthlyIncomeKeys.filter((el) => el.code === walletInfo.accountBasicInfo.monthlyIncomeAmount)[0],
    );
    setValue('employer_name', walletInfo.workDetails.industry);
    setValue('district', walletInfo.addressDetails.district);
    setValue('street_name', walletInfo.addressDetails.street);
    setValue('postal_code', walletInfo.addressDetails.poBox);
    setValue('additional_code', walletInfo.addressDetails.additionalNumber);
    setValue('building_number', walletInfo.addressDetails.buildingNumber);
    setValue('unit_number', walletInfo.addressDetails.unitNumber);
  };

  const getOccupationsLovs = async () => {
    renderSpinner(true);
    const payload: IGetLovPayload = {
      lovType: '36',
    };

    const apiResponse = await getLov(payload);
    if (apiResponse) {
      setOccupationLov(apiResponse?.response?.lovInfo as LovInfo[]);
      setValue(
        'occupation',
        apiResponse?.response?.lovInfo.filter((el) => el.recTypeCode === walletInfo.workDetails.occupation)[0],
      );
    }

    renderSpinner(false);
  };

  const getCitiessLovs = async () => {
    renderSpinner(true);
    const payload: IGetLovPayload = {
      lovType: '6',
    };

    const apiResponse = await getLov(payload);
    if (apiResponse?.status.type === 'SUCCESS') {
      setCitiesLov(apiResponse?.response?.lovInfo as LovInfo[]);
    }
    renderSpinner(false);
    setValue(
      'city_name',
      apiResponse?.response?.lovInfo.filter((el) => el.recTypeCode === walletInfo.userContactInfo.city)[0],
    );
  };

  useEffect(() => {
    getOccupationsLovs();
    getCitiessLovs();
    setDefaultValues();
  }, []);

  useEffect(() => {
    setSearch('');
  }, [category]);

  const onSubmitEvent = (formData: IFormData) => {
    if (onSubmit) onSubmit(formData);
  };

  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;
  const searchIcon = <IPayIcon icon={icons.search2} size={20} color={colors.primary.primary500} />;

  const renderFields = (categoryTypes: string) => {
    switch (categoryTypes) {
      case KycFormCategories.OCCUPATION:
        return (
          <>
            <IPayTextInput
              text={search}
              onChangeText={setSearch}
              placeholder="COMMON.SEARCH"
              rightIcon={searchIcon}
              simpleInput
              containerStyle={styles.searchInputStyle}
              style={styles.inputStyle}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = occupationsLov.filter((item) =>
                  search ? item.recDescription.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return <IPayList title="REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle" />;
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
              placeholder="COMMON.SEARCH"
              rightIcon={searchIcon}
              simpleInput
              containerStyle={[styles.searchInputStyle]}
              style={styles.inputStyle}
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                const filteredData = citiesLov.filter((item) =>
                  search ? item?.recDescription.toLowerCase().includes(search.toLowerCase()) : true,
                );

                if (!filteredData.length) {
                  return <IPayList title="REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle" />;
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
                btnText="COMMON.SAVE"
                large
                btnIconsDisabled
                disabled={!isDirty}
                onPress={handleSubmit(onSubmitEvent)}
              />
            </IPayView>
          </>
        );
    }
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayScrollView showsVerticalScrollIndicator={false}>{renderFields(category)}</IPayScrollView>
    </IPayView>
  );
};

export default IPayCustomerKnowledge;
