import icons from '@app/assets/icons';
import { IPayIcon, IPayText } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import { STANDARD_TEXT_INPUT_MAX_LENGTH } from '@app/constants/app-validations';
import { KycFormCategories } from '@app/enums';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { Controller } from 'react-hook-form';
import customerKnowledgeStyles from '../ipay-customer-knowledge.style';
import IPayCustomerKnowledgeDefaultProps from './default-component.interface';
import { useTranslation } from 'react-i18next';

const IPayCustomerKnowledgeDefault: React.FC<IPayCustomerKnowledgeDefaultProps> = ({
  control,
  getValues,
  onChangeCategory,
  errors,
}) => {
  const { colors } = useTheme();
  const styles = customerKnowledgeStyles(colors);
  const { t } = useTranslation();

  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />;

  return (
    <>
      <IPayText text="PROFILE.EMPLOYMENT_DETAILS" style={styles.heading} varient="natural" />
      <Controller
        control={control}
        rules={{ required: true }}
        render={() => (
          <IPayAnimatedTextInput
            label="PROFILE.OCCUPATION"
            editable={false}
            value={getValues('occupation')?.recDescription}
            containerStyle={styles.inputContainerStyle}
            showRightIcon
            customIcon={listCheckIcon}
            onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.OCCUPATION)}
            isError={!!errors?.occupation}
            assistiveText={errors?.occupation && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="occupation"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.EMPLOYER_NAME"
            editable
            value={value}
            onChangeText={onChange}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.employer_name}
            assistiveText={errors?.employer_name && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="employer_name"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={() => (
          <IPayAnimatedTextInput
            label="PROFILE.INCOME_SOURCE"
            editable={false}
            value={getValues('income_source')?.desc}
            containerStyle={styles.inputContainerStyle}
            showRightIcon
            customIcon={listCheckIcon}
            onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.INCOME_SOURCE)}
            isError={!!errors?.income_source}
            assistiveText={errors?.income_source && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="income_source"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={() => (
          <IPayAnimatedTextInput
            label="PROFILE.MONTHLY_INCOME"
            editable={false}
            value={getValues('monthly_income')?.desc}
            containerStyle={styles.inputContainerStyle}
            showRightIcon
            customIcon={listCheckIcon}
            onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.MONTHLY_INCOME)}
            isError={!!errors?.monthly_income}
            assistiveText={errors?.monthly_income && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="monthly_income"
      />
      <IPayText text="PROFILE.NATIONAL_ADDRESS_DETAILS" varient="natural" style={styles.heading} />
      <Controller
        control={control}
        rules={{ required: true }}
        render={() => (
          <IPayAnimatedTextInput
            label="PROFILE.CITY_NAME"
            editable={false}
            value={getValues('city_name')?.recDescription}
            containerStyle={styles.inputContainerStyle}
            showRightIcon
            customIcon={listCheckIcon}
            onClearInput={() => onChangeCategory && onChangeCategory(KycFormCategories.SELECT_CITY)}
            isError={!!errors?.city_name}
            assistiveText={errors?.city_name && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="city_name"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.DISTRICT"
            editable
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            value={value}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.district}
            assistiveText={errors?.district && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="district"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.STREET_NAME"
            editable
            value={value}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.street_name}
            assistiveText={errors?.street_name && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="street_name"
      />
      <Controller
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.POSTAL_CODE"
            editable
            value={value}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.postal_code}
            assistiveText={errors?.postal_code && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="postal_code"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.ADDITIONAL_CODE"
            editable
            value={value}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.additional_code}
            assistiveText={errors?.additional_code && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="additional_code"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.BUILDING_NUMBER"
            editable
            value={value}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.building_number}
            assistiveText={errors?.building_number && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="building_number"
      />
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, value } }) => (
          <IPayAnimatedTextInput
            label="PROFILE.UNIT_NUMBER"
            editable
            value={value}
            maxLength={STANDARD_TEXT_INPUT_MAX_LENGTH}
            onChangeText={onChange}
            containerStyle={styles.inputContainerStyle}
            isError={!!errors?.unit_number}
            assistiveText={errors?.unit_number && t('COMMON.REQUIRED_FIELD')}
          />
        )}
        name="unit_number"
      />
    </>
  );
};

export default IPayCustomerKnowledgeDefault;
