import React, { useCallback, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import cardOptionsStyles from './card-options.style';
import CardOptionsIPayListToggle from './card-options-ipaylist-toggle';
import CardOptionsIPayListDescription from './card-options-ipaylist-description';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import ChangeCardPin from '../change-card-pin/change-card-pin.screens';

import { toastTypes } from '@app/utilities/enums.util';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@components/templates';
import { IPayHeader, IPayList } from '@app/components/molecules';
import { IPayFootnoteText, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { navigate } from '@app/navigation/navigation-service.navigation';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import screenNames from '@app/navigation/screen-names.navigation';
import { ChangePinRefTypes, OpenBottomSheetRefTypes, DeleteCardSheetRefTypes } from './card-options.interface';

const CardOptionsScreen: React.FC = () => {
  const { colors } = useTheme();

  const changePinRef = useRef<ChangePinRefTypes>(null);
  const openBottomSheet = useRef<OpenBottomSheetRefTypes>(null);
  const deleteCardSheetRef = useRef<DeleteCardSheetRefTypes>({
    hide() {},
    show() {},
  });

  const localizationText = useLocalization();
  const { showToast } = useToastContext();

  const styles = cardOptionsStyles(colors);

  const [isOnlinePurchase, setIsOnlinePurchase] = useState(false);
  const [isATMWithDraw, setIsATMWithDraw] = useState(false);

  const renderToast = (title: string, isOn: boolean, icon: string) => {
    showToast({
      title: title,
      subTitle: `${constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE.toUpperCase()} ${localizationText.CARD_OPTIONS.DEBIT_CARD}  - *** ${constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}`,
      containerStyle: styles.toastContainerStyle,
      leftIcon: <IPayIcon icon={icon} size={24} color={colors.natural.natural0} />,
      toastType: isOn ? toastTypes.SUCCESS : toastTypes.WARNING,
    });
  };

  const toggleOnlinePurchase = (isOn: boolean) => {
    setIsOnlinePurchase((prev) => !prev);
    renderToast(
      isOn
        ? localizationText.CARD_OPTIONS.ONLINE_PURCHASE_ENABLED
        : localizationText.CARD_OPTIONS.ONLINE_PURCHASE_DISABLED,
      isOn,
      icons.receipt_item,
    );
  };

  const toggleATMWithdraw = (isOn: boolean) => {
    setIsATMWithDraw((prev) => !prev);
    renderToast(
      isOn ? localizationText.CARD_OPTIONS.ATM_WITHDRAW_ENABLED : localizationText.CARD_OPTIONS.ATM_WITHDRAW_DISABLED,
      isOn,
      icons.moneys,
    );
  };

  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };

  const onConfirmDeleteCard = () => {};
  const hideDeleteCardSheet = () => {
    deleteCardSheetRef.current.hide();
  };
  const showDeleteCardSheet = () => {
    deleteCardSheetRef.current.show();
  };

  const onClickDeleteCardSheet = useCallback((index: number) => {
    switch (index) {
      case 0:
        hideDeleteCardSheet();
        break;
      case 1:
        onConfirmDeleteCard();
        break;
      default:
        break;
    }
  }, []);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_OPTIONS.CARD_OPTIONS} backBtn applyFlex />
      <IPayScrollView style={styles.scrollView}>
        <IPayView>
          <IPayCardDetailsBannerComponent
            cardType={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE}
            cardTypeName={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
            carHolderName={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
            cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.CARD_OPTIONS.CARD_SERVICES} />

          <CardOptionsIPayListDescription
            leftIcon={icons.LOCK}
            rightIcon={icons.edit_2}
            title={localizationText.CARD_OPTIONS.PIN_CODE}
            subTitle={localizationText.CARD_OPTIONS.FOUR_DIGIT_PIN}
            detailText={localizationText.CARD_OPTIONS.CHANGE}
            onPress={() => {
              openBottomSheet.current?.present();
            }}
          />

          <CardOptionsIPayListDescription
            leftIcon={icons.task}
            rightIcon={icons.arrow_right_1}
            title={localizationText.CARD_OPTIONS.CARD_FEATURES}
            subTitle={localizationText.CARD_OPTIONS.LEARN_MORE_ABOUT_FEATURE}
            onPress={() => {}}
          />

          <CardOptionsIPayListDescription
            leftIcon={icons.card_pos}
            rightIcon={icons.arrow_right_1}
            title={localizationText.CARD_OPTIONS.REPLACE_THE_CARD}
            subTitle={localizationText.CARD_OPTIONS.CARD_REPLACEMENT_INCLUDES}
            onPress={() => {}}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.CARD_OPTIONS.CARD_CONTROLS} />

          <CardOptionsIPayListToggle
            leftIcon={icons.receipt_item}
            title={
              isOnlinePurchase
                ? localizationText.CARD_OPTIONS.DE_ACTIVATE_ONLINE_PURCHASE
                : localizationText.CARD_OPTIONS.ACTIVATE_ONLINE_PURCHASE
            }
            onToggleChange={toggleOnlinePurchase}
            toggleState={isOnlinePurchase}
          />

          <CardOptionsIPayListToggle
            leftIcon={icons.moneys}
            title={localizationText.CARD_OPTIONS.WITHDRAW_CASH_FROM}
            onToggleChange={toggleATMWithdraw}
            toggleState={isATMWithDraw}
          />
          <IPayView style={styles.deleteButtonStyle}>
            <IPayList
              onPress={showDeleteCardSheet}
              isShowLeftIcon={true}
              leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural1000} />}
              title={localizationText.CARD_OPTIONS.DELETE_THE_CARD}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      <IPayBottomSheet
        heading={localizationText.CHANGE_PIN.CHANGE_PIN_CODE}
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '100%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <ChangeCardPin
          onSuccess={() => {
            onCloseBottomSheet();
            navigate(screenNames.CHANGE_PIN_SUCCESS);
          }}
        />
      </IPayBottomSheet>
      <IPayActionSheet
        ref={deleteCardSheetRef}
        testID="delete-card-action-sheet"
        title={localizationText.CARD_OPTIONS.DELETE_THE_CARD}
        message={localizationText.CARD_OPTIONS.YOU_WONT_BE_ABLE_TO_USE}
        options={[localizationText.COMMON.CANCEL, localizationText.CARD_OPTIONS.DELETE]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showIcon={true}
        showCancel={true}
        customImage={<IPayIcon icon={icons.TRASH} size={48} />}
        onPress={onClickDeleteCardSheet}
      />
    </IPaySafeAreaView>
  );
};

export default CardOptionsScreen;
