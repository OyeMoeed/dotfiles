import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import cardOptionsStyles from './card-options.style';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import ChangeCardPin from '../change-card-pin/change-card-pin.screens';

import { cardTypes } from '@app/utilities/enums.util';
import { IPayBottomSheet } from '@app/components/organism';
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
            cardType={cardTypes.signature}
            cardTypeName={localizationText.platinum_cashback_prepaid}
            carHolderName={localizationText.Adam_Ahmed}
            cardLastFourDigit={'1111'}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.card_services} />

          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.LOCK} size={24} color={colors.natural.natural1000} />}
            title={localizationText.pin_code}
            isShowSubTitle={true}
            isShowIcon={true}
            detailText={localizationText.change}
            icon={<IPayIcon icon={icons.edit_2} size={16} color={colors.primary.primary500} />}
            subTitle={localizationText.four_digit_pin}
            onPressIcon={() => {
              openBottomSheet.current?.present();
            }}
          />
          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.task} size={24} color={colors.natural.natural1000} />}
            title={localizationText.card_features}
            isShowSubTitle={true}
            isShowIcon={true}
            icon={<IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />}
            subTitle={localizationText.learn_more_about_feature}
          />
          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.card_pos} size={24} color={colors.natural.natural1000} />}
            title={localizationText.replace_the_card}
            isShowSubTitle={true}
            isShowIcon={true}
            icon={<IPayIcon icon={icons.arrow_right_1} size={18} color={colors.primary.primary500} />}
            subTitle={localizationText.card_replacement_includes}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.card_controls} />

          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.receipt_item} size={24} color={colors.natural.natural1000} />}
            title={localizationText.activate_online_purchase}
            isShowIPayToggleButton={true}
          />
          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.moneys} size={24} color={colors.natural.natural1000} />}
            title={localizationText.withdraw_cash_from}
            isShowIPayToggleButton={true}
          />
          <IPayList
            isShowLeftIcon={true}
            leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural1000} />}
            title={localizationText.delete_the_card}
          />
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
