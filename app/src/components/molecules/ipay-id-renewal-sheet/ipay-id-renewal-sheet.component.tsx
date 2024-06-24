import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { IPayButton } from '..';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import styles from './ipay-id-renewal-sheet.style';

const IPayIdRenewalSheet: React.FC<IPayIdRenewalSheetProps> = ({ testID, onPress }) => {
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}-base-view`} style={styles.profileContainer}>
      <IPayIcon icon={icons.danger12} size={moderateScale(64)} />
      <IPayTitle2Text style={[styles.titleTextStyle, { textAlign: 'center' }]}>
        {localizationText.id_about_expire}
      </IPayTitle2Text>
      <IPayCaption1Text style={styles.captionTextStyle}>{localizationText.id_updation_des}</IPayCaption1Text>
      <IPayButton
        onPress={onPress}
        btnStyle={styles.buttonStyle}
        btnType="primary"
        btnText={localizationText.remind_me_later}
        textColor={colors.natural.natural0}
        rightIcon={<IPayIcon icon={icons.clock_1} size={moderateScale(20)} color={colors.natural.natural0} />}
      />
      <IPayButton
        onPress={onPress}
        btnStyle={styles.topStyles}
        btnType="link-button"
        btnText={localizationText.dont_show}
        textStyle={styles.skipTextStyle}
        btnIconsDisabled
        btnColor="red"
      />
    </IPayView>
  );
};

export default IPayIdRenewalSheet;
