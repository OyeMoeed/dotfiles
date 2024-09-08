import { IPayScrollView, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayFormProvider from '../ipay-form-provider/ipay-form-provider.component';
import useDynamicForm from './ipay-dynamic-form.hook';
import DynamicFormComponentProps from './ipay-dynamic-form.interface';
import dynamicFormoStyles from './ipay-dynamic-form.styles';
import DynamicFieldRenderer from './ipay-field-renderer/ipay-field-renderer.component';

const DynamicFormComponent: React.FC<DynamicFormComponentProps> = ({ billerId, serviceId, walletNumber }) => {
  const { fields, defaultValues, validationSchema } = useDynamicForm(billerId, serviceId, walletNumber);
  const localization = useLocalization();
  const styles = dynamicFormoStyles();

  const onSubmit = (data: any) => {};

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
