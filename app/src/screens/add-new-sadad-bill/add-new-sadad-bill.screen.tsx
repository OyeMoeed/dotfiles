import { IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPaySadadBillDetailForm } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import { IPayBillBalance, IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import * as Yup from 'yup';
import { FormValues } from './add-new-sadad-bill.interface';
import addSadadBillStyles from './add-new-sadad-bill.style';

const AddNewSadadBillScreen = ({ route }: any) => {
  const { selectedBill } = route.params;
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = addSadadBillStyles(colors);

  const { companyName, serviceType } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    companyName,
    serviceType,
  });

  const onSubmit = () => {};

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="sadad-bill-ipay-header"
        backBtn
        title={localizationText.NEW_SADAD_BILLS.NEW_SADAD_BILLS}
        titleStyle={styles.headerText}
        applyFlex
      />
      {selectedBill ? (
        <IPayView style={styles.contentContainer}>
          <IPayBillBalance selectedBill={selectedBill} />
        </IPayView>
      ) : (
        <IPayFormProvider<FormValues>
          validationSchema={validationSchema}
          defaultValues={{ companyName: '', serviceType: '' }}
        >
          {({ handleSubmit }) => (
            <IPayView style={styles.contentContainer}>
              <IPaySadadBillDetailForm />
              <IPayButton
                btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
                btnType="primary"
                onPress={handleSubmit(onSubmit)}
                large
                btnIconsDisabled
                disabled
              />
            </IPayView>
          )}
        </IPayFormProvider>
      )}
    </IPaySafeAreaView>
  );
};

export default AddNewSadadBillScreen;
