import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import transactionDetailsCompStyles from './transaction-details-component.style';
import { EditBeneficiaryProps } from './transction-details-component.interface';

const EditBeneficiary: React.FC<EditBeneficiaryProps> = ({ testID, style, beneficiary, onPressEditBeneficiary }) => {
  const { colors } = useTheme();
  const styles = transactionDetailsCompStyles(colors);
  const localizationText = useLocalization();
  const [beneficiaryName, setBeneficiaryName] = useState<string>('');

  useEffect(() => {
    if (beneficiary) setBeneficiaryName(beneficiary);
  }, [beneficiary]);

  const onPress = () => {
    onPressEditBeneficiary?.(beneficiaryName);
  };

  return (
    <IPayView testID={`${testID}-edit-beneficiary`} style={[styles.editBeneficiaryView, style]}>
      <IPayView style={styles.editBeneficiaryCautionView}>
        <IPayIcon icon={icons.info_circle2} size={24} color={colors.primary.primary800} />
        <IPayFootnoteText
          text={'TRANSACTION_HISTORY.MAKE_SURE_BENEFICIARY_NAME_MATCHES_ID'}
          style={styles.editBeneficiaryInfoText}
        />
      </IPayView>

      <IPayAnimatedTextInput
        value={beneficiaryName}
        onChangeText={setBeneficiaryName}
        label={localizationText.NEW_BENEFICIARY.BENEFECIARY_NAME}
        containerStyle={styles.editBeneficiaryInputText}
      />
      <IPayButton
        onPress={onPress}
        btnType={buttonVariants.PRIMARY}
        large
        btnIconsDisabled
        btnText={localizationText.PROFILE.SAVE_CHANGES}
      />
    </IPayView>
  );
};

export default EditBeneficiary;
