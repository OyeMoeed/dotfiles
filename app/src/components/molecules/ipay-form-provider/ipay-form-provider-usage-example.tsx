import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { IPayView, IPayScrollView, IPayFootnoteText } from '@app/components/atoms';
import {
  IPayRHFAnimatedTextInput as IPayAnimatedTextInput,
  IPayButton,
  IPayDropdownComponent,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services';

interface FormValues {
  mobileNumber: string;
  iqamaId: string;
  city: string;
}

const ExampleFormProviderUsage = () => {
  const localizationText = useLocalization();
  const [searchText, setSearchText] = useState<string>('');

  const onSubmit: SubmitHandler<FormValues> = () => {};

  const cities = constants.CITIES;

  const { mobileNumberSchema, iqamaIdSchema, city } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    mobileNumber: mobileNumberSchema,
    iqamaId: iqamaIdSchema,
    city,
  });

  return (
    <IPayFormProvider<FormValues>
      validationSchema={validationSchema}
      defaultValues={{ mobileNumber: '', iqamaId: '', city: '' }}
    >
      {({ handleSubmit, control, formState: { errors } }) => (
        <IPayView>
          <IPayScrollView showsVerticalScrollIndicator={false}>
            <>
              {/* This is an Example of TextInput With RHF( React Hook Form Integrated ) */}
              <IPayAnimatedTextInput
                name="mobileNumber"
                label="PROFILE.MOBILE_NUMBER"
                editable
                keyboardType="phone-pad"
                maxLength={constants.MOBILE_NUMBER_LENGTH}
              />
              {errors.mobileNumber && <IPayFootnoteText text={errors.mobileNumber.message} />}

              <IPayAnimatedTextInput
                name="iqamaId"
                label="COMMON.ID_IQAMA"
                editable
                keyboardType="number-pad"
                maxLength={constants.IQAMA_ID_NUMBER_LENGTH}
              />
              {errors.iqamaId && <IPayFootnoteText text={errors.iqamaId.message} />}

              {/* This is an Example of Dropdown , This approach can be used for ANY library component, or any component that does not have React Hook Form */}
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange } }) => (
                  <>
                    <IPayDropdownComponent
                      testID="city-dropdown"
                      list={cities}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      onSelectListItem={(selectedItem: string) => onChange(selectedItem)}
                    />
                    {errors.city && <IPayFootnoteText text={errors.city.message} />}
                  </>
                )}
              />

              <IPayButton onPress={handleSubmit(onSubmit)} btnText="COMMON.NEXT" />
            </>
          </IPayScrollView>
        </IPayView>
      )}
    </IPayFormProvider>
  );
};

export default ExampleFormProviderUsage;
