import React from 'react';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import styles from './ipay-id-renewal-sheet.style';
import { IPayIdRenewalSheetProps } from './ipay-id-renewal-sheet.interface';
import { IPayButton } from '..';
import useLocalization from '@app/localization/hooks/localization.hook';
import images from '@app/assets/images';
import { moderateScale } from 'react-native-size-matters';
import icons from '@app/assets/icons';

const IPayIdRenewalSheet: React.FC<IPayIdRenewalSheetProps> = ({ testID, onPress }) => {
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}-base-view`} style={styles.profileContainer}>
      <IPayIcon icon={icons.danger} size={moderateScale(64)} />
      <IPayTitle2Text style={[styles.titleTextStyle, { textAlign: 'center' }]}>
        {localizationText.id_updation_title}
      </IPayTitle2Text>
      <IPayCaption1Text style={styles.captionTextStyle}>{localizationText.id_updation_des}</IPayCaption1Text>
      <IPayButton
        onPress={onPress}
        btnStyle={styles.buttonStyle}
        btnType="primary"
        btnText={localizationText.remind_me_later}
        textStyle={styles.bodyTextStyle}
        rightIcon={<IPayIcon icon={icons.clock_1} size={moderateScale(20)} />}
      />
       <IPayButton
        onPress={onPress}
        btnStyle={[styles.buttonStyle,styles.skipBtnStyle]}
        btnType="outline"
        btnText={localizationText.skip}
        textStyle={styles.skipTextStyle}
        btnIconsDisabled
        btnColor='red'
      />
    </IPayView>
  );
};

export default IPayIdRenewalSheet;
