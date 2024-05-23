
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Animated, ScrollView, Easing } from 'react-native';
import { isset, calculateHeight } from './ipay-actionsheet-utils';

import useTheme from '@app/styles/theming/theme.hook';
import { IPayFootnoteText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { RightCheck } from '@app/assets/svgs/svg';
import { IPayActionSheetProps } from './ipay-actionsheet-interface';
import styles from './ipay-actionsheet.styles';

const IPayActionSheet = forwardRef<{}, IPayActionSheetProps>(({
  testID,
  onPress = () => { },
  title,
  message,
  options,
  cancelButtonIndex = 0,
  destructiveButtonIndex,
  showIcon = false,
  showCancel = true,
  customImage
}, ref) => {
  const [visible, setVisible] = useState(false);
  const translateY = useRef<number>(700);
  const sheetAnim = useRef(new Animated.Value(translateY.current)).current;
  const scrollEnabledRef = useRef(false);
  const { colors } = useTheme();

  const styles2 = styles(colors);
  useEffect(() => {
    const calculatedHeight = calculateHeight({ options, title, message, cancelButtonIndex, colors, styles2, showIcon, showCancel, scrollEnabledRef });

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
      <IPayView style={styles2.titleBox}>
        {React.isValidElement(title) ? title :
          <IPayFootnoteText text={title} style={styles2.titleText} />
        }
      </IPayView>
    );
  };

  const renderedImage = customImage !== null ? customImage : <></>;


  const renderSvg = () => {
    if (!showIcon) return <></>;
    return (
      <IPayView style={styles2.rightSvg}>
        {renderedImage}
      </IPayView>
    );
  };


  const renderMessage = () => {
    if (!message) return <></>;
    return (
      <IPayView style={styles2.messageBox}>
        {React.isValidElement(message) ? message : <IPayFootnoteText style={styles2.messageText} text={message} regular />}
      </IPayView>
    );
  };

  const renderCancelButton = () => {
    if (!isset(cancelButtonIndex) || !showCancel) return <></>;
    return createButton(options[cancelButtonIndex], cancelButtonIndex);
  };

  const createButton = (title: string, index: number) => {
    const fontColor = destructiveButtonIndex == index ? styles2.destructive : styles2.buttonText;
    const buttonBoxStyle = cancelButtonIndex === index ? styles2.cancelButtonBox : styles2.buttonBox;
    return (
      <IPayPressable
        key={index}
        activeOpacity={1}
        style={buttonBoxStyle}
        onPress={() => hide(index)}
      >
        {React.isValidElement(title) ? title :
          <IPaySubHeadlineText text={title} regular={cancelButtonIndex != index} style={[fontColor]} />
        }
      </IPayPressable>
    );
  };

  const renderOptions = () => {
    return options.map((title, index) => {
      return cancelButtonIndex === index ? null : createButton(title, index);
    });
  };

  return (

    <Modal testID={`${testID}-actionSheet`} visible={visible} animationType="none" transparent onRequestClose={cancel}>
      <IPayView style={[styles2.wrapper]}>
        <IPayPressable style={[styles2.overlay]} onPress={cancel} />
        <Animated.View style={[styles2.body, { height: translateY.current, transform: [{ translateY: sheetAnim }] }]}>
          <IPayView style={styles2.body1}>
            {renderSvg()}
            <IPayView style={styles2.messageFrame}>
              {renderTitle()}
              {renderMessage()}
            </IPayView>

            <ScrollView scrollEnabled={scrollEnabledRef.current}>{renderOptions()}</ScrollView>
          </IPayView>
          <IPayView style={styles2.body2}>
            {renderCancelButton()}
          </IPayView>
        </Animated.View>

      </IPayView>


    </Modal>
  );
});

export default IPayActionSheet;
