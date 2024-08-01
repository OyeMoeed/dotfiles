import { IPayCaption1Text, IPayTitle2Text, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import { ContentNotFoundProps } from './ipay-content-not-found.interface';
import contentNotFoundStyles from './ipay-content-not-found.style';

/**
 * ContentNotFoundProps
 *
 * @param {string} title - The title text to be displayed at the top.
 * @param {string} [message] - Optional message text to be displayed below the title.
 * @param {() => void} [onBtnPress] - Optional callback function to be called when the button is pressed.
 * @param {React.JSX.Element} [icon] - Optional icon element to be displayed.
 * @param {string} [btnText] - Optional text to be displayed on the button.
 * @param {StyleProp<ViewStyle>} [btnStyle] - Optional style for the button.
 * @param {boolean} [isShowButton] - Optional flag to control button visibility.
 *
 */
const IPayContentNotFound: FC<ContentNotFoundProps> = ({
  title,
  message,
  onBtnPress,
  btnText,
  icon,
  btnStyle,
  isShowButton,
  testID,
}) => {
  const { colors } = useTheme();
  const styles = contentNotFoundStyles(colors);

  return (
    <IPayView style={styles.sheetContentWrapper}>
      {icon && icon}
      <IPayView style={styles.textWrapper}>
        <IPayTitle2Text testID={`${testID}-title`} style={styles.darkColor} regular={false} text={title} />
        <IPayCaption1Text testID={`${testID}-message`} style={styles.messageText} text={message} />
      </IPayView>
      {isShowButton && (
        <IPayButton
          btnText={btnText}
          btnStyle={[styles.btnStyle, btnStyle]}
          btnIconsDisabled
          btnType="primary"
          large
          onPress={onBtnPress}
          testID={`${testID}-button`}
        />
      )}
    </IPayView>
  );
};

export default IPayContentNotFound;
