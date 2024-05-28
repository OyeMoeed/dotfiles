import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, Modal, ScrollView } from 'react-native';

import { IPayFootnoteText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/theming/theme.hook';
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

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    const show = () => {
      setVisible(true);
      showSheet();
    };

    const hide = (index: number) => {
      hideSheet(() => {
        setVisible(false);
        onPress(index);
      });
    };

    const cancel = () => {
      if (isset(cancelButtonIndex)) {
        hide(cancelButtonIndex);
      }
    };

    const showSheet = () => {
      Animated.timing(sheetAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    };

    const hideSheet = (callback: () => void) => {
      Animated.timing(sheetAnim, {
        toValue: translateY.current,
        duration: 200,
        useNativeDriver: true,
      }).start(callback);
    };

    const renderTitle = () => {
      if (!title) return <></>;
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
            <IPayFootnoteText style={sheetStyles.messageText} text={message} regular />
          )}
        </IPayView>
      );
    };

    const renderCancelButton = () => {
      if (!isset(cancelButtonIndex) || !showCancel) return <></>;
      return createButton(options[cancelButtonIndex], cancelButtonIndex);
    };

    const createButton = (title: string, index: number) => {
      const fontColor = destructiveButtonIndex == index ? sheetStyles.destructive : sheetStyles.buttonText;
      const buttonBoxStyle = cancelButtonIndex === index ? sheetStyles.cancelButtonBox : sheetStyles.buttonBox;
      return (
        <IPayPressable key={index} activeOpacity={1} style={buttonBoxStyle} onPress={() => hide(index)}>
          {React.isValidElement(title) ? (
            title
          ) : (
            <IPaySubHeadlineText text={title} regular={cancelButtonIndex != index} style={[fontColor]} />
          )}
        </IPayPressable>
      );
    };

    const renderOptions = () =>
      options.map((title, index) => (cancelButtonIndex === index ? null : createButton(title, index)));

    return (
      <Modal
        testID={`${testID}-actionSheet`}
        visible={visible}
        animationType="none"
        transparent
        onRequestClose={cancel}
      >
        <IPayView style={[sheetStyles.wrapper]}>
          <IPayPressable style={[sheetStyles.overlay]} onPress={cancel} />
          <Animated.View
            style={[sheetStyles.body, { height: translateY.current, transform: [{ translateY: sheetAnim }] }]}
          >
            <IPayView style={sheetStyles.body1}>
              {renderSvg()}
              <IPayView style={sheetStyles.messageFrame}>
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
