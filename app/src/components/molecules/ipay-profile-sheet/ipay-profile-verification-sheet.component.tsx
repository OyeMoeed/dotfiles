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
      <IPayImage image={images.userRemoveImage} style={styles.userRemoveImageStyle} />
      <IPayTitle2Text style={styles.titleTextStyle}>{localizationText.HOME.COMPLETE_YOUR_PROFILE}</IPayTitle2Text>
      <IPayCaption1Text style={styles.captionTextStyle}>
        {localizationText.HOME.YOU_NEED_TO_COMPLETE_YOUR_PROFILE}
      </IPayCaption1Text>
      <IPayList
        leftIcon={<IPayImage style={styles.imageNifazStyle} image={images.nifaz} />}
        detailTextStyle={[
          styles.detailTextStyle,
          { color: verified ? colors.tertiary.tertiary500 : colors.primary.primary500 },
        ]}
        title="COMMON.INDENTITY_VERIFICATION"
        isShowLeftIcon
        detailText={verified ? localizationText.COMMON.VERIFIED : localizationText.COMMON.VERIFY}
        isShowIcon={!verified} // Show icon only if verified is false
        icon={<IPayIcon icon="arrow-right" size={20} color={colors.primary.primary500} />}
        onPressIcon={verified ? undefined : onPress} // Call the function to open the verification sheet
      />
      <IPayList
        leftIcon={<IPayIcon icon="document" size={18} color={colors.primary.primary500} />}
        detailTextStyle={verified ? styles.detailTextStyle : [styles.detailTextStyle, styles.completTextStyle]}
        title="PROFILE.CUSTOMER_KNOWLEDGE_FORM"
        isShowLeftIcon
        detailText="PROFILE.COMPLETE"
        isShowIcon
        icon={
          <IPayIcon
            icon="arrow-right"
            size={20}
            color={verified ? colors.primary.primary500 : colors.natural.natural300}
          />
        }
        onPressIcon={verified ? onPress : undefined}
      />
    </IPayView>
  );
};
export default IPayProfileVerificationSheet;
