import { IPayActionSheet } from '@app/components/organism';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SadadBillsActionSheetProps } from './sadad-bills-action-sheet.interface';

const SadadBillsActionSheet = forwardRef<{}, SadadBillsActionSheetProps>(({ actionSheetOptions }, ref) => {
  const {
    title,
    showIcon,
    customImage,
    message,
    options,
    cancelButtonIndex,
    showCancel,
    destructiveButtonIndex,
    onPress,
    styles,
  } = actionSheetOptions;

  const sadadActionSheetRef = useRef<any>(null);

  const showActionSheet = () => {
    sadadActionSheetRef.current.show();
  };

  const hideActionSheet = () => {
    sadadActionSheetRef.current.hide();
  };

  useImperativeHandle(ref, () => ({
    show: showActionSheet,
    hide: hideActionSheet,
  }));

  return (
    <IPayActionSheet
      ref={sadadActionSheetRef}
      title={title}
      showIcon={showIcon}
      customImage={customImage}
      message={message}
      options={options}
      cancelButtonIndex={cancelButtonIndex}
      showCancel={showCancel}
      destructiveButtonIndex={destructiveButtonIndex}
      onPress={onPress}
      bodyStyle={styles}
    />
  );
});

export default SadadBillsActionSheet;
