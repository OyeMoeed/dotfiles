import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayPrimaryButton } from '@app/components/molecules';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import { scale } from 'react-native-size-matters';
import IPayCardIssuanceSheetStyle from './ipay-card-issaunce-sheet.style';

const IPayCardIssuanceSheet = forwardRef((_, ref: ForwardedRef<BottomSheetModal>) => {
  const { colors } = useTheme();
  const styles = IPayCardIssuanceSheetStyle();

  const onDetailsPress = useCallback(() => {
    if (!!ref && 'current' in ref) {
      ref?.current?.close?.();
    }
    navigate(ScreenNames.VIRTUAL_CARD);
  }, [ref]);

  return (
    <IPayPortalBottomSheet
      noGradient
      heading="TRANSACTION_HISTORY.CARD_ISSUANCE"
      onCloseBottomSheet={() => {}}
      customSnapPoint={['75%']}
      ref={ref}
      enablePanDownToClose
      simpleHeader
      simpleBar
      bold
      cancelBnt
      isVisible
      defaultIndex={-1}
    >
      <IPayImage
        image={images.cardIssuance}
        style={{
          width: scale(312),
          height: scale(267),
        }}
      />
      <IPayView style={styles.bodyContainer}>
        <IPayTitle2Text
          style={[styles.topTitle, styles.alignTextCenter]}
          text="CARD_ISSUANCE_SHEET.REGULAR_TITLE"
          regular
        />
        <IPayTitle2Text text="CARD_ISSUANCE_SHEET.BOLD_TITLE" style={styles.alignTextCenter} regular={false} />
        <IPayCaption1Text
          text="CARD_ISSUANCE_SHEET.DESCRIPTION"
          style={[styles.descriprtionText, styles.alignTextCenter]}
        />
        <IPayPrimaryButton
          large
          btnText="VIRTUAL_CARD.VIEW_DETAILS"
          onPress={onDetailsPress}
          rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPayPortalBottomSheet>
  );
});

export default IPayCardIssuanceSheet;
