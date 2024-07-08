import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import cardOptionsStyles from './card-options.style';
import CardOptionsIPayListToggle from './card-options-ipaylist-toggle';
import CardOptionsIPayListDescription from './card-options-ipaylist-description';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import ChangeCardPin from '../change-card-pin/change-card-pin.screens';


import { IPayBottomSheet } from '@app/components/organism';
import { CardTypes } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { IPayHeader, IPayList } from '@app/components/molecules';
import { IPayFootnoteText, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';

const CardOptionsScreen: React.FC = () => {
  const { colors } = useTheme();

  const changePinRef = useRef(null);
  const openBottomSheet = useRef(null);
  const localizationText = useLocalization();

  const styles = cardOptionsStyles(colors);

  const onCloseBottomSheet = () => {
    changePinRef.current?.resetInterval();
    openBottomSheet.current?.close();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.card_options} backBtn applyFlex />
      <IPayScrollView style={styles.scrollView}>
        <IPayView>
          <IPayCardDetailsBannerComponent
            cardType={CardTypes.SIGNATURE}
            cardTypeName={localizationText.platinum_cashback_prepaid}
            carHolderName={localizationText.Adam_Ahmed}
            cardLastFourDigit={'1111'}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.card_services} />

          <CardOptionsIPayListDescription
            leftIcon={icons.LOCK}
            rightIcon={icons.edit_2}
            title={localizationText.pin_code}
            subTitle={localizationText.four_digit_pin}
            onPressIcon={() => {
              openBottomSheet.current?.present();
            }}
          />

          <CardOptionsIPayListDescription
            leftIcon={icons.task}
            rightIcon={icons.arrow_right_1}
            title={localizationText.card_features}
            subTitle={localizationText.learn_more_about_feature}
            onPress={() => {}}
          />

          <CardOptionsIPayListDescription
            leftIcon={icons.card_pos}
            rightIcon={icons.arrow_right_1}
            title={localizationText.replace_the_card}
            subTitle={localizationText.card_replacement_includes}
            onPress={() => {}}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.card_controls} />

          <CardOptionsIPayListToggle
            leftIcon={icons.receipt_item}
            title={localizationText.activate_online_purchase}
            onToggleChange={() => {}}
          />

          <CardOptionsIPayListToggle
            leftIcon={icons.moneys}
            title={localizationText.withdraw_cash_from}
            onToggleChange={() => {}}
          />
          <IPayView style={styles.deleteButtonStyle}>
            <IPayList
              isShowLeftIcon={true}
              leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural1000} />}
              title={localizationText.delete_the_card}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      <IPayBottomSheet
        heading={localizationText.change_pin_code}
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
          }}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default CardOptionsScreen;
