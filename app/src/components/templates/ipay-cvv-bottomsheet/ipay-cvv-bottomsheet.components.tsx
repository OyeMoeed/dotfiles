import { GradientCvv } from '@app/assets/svgs';
import { IPayCaption1Text, IPayHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef } from 'react';
import { IPayCvvBottomSheetProps } from './ipay-cvv-bottomsheet.interface';
import IPayCvvBottomSheetStyles from './ipay-cvv-bottomsheet.styles';

const IPayCvvBottomSheet = forwardRef<IPayCvvBottomSheetProps>(({ testID }, ref) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = IPayCvvBottomSheetStyles(colors);
  return (
    <IPayView style={styles.sheetContainer}>
      <IPayView>
        <IPayHeadlineText text={localizationText.cvv_number} style={styles.headerText} />
        <IPayCaption1Text text={localizationText.find_cvv} style={styles.subTitleText} />
      </IPayView>
      <GradientCvv />
    </IPayView>
  );
});
export default IPayCvvBottomSheet;
