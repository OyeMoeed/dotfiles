import React from 'react';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import styles from './ipay-profile-verification-sheet.style';
import IPayList from '../ipay-list/ipay-list.component';
import images from '@app/assets/images';
import { IPayProfileVerificationSheetProps } from './ipay-profile-verification-sheet.interface';
import colors from '@app/styles/colors.const';
import useLocalization from '@app/localization/hooks/localization.hook';
import { moderateScale } from 'react-native-size-matters';

const IPayProfileVerificationSheet: React.FC<IPayProfileVerificationSheetProps> = ({ testID, onPress, verified }) => {
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}`} style={[styles.profileContainer]}>
      <IPayImage image={images.userRemoveImage} style={styles.userRemoveImageStyle} />
      <IPayTitle2Text style={[styles.titleTextStyle]}>{localizationText.complete_profile_title}</IPayTitle2Text>
      <IPayCaption1Text style={[styles.captionTextStyle]}>{localizationText.complete_profile_des}</IPayCaption1Text>
      <IPayList
        containerStyle={styles.listContainerStyle}
        leftIcon={<IPayImage style={styles.imageNifazStyle} image={images.nifaz} />}
        detailTextStyle={[styles.detailTextStyle, { color: verified ? '#5DBE24' : colors.primary.primary500 }]}
        textStyle={styles.headinTextStyle}
        title={localizationText.Identity_Verification}
        isShowLeftIcon
        isShowDetail
        detailText={verified ? localizationText.verified : localizationText.verify}
        isShowIcon={!verified} // Show icon only if verified is false
        icon={<IPayIcon icon={'arrow-right'} size={moderateScale(14)} />}
        onPress={verified ? undefined : onPress} // Call the function to open the verification sheet
      />
      <IPayList
        leftIcon={<IPayIcon icon={'document'} size={moderateScale(24)} />}
        detailTextStyle={verified ? styles.detailTextStyle : [styles.detailTextStyle, styles.completTextStyle]}
        textStyle={styles.headinTextStyle}
        title={localizationText.customer_knowledge_form}
        isShowLeftIcon
        isShowDetail
        detailText={localizationText.complete}
        isShowIcon
        icon={
          verified ? (
            <IPayIcon icon={'arrow-right'} size={moderateScale(14)} />
          ) : (
            <IPayIcon icon={'arrow-right'} size={moderateScale(14)} />
          )
        }
        onPress={verified ? onPress : undefined}
      />
    </IPayView>
  );
};

export default IPayProfileVerificationSheet;
