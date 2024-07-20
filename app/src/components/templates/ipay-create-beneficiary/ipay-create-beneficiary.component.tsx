import images from '@app/assets/images';
import { IPayFlatlist, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { FormValues, IPayCreateBeneficiaryProps, ListOption } from './ipay-create-beneficiary.interface';
import createBeneficiaryStyles from './ipay-create-beneficiary.style';

/**
 * A component to display add new beneficiary form.
 * @param {string} props.testID - Test ID for testing purposes.
 */
const IPayCreateBeneficiary: React.FC<IPayCreateBeneficiaryProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = createBeneficiaryStyles(colors);
  const localizationText = useLocalization();

  const [beneficiaryData, setBeneficiaryData] = useState<FormValues>();
  const [isBeneficiaryCreated, setIsBeneficiaryCreated] = useState<boolean>(false);

  const generatedData = () => {
    if (beneficiaryData) {
      return Object.entries(beneficiaryData).map(([key, value]) => ({
        key,
        value,
      }));
    }
    return [];
  };

  const onSubmitData = (values: FormValues) => {
    setBeneficiaryData(values);
    setIsBeneficiaryCreated(true);
  };

  const renderTitle = (title: string) => title?.split('_').join(' ');

  const renderItem = (item: ListOption) => {
    const { key, value } = item;
    return (
      <IPayList
        containerStyle={styles.listContainerStyle}
        title={renderTitle(key)}
        textStyle={styles.listTitleText}
        rightText={
          <IPayView testID={key} style={styles.rightTextStyle}>
            <IPaySubHeadlineText color={colors.primary.primary800} regular>
              {value || '-'}
            </IPaySubHeadlineText>
            {key === 'bank_name' && <IPayImage image={images.alinmaBankLogo} style={styles.imgStyle} />}
          </IPayView>
        }
      />
    );
  };

  const validationSchema = yup.object().shape({
    beneficiary_name: yup
      .string()
      .max(50, localizationText.ERROR.TOO_LONG)
      .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE),
    iban: yup
      .string()
      .max(34, localizationText.ERROR.TOO_LONG)
      .required(localizationText.ERROR.REQUIRED_VALIDATION_MESSAGE),
    beneficiary_nick_name: yup.string().max(50, localizationText.ERROR.TOO_LONG),
  });

  return (
    <IPayView testID={testID} style={styles.container}>
      {isBeneficiaryCreated ? (
        <IPayView testID="flatlist" style={styles.beneficiaryContainer}>
          <IPayView style={styles.flatListWrapper}>
            <IPayFlatlist
              style={styles.flatlist}
              data={generatedData()}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item.key.toString()}
            />
          </IPayView>
          <IPayButton
            btnText={localizationText.COMMON.CONFIRM}
            btnType="primary"
            large
            btnIconsDisabled
            btnStyle={styles.btnStyle}
            onPress={() => navigate(ScreenNames.ADD_BENEFICIARY_SUCCESS, {})}
            testID="confirm-btn"
          />
        </IPayView>
      ) : (
        <IPayView testID="new-beneficiary">
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              beneficiary_name: '',
              iban: '',
              bank_name: localizationText.COMMON.ALINMA_BANK,
              beneficiary_nick_name: '',
            }}
            onSubmit={(values) => onSubmitData(values)}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <IPayView style={styles.innerContainer}>
                  <IPayAnimatedTextInput
                    label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NAME}
                    value={values.beneficiary_name}
                    onChangeText={handleChange('beneficiary_name')}
                    containerStyle={styles.inputContainerStyle}
                    isError={!!errors?.beneficiary_name}
                    testID="beneficiary_name"
                    assistiveText={errors?.beneficiary_name && errors?.beneficiary_name}
                  />
                  <IPayAnimatedTextInput
                    label={localizationText.COMMON.IBAN}
                    value={values.iban}
                    onChangeText={handleChange('iban')}
                    containerStyle={styles.inputContainerStyle}
                    testID="iban"
                    isError={!!errors?.iban}
                    assistiveText={errors?.iban && errors?.iban}
                  />
                  <IPayList
                    containerStyle={styles.listContainerStyle}
                    title={localizationText.COMMON.BANK_NAME}
                    rightText={
                      <IPayView style={styles.rightTextStyle}>
                        <IPaySubHeadlineText color={colors.primary.primary800} regular>
                          {localizationText.COMMON.ALINMA_BANK}
                        </IPaySubHeadlineText>
                        <IPayImage image={images.alinmaBankLogo} style={styles.imgStyle} />
                      </IPayView>
                    }
                  />
                  <IPayAnimatedTextInput
                    label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NICK_NAME}
                    value={values.beneficiary_nick_name}
                    onChangeText={handleChange('beneficiary_nick_name')}
                    containerStyle={styles.inputContainerStyle}
                    isError={!!errors?.beneficiary_nick_name}
                    assistiveText={errors?.beneficiary_nick_name && errors?.beneficiary_nick_name}
                  />
                </IPayView>
                <IPayButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  disabled={!values.beneficiary_name || !values.iban}
                  btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
                  btnType="primary"
                  large
                  btnIconsDisabled
                  btnStyle={styles.btnStyle}
                  testID="beneficiary-btn"
                />
              </>
            )}
          </Formik>
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayCreateBeneficiary;
