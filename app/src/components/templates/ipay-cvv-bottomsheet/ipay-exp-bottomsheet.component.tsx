import images from '@app/assets/images';
import { IPayCaption1Text, IPayHeadlineText, IPayImage, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { InfoTypes } from '@app/utilities/enums.util';
import { forwardRef } from 'react';
import { IPayExpBottomSheetProps } from './ipay-exp-bottomsheet.interface';
import IPayExpBottomSheetStyles from './ipay-exp-bottomsheet.styles';

const IPayExpBottomSheet = forwardRef<IPayExpBottomSheetProps>(({ testID, type = InfoTypes.CVV }, ref) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPayExpBottomSheetStyles(colors);

  const infoData = {
    [InfoTypes.CVV]: {
      headline: localizationText.cvv_number,
      caption: localizationText.find_cvv,
      image: images.dateCard,
    },
    [InfoTypes.EXPIRY]: {
      headline: localizationText.expDate,
      caption: localizationText.find_exp,
      image: images.cvvCard,
    },
  };

  const currentInfo = infoData[type];
  return (
    <IPayView style={styles.sheetContainer}>
      <IPayView style={styles.half}>
        <IPayHeadlineText regular={false} text={currentInfo.headline} style={styles.headerText} />
        <IPayCaption1Text text={currentInfo.caption} style={styles.subTitleText} />
      </IPayView>
      <IPayView style={[styles.half2, styles.alignRight]}>
        <IPayImage image={currentInfo.image} style={styles.imageStyles} />
      </IPayView>
    </IPayView>
  );
});
export default IPayExpBottomSheet;
