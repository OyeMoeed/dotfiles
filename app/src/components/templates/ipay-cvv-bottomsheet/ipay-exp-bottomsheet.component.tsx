import { GradientCard } from "@app/assets/svgs";
import { IPayCaption1Text, IPayHeadlineText, IPayView } from "@app/components/atoms";
import useLocalization from "@app/localization/hooks/localization.hook";
import useTheme from "@app/styles/hooks/theme.hook";
import { forwardRef } from "react";
import { IPayExpBottomSheetProps } from "./ipay-exp-bottomsheet.interface";
import IPayExpBottomSheetStyles from "./ipay-exp-bottomsheet.styles";

const IPayExpBottomSheet = forwardRef<IPayExpBottomSheetProps>(({ testID }, ref) => {
  const localizationText = useLocalization()
  const { colors } = useTheme()
  const styles = IPayExpBottomSheetStyles(colors)
  return (
    <IPayView style={styles.sheetContainer}>
      <IPayView>
      
        <IPayHeadlineText text={localizationText.expDate} style={styles.headerText} />
        <IPayCaption1Text text={localizationText.find_exp} style={styles.subTitleText} />
      </IPayView>
      <GradientCard />
    </IPayView>
  );
})
export default IPayExpBottomSheet;
