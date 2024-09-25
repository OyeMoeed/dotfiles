import { IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, Modal, ScrollView } from 'react-native';

import { IPayButton } from '@app/components/molecules';
import { buttonVariants } from '@app/utilities/enums.util';
import { IPayActionSheetProps } from './ipay-actionsheet-interface';
import { calculateHeight, isset } from './ipay-actionsheet-utils';
import styles from './ipay-actionsheet.styles';

const IPayActionSheet = forwardRef<{}, IPayActionSheetProps>(
  (
    {
      testID,
      onPress = () => {},
      title,
      message,
      options,
      cancelButtonIndex = 0,
      destructiveButtonIndex,
      showIcon = false,
      showCancel = true,
      customImage,
      bodyStyle,
      buttonStyle,
      cancelButtonStyle,
      messageStyle,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const translateY = useRef<number>(700);
    const sheetAnim = useRef(new Animated.Value(translateY.current)).current;
    const scrollEnabledRef = useRef(false);
    const { colors } = useTheme();

    const sheetStyles = styles(colors);
    useEffect(() => {
      const calculatedHeight = calculateHeight({
        options,
        title,
        message,
        cancelButtonIndex,
        colors,
        sheetStyles,
        showIcon,
        showCancel,
        scrollEnabledRef,
      });

      translateY.current = calculatedHeight;
      sheetAnim.setValue(calculatedHeight);
    }, [options, title, message, cancelButtonIndex, sheetAnim]);

    const showSheet = () => {
      Animated.timing(sheetAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    };

    const show = () => {
      setVisible(true);
      showSheet();
    };

    const hideSheet = (callback: () => void) => {
      Animated.timing(sheetAnim, {
        toValue: translateY.current,
        duration: 200,
        useNativeDriver: true,
      }).start(callback);
    };

    const hide = () => {
      hideSheet(() => {
        setVisible(false);
      });
    };

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    const cancel = () => {
      if (isset(cancelButtonIndex)) {
        hide();
      }
    };

    const renderTitle = () => {
      if (!title) return null;
      return (
        <IPayView style={sheetStyles.titleBox}>
          {React.isValidElement(title) ? title : <IPayFootnoteText text={title} style={sheetStyles.titleText} />}
        </IPayView>
      );
    };

    const renderedImage = customImage !== null && customImage;

    const renderSvg = () => {
      if (!showIcon) return null;
      return <IPayView style={sheetStyles.rightSvg}>{renderedImage}</IPayView>;
    };

    const renderMessage = () => {
      if (!message) return null;
      return (
        <IPayView style={sheetStyles.messageBox}>
          {React.isValidElement(message) ? (
            message
          ) : (
            <IPayFootnoteText style={[sheetStyles.messageText, messageStyle]} text={message} regular />
          )}
        </IPayView>
      );
    };

    const createButton = (key: string, buttonText: string, index: number) => {
      const btnTextColor = destructiveButtonIndex === index ? colors.error.error500 : colors.primary.primary500;
      const btnBackground = cancelButtonIndex === index ? colors.backgrounds.greyOverlay : colors.natural.natural0;
      const btnStyle = cancelButtonIndex === index ? sheetStyles.cancelSpacing : sheetStyles.innerSpacing;

      return (
        <IPayButton
          key={key}
          onPress={() => onPress(index)}
          btnType={buttonVariants.PRIMARY}
          btnText={buttonText}
          large
          textStyle={cancelButtonIndex === index && sheetStyles.bold}
          btnIconsDisabled
          btnStyle={[btnStyle, buttonStyle, cancelButtonIndex === index && cancelButtonStyle]}
          textColor={btnTextColor}
          btnColor={btnBackground}
        />
      );
    };

    const renderCancelButton = () => {
      if (!isset(cancelButtonIndex) || !showCancel) return null;
      return createButton('cancel-button', options?.[cancelButtonIndex] || '', cancelButtonIndex);
    };

    const renderOptions = () =>
      options?.map((optionsTitle, index) =>
        cancelButtonIndex === index ? null : createButton(`${index}-button`, optionsTitle, index),
      );

    return (
      <Modal
        testID={`${testID}-actionSheet`}
        visible={visible}
        animationType="none"
        transparent
        onRequestClose={cancel}
      >
        <IPayView style={sheetStyles.wrapper}>
          <IPayPressable style={sheetStyles.overlay} onPress={cancel} />
          <Animated.View
            style={[
              sheetStyles.body,
              { height: translateY.current, transform: [{ translateY: sheetAnim }] },
              bodyStyle,
            ]}
          >
            <IPayView style={sheetStyles.body1}>
              {renderSvg()}
              <IPayView style={[sheetStyles.messageFrame, !title && !message && sheetStyles.emptyMessageFrame]}>
                {renderTitle()}
                {renderMessage()}
              </IPayView>

              <ScrollView scrollEnabled={scrollEnabledRef.current}>{renderOptions()}</ScrollView>
            </IPayView>
            <IPayView style={sheetStyles.cancelBody}>{renderCancelButton()}</IPayView>
          </Animated.View>
        </IPayView>
      </Modal>
    );
  },
);

export default IPayActionSheet;
