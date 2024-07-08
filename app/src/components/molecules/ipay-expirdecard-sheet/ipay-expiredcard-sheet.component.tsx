import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayAddCardBottomsheet } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayExpiredCardSheetProps from './ipay-expiredcard-sheet.interface';
import styles from './ipay-expiredcard-sheet.styles';

const IPayExpiredCardSheet = forwardRef<any, IPayExpiredCardSheetProps>(
  ({ testID, openExpirationBottomSheet, openExpiredDateBottomSheet, openCvvBottomSheet, selectedDate }, ref) => {
    const { colors } = useTheme();
    const sheetStyles = styles(colors);
    const localizationText = useLocalization();
    const [showEdit, setShowEdit] = useState(false);
    const onEditPress = () => {
      setShowEdit(true);
      setCustomSnapPoints(['50%', '65%']);
    };
    const handleCancel = () => {
      setShowEdit(false);

      handleSkip();
    };

    const handleSkip = () => {
      setShowEdit(false);
      setTimeout(() => {
        bottomSheetRef.current?.close();
      }, 100);
    };
    const bottomSheetRef = useRef<any>();
    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
        setCustomSnapPoints(['40%', '50%', '80%']);
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['40%', '50%', '80%']);
    return (
      <IPayBottomSheet
        heading={showEdit ? localizationText.MENU.EDIT_CARD : localizationText.card_expired}
        enablePanDownToClose
        simpleBar
        ref={bottomSheetRef}
        customSnapPoint={customSnapPoints}
        bold
        onCloseBottomSheet={handleCancel}
      >
        {showEdit ? (
          <IPayAddCardBottomsheet
            expiryOnPress={openExpirationBottomSheet}
            openExpiredDateBottomSheet={openExpiredDateBottomSheet}
            cvvPress={openCvvBottomSheet}
            selectedDate={selectedDate}
            isEditingMode
          />
        ) : (
          <IPayView style={sheetStyles.container}>
            <IPayView style={sheetStyles.topAlign}>
              <IPayIcon icon={icons.cardSlash1} size={64} />
              <IPayTitle2Text regular={false} style={sheetStyles.weights} text={localizationText.card_has_expired} />
              <IPayCaption1Text text={localizationText.infoEditCard} color={colors.primary.primary800} />
            </IPayView>
            <IPayView style={sheetStyles.bottomAlign}>
              <IPayButton
                medium
                btnIconsDisabled
                btnText={localizationText.MENU.EDIT_CARD}
                onPress={onEditPress}
                btnType={'primary'}
              />
              <IPayButton
                medium
                btnIconsDisabled
                btnText={localizationText.COMMON.CANCEL}
                onPress={handleCancel}
                btnType={'outline'}
              />
            </IPayView>
          </IPayView>
        )}
      </IPayBottomSheet>
    );
  },
);

export default IPayExpiredCardSheet;
