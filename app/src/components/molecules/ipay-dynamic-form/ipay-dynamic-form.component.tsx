import { IPayScrollView, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayFormProvider from '../ipay-form-provider/ipay-form-provider.component';
import useDynamicForm from './ipay-dynamic-form.hook';
import DynamicFormComponentProps from './ipay-dynamic-form.interface';
import dynamicFormoStyles from './ipay-dynamic-form.styles';
import DynamicFieldRenderer from './ipay-field-renderer/ipay-field-renderer.component';

const DynamicFormComponent: React.FC<DynamicFormComponentProps> = ({ billerId, serviceId, walletNumber, onPress }) => {
  const [fields, setFields] = useState<DynamicField[]>([]);
  const localization = useLocalization();
  const styles = dynamicFormoStyles();

  useEffect(() => {
    const fetchFields = async () => {
      const response = await getDynamicFieldsService(billerId, serviceId, walletNumber);
      if (response) {
        const fetchedFields = response.response.dynamicFields;
        setFields(fetchedFields);
      }
    };
    fetchFields();
  }, [billerId, serviceId, walletNumber]);

  // Initialize the form hook with fetched fields
  const { defaultValues, validationSchema, revertFlatKeys } = useDynamicForm(fields);

  const onSubmit = (data: any) => {
    // Api Returns nested object , which we first convert to flat object and handles everything
    // then revert it back to origional state
    const originalData = revertFlatKeys(data);

    return originalData;
  };
  if (!fields.length) {
    return null;
  }

  return (
    <IPayFormProvider validationSchema={validationSchema} defaultValues={defaultValues}>
      {({ handleSubmit, control, formState: { errors } }) => (
        <IPayView style={styles.dynamicFieldContainer}>
          <IPayScrollView>
            <>
              {fields.map((field) => (
                <IPayView key={field.index} style={styles.dynamicFieldRenderer}>
                  <DynamicFieldRenderer key={field.index} field={field} control={control} errors={errors} />
                </IPayView>
              ))}
              <IPayButton
                btnType={buttonVariants.PRIMARY}
                onPress={handleSubmit(onSubmit)}
                medium
                btnText={localization.COMMON.DONE}
              />
            </>
          </IPayScrollView>
        </IPayView>
      )}
    </IPayFormProvider>
  );
};

export default DynamicFormComponent;
