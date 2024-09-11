import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDateAndTime } from '@app/utilities/date-helper.util';
import dateTimeFormat from '@app/utilities/date.const';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayLimitExceedProps from './ipay-limit-exceed-bottom-sheet.interface';
import limitExceedStyle from './ipay-limit-exceed-bottom-sheet.style';

/**
 * Pay Limit Exceed Bottom Sheet component.
 *
 * @param {IPayLimitExceedProps} props - The properties for the component.
 * @param {string} [props.testID] - Optional test ID for the component, used for testing purposes.
 * @param {function} [props.handleContinue] - Optional function to handle the continue action.
 * @param {number | string} [props.amount] - Optional amount related to the pay limit exceed.
 * @param {function} [props.close] - Optional function to handle the close action.
 * @param {Date} [props.date] - Optional date related to the pay limit exceed.
 * @param {React.Ref<{}>} ref - Reference to the component.
 *
 * @returns {JSX.Element} The rendered component.
 */

const IPayLimitExceedBottomSheet = forwardRef<{}, IPayLimitExceedProps>(
  ({ testID, handleContinue, close, amount, date }, ref) => {
    const { colors } = useTheme();
    const styles = limitExceedStyle();
    const localizationText = useLocalization();
    const bottomSheetRef = useRef<any>();

    const handleCancel = () => {
      close && close();
      requestAnimationFrame(() => {
        bottomSheetRef.current?.close();
      });
    };
    useImperativeHandle(ref, () => ({
      present: () => {
        bottomSheetRef.current?.present();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));
    return (
      <IPayBottomSheet
        heading={localizationText.HOME.SEND_MONEY}
        enablePanDownToClose
        simpleBar
        ref={bottomSheetRef}
        customSnapPoint={['1%', '55%', '65%']}
        bold
        onCloseBottomSheet={handleCancel}
      >
        <IPayView testID={`${testID}-limit-exceed`} style={styles.container}>
          <IPayView style={styles.detail}>
            <IPayIcon icon={icons.send_money_error} size={64} color={colors.error.error500} />
            <IPayTitle2Text regular={false} style={styles.fontBold} text={'PROFILE.NO_REMAINING_SPENDINDS'} />
            <IPayCaption1Text
              text={`${localizationText.PROFILE.REACHED_SPENDING_LIMIT} ${amount} ${localizationText.COMMON.SAR} ${localizationText.PROFILE.NOT_ABLE_TO_SEND_AMOUNT} [${formatDateAndTime(date, dateTimeFormat.ShortDate)}]`}
              style={styles.description}
              color={colors.primary.primary800}
            />
          </IPayView>
          <IPayView style={styles.actionButtons}>
            <IPayButton medium btnIconsDisabled btnText={'COMMON.CLOSE'} onPress={handleCancel} btnType={'primary'} />
            <IPayButton
              medium
              btnIconsDisabled
              btnText={'COMMON.CONTINUE'}
              onPress={handleContinue}
              btnType={'outline'}
            />
          </IPayView>
        </IPayView>
      </IPayBottomSheet>
    );
  },
);

export default IPayLimitExceedBottomSheet;
