import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayAddCardBottomsheet } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { buttonVariants } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayExpiredCardSheetProps from './ipay-expired-card-sheet.interface';
import styles from './ipay-expired-card-sheet.styles';

const IPayExpiredCardSheet = forwardRef<any, IPayExpiredCardSheetProps>(
  ({ openExpirationBottomSheet, openExpiredDateBottomSheet, openCvvBottomSheet, selectedDate, selectedCard }, ref) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const bottomSheetRef = useRef<any>();

    const [customSnapPoints, setCustomSnapPoints] = useState<string[]>(['50%', '55%']);

    const sheetStyles = styles(colors);
    const [showEdit, setShowEdit] = useState(false);

    const onEditPress = () => {
      setShowEdit(true);
      setCustomSnapPoints?.(['60%', '70%']);
    };

    const handleSkip = () => {
      setShowEdit(false);
      setTimeout(() => {
        bottomSheetRef?.current?.close();
      }, 100);
    };

    const handleCancel = () => {
      setShowEdit(false);
      handleSkip();
    };

    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
        setCustomSnapPoints(['50%', '55%']);
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    return (
      <IPayBottomSheet
        heading={showEdit ? t('MENU.EDIT_CARD') : t('COMMON.CARD_EXPIRED')}
        enablePanDownToClose
        simpleBar
        ref={bottomSheetRef}
        customSnapPoint={customSnapPoints}
        bold
        onCloseBottomSheet={handleCancel}
      >
        {showEdit ? (
          <IPayAddCardBottomsheet
            selectedCard={selectedCard}
            expiryOnPress={openExpirationBottomSheet}
            openExpiredDateBottomSheet={openExpiredDateBottomSheet}
            cvvPress={openCvvBottomSheet}
            selectedDate={selectedDate}
            isEditingMode
            closeBottomSheet={handleSkip}
          />
        ) : (
          <IPayView style={sheetStyles.container}>
            <IPayView style={sheetStyles.topAlign}>
              <IPayIcon icon={icons.cardSlash1} size={64} />
              <IPayTitle2Text regular={false} style={sheetStyles.weights} text="TOP_UP.CARD_HAS_EXPIRED" />
              <IPayCaption1Text text="TOP_UP.INFO_EDIT_CARD" color={colors.primary.primary800} />
            </IPayView>
            <IPayView style={sheetStyles.bottomAlign}>
              <IPayButton
                large
                btnIconsDisabled
                btnText="TOP_UP.EDIT_CARD"
                onPress={onEditPress}
                btnType={buttonVariants.PRIMARY}
              />
              <IPayButton
                large
                btnIconsDisabled
                btnText="COMMON.CANCEL"
                onPress={handleCancel}
                btnType={buttonVariants.OUTLINED}
              />
            </IPayView>
          </IPayView>
        )}
      </IPayBottomSheet>
    );
  },
);

export default IPayExpiredCardSheet;
