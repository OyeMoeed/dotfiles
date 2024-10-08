import { IPayCaption2Text } from '@app/components/atoms';
import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import get from 'lodash/get';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { useTranslation } from 'react-i18next';
import IPayAnimatedTextInput from '../../ipay-animated-input-text/ipay-animated-input-text.component';
import IPayCheckboxTitle from '../../ipay-checkbox-title/ipay-chekbox-title.component';
import DynamicFieldRendererProps from './ipay-field-renderer.interface';
import IPayDatePickerSheet from '../../ipay-date-picker-sheet/ipay-date-picker-sheet.component';

const DynamicFieldRenderer: React.FC<DynamicFieldRendererProps> = ({
  field,
  control,
  myIdCheck,
  myIdValue,
  handleParentLovChange,
  watch,
}) => {
  const { t } = useTranslation();

  const customizedLabel = useMemo(() => {
    if (field?.showOptional) {
      return `${field?.label} (${t('COMMON.OPTIONAL')})`;
    }
    return field?.label;
  }, [field?.label, field?.showOptional, t]);

  const renderField = () => {
    // let errorMessage
    // Fetch the error message before the switch statement
    // eslint-disable-next-line no-underscore-dangle
    const errorMessage = get(control?._formState?.errors, `${field?.index}.message`, '');

    if (
      field?.dependent_key &&
      watch?.([field?.dependent_key])?.[0] !== field?.dependent_value &&
      watch?.([field?.dependent_key])?.[0]?.code !== field?.dependent_value
    ) {
      return null;
    }

    switch (field.type) {
      case DYNAMIC_FIELDS_TYPES.LABEL:
        return (
          <Controller
            name={field?.index} // Use the flattened key
            control={control}
            defaultValue={field.value}
            render={({ field: { value } }) => <IPayCaption2Text regular text={value} />}
          />
        );

      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE_WITH_OTHER_OPTION:
      case DYNAMIC_FIELDS_TYPES.ENUMERATION:
      case DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE:
        return (
          <Controller
            name={field?.index}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => (
              <IPayDropdownSelect
                data={field?.lovList || []}
                selectedValue={value}
                label={customizedLabel}
                onSelectListItem={(selectedItem: string | ListItem) => {
                  onChange(selectedItem);
                  if (handleParentLovChange) handleParentLovChange(field.index, selectedItem);
                }}
                isSearchable={field?.isSearchable}
                testID={`${field?.index}-dropdown`}
                labelKey="desc"
                valueKey="code"
                disabled={!field?.lovList ? true : field?.lovList?.length === 0}
                errorMessage={errorMessage as string}
                rightIcon={field?.rightIcon}
                isCountry={field?.isCountry}
                isCurrency={field?.isCurrency}
                returnFullValue={field?.returnFullValue}
              />
            )}
          />
        );
      case DYNAMIC_FIELDS_TYPES.DATE:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_PAST:
      case DYNAMIC_FIELDS_TYPES.GREGORIAN_DATE_FUTURE:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_PAST:
      case DYNAMIC_FIELDS_TYPES.HIJRI_DATE_FUTURE:
        return (
          <Controller
            name={field?.index}
            control={control}
            defaultValue={field.value}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <IPayDatePickerSheet
                maximumDate={field?.maximumDate}
                minimumDate={field?.minimumDate}
                value={value}
                isError={!!get(errors, field?.index)}
                onChange={onChange}
                errorMessage={errorMessage as string}
                label={customizedLabel}
              />
            )}
          />
        );

      case DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE:
        return (
          <Controller
            name={field?.index}
            control={control}
            defaultValue={field.value}
            render={({ field: { value, onChange } }) => (
              <IPayCheckboxTitle
                heading={customizedLabel}
                isCheck={value}
                onPress={() => {
                  onChange(!value);
                }}
              />
            )}
          />
        );

      case DYNAMIC_FIELDS_TYPES.TEXT:
      case DYNAMIC_FIELDS_TYPES.ALPHA_NO_DIGITS:
      case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS:
      case DYNAMIC_FIELDS_TYPES.ENGLISH_CHARACTERS_DIGITS:
      case DYNAMIC_FIELDS_TYPES.NUMBER:
      case DYNAMIC_FIELDS_TYPES.TEXT_ALTERNATIVE_LOV:
      default:
        return (
          <Controller
            name={field?.index} // Use the flattened key
            control={control}
            defaultValue={field.value}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <IPayAnimatedTextInput
                label={customizedLabel}
                value={myIdCheck ? myIdValue : value}
                maxLength={field.maxWidth}
                onChangeText={onChange}
                keyboardType={field?.keyboardType || 'default'}
                isError={!!get(errors, field?.index)}
                editable={!myIdCheck}
                assistiveText={errorMessage as string}
                testID={`${field?.index}-text-input`}
              />
            )}
          />
        );
    }
  };

  return renderField();
};

export default DynamicFieldRenderer;
