import images from '@app/assets/images';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayProfileVerificationSheetProps } from './ipay-profile-verification-sheet.interface';
import styles from './ipay-profile-verification-sheet.style';

const IPayProfileVerificationSheet: React.FC<IPayProfileVerificationSheetProps> = ({ testID, onPress, verified }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  return (
    <IPayView testID={`${testID}-base-view`} style={styles.profileContainer}>
      <IPayIcon icon="user-remove" />
      <IPayTitle2Text style={styles.titleTextStyle}>{localizationText.complete_your_profile}</IPayTitle2Text>
      <IPayCaption1Text style={styles.captionTextStyle}>
        {localizationText.you_need_to_complete_your_profile}
      </IPayCaption1Text>
      <IPayList
        leftIcon={<IPayImage style={styles.imageNifazStyle} image={images.nifaz} />}
        detailTextStyle={[
          styles.detailTextStyle,
          { color: verified ? colors.tertiary.tertiary500 : colors.primary.primary500 }
        ]}
        title={localizationText.identity_verification}
        isShowLeftIcon
        isShowDetail
        detailText={verified ? localizationText.verified : localizationText.verify}
        isShowIcon={!verified} // Show icon only if verified is false
        icon={<IPayIcon icon={'arrow-right'} size={20} color={colors.primary.primary500} />}
        onPress={verified ? undefined : onPress} // Call the function to open the verification sheet
      />
      <IPayList
        leftIcon={<IPayIcon icon={'document'} size={18} color={colors.primary.primary500} />}
        detailTextStyle={verified ? styles.detailTextStyle : [styles.detailTextStyle, styles.completTextStyle]}
        title={localizationText.customer_knowledge_form}
        isShowLeftIcon
        isShowDetail
        detailText={localizationText.complete}
        isShowIcon
        icon={
          verified ? (
            <IPayIcon icon={'arrow-right'} size={20} color={colors.primary.primary500} />
          ) : (
            <IPayIcon icon={'arrow-right'} size={20} color={colors.natural.natural300} />
          )
        }
        onPress={verified ? onPress : undefined}
      />
    </IPayView>
  );
};
export default IPayProfileVerificationSheet;
