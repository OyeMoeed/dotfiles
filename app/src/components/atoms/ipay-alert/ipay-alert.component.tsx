import { TickSquare, Warning } from '@app/assets/svgs';
import { IPayBodyText, IPayFootnoteText, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { Modal } from 'react-native';
import IPayOverlay from '../ipay-overlay/ipay-overlay.component';
import { IPayAlertProps } from './ipay-alert.interface';
import alertStyles from './ipay-alert.styles';

const IPayAlert: React.FC<IPayAlertProps> = ({
  testID,
  title,
  message,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  variant = alertVariant.DEFAULT,
  showIcon = true,
  visible = true,
  onClose,
  closeOnTouchOutside = false,
  type = alertType.DEFAULT,
  animationType = 'fade',
}) => {
  const { colors } = useTheme();
  const styles = alertStyles(colors);

  const getButtonStyles = (isFilled: boolean) => {
    const color = variant === alertVariant.DESTRUCTIVE ? colors.redPalette.red500 : colors.primary.primary500;
    return isFilled ? { backgroundColor: color, color: 'white' } : {};
  };

  return (
    <Modal testID={testID} animationType={animationType} transparent visible={visible} onRequestClose={onClose}>
      <IPayView style={styles.flexStyles}>
        <IPayOverlay onPress={closeOnTouchOutside ? onClose : undefined} />
        <IPayView style={styles.centeredView}>
          <IPayView style={styles.modalView}>
            {showIcon && <>{variant === alertVariant.DEFAULT ? <TickSquare /> : <Warning />}</>}
            <IPayView style={styles.textsView}>
              {title && <IPayBodyText text={title} style={styles.modalTitle} />}
              {message && <IPayFootnoteText regular text={message} style={styles.modalMessage} />}
            </IPayView>
            <IPayView style={type === alertType.SIDE_BY_SIDE ? styles.sideBySideContainer : styles.buttonContainer}>
              {primaryAction && (
                <IPayButton
                  medium
                  leftIcon
                  style={[
                    type === alertType.SIDE_BY_SIDE ? styles.flexStyles : null,
                    getButtonStyles(type !== alertType.SIDE_BY_SIDE),
                  ]}
                  btnText={primaryAction.text}
                  onPress={primaryAction.onPress}
                  buttonTextStyle={type === alertType.SIDE_BY_SIDE ? styles.buttonTextColored : styles.buttonTextWhite}
                  btnType={type === alertType.SIDE_BY_SIDE ? buttonVariants.OUTLINED : buttonVariants.PRIMARY}
                />
              )}
              {secondaryAction && (
                <IPayButton
                  medium
                  leftIcon
                  style={[
                    type === alertType.SIDE_BY_SIDE ? styles.flexStyles : null,
                    getButtonStyles(type === alertType.SIDE_BY_SIDE),
                  ]}
                  btnText={secondaryAction.text}
                  onPress={secondaryAction.onPress}
                  buttonTextStyle={type === alertType.SIDE_BY_SIDE ? styles.buttonTextWhite : styles.buttonTextColored}
                  btnType={type === alertType.SIDE_BY_SIDE ? buttonVariants.PRIMARY : buttonVariants.OUTLINED}
                />
              )}
              {tertiaryAction && (
                <IPayButton
                  btnType={buttonVariants.OUTLINED}
                  medium
                  leftIcon
                  onPress={tertiaryAction.onPress}
                  btnText={tertiaryAction.text}
                  buttonTextStyle={type === alertType.SIDE_BY_SIDE ? styles.buttonTextWhite : styles.buttonTextColored}
                  style={[type === alertType.SIDE_BY_SIDE ? styles.flexStyles : null, getButtonStyles(false)]}
                />
              )}
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>
    </Modal>
  );
};

export default IPayAlert;
