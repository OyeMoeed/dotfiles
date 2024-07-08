import React from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import cardOptionsStyles from './card-options.style';
import CardOptionsIPayListToggle from './card-options-ipaylist-toggle';
import CardOptionsIPayListDescription from './card-options-ipaylist-description';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';

import { CardTypes, toastTypes } from '@app/utilities/enums.util';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@components/templates';
import { IPayHeader, IPayList } from '@app/components/molecules';
import { IPayFootnoteText, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { verticalScale } from 'react-native-size-matters';

const CardOptionsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { showToast } = useToastContext();

  const styles = cardOptionsStyles(colors);
  const localizationText = useLocalization();

  const renderToast = (isOn: boolean) => {
    showToast({
      title: isOn
        ? localizationText.CARD_OPTIONS.ONLINE_PURCHASE_ENABLED
        : localizationText.CARD_OPTIONS.ONLINE_PURCHASE_DISABLED,
      subTitle: `${CardTypes.SIGNATURE.toUpperCase()} ${localizationText.CARD_OPTIONS.DEBIT_CARD}  - *** ${`1111`}`,
      containerStyle: { bottom: verticalScale(20) },
      leftIcon: <IPayIcon icon={icons.receipt_item} size={24} color={colors.natural.natural0} />,
      toastType: isOn ? toastTypes.SUCCESS : toastTypes.WARNING,
    });
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.CARD_OPTIONS.CARD_OPTIONS} backBtn applyFlex />
      <IPayScrollView style={styles.scrollView}>
        <IPayView>
          <IPayCardDetailsBannerComponent
            cardType={CardTypes.SIGNATURE}
            cardTypeName={localizationText.CARD_OPTIONS.PLATINUM_CASHBACK_PREPAID}
            carHolderName={localizationText.CARD_OPTIONS.ADAM_AHMED}
            cardLastFourDigit={`1111`}
          />

          <IPayFootnoteText style={styles.listTitleText} text={localizationText.CARD_OPTIONS.CARD_SERVICES} />

          <CardOptionsIPayListDescription
            leftIcon={icons.LOCK}
            rightIcon={icons.edit_2}
            title={localizationText.CARD_OPTIONS.PIN_CODE}
            subTitle={localizationText.CARD_OPTIONS.FOUR_DIGIT_PIN}
            detailText={localizationText.CARD_OPTIONS.CHANGE}
            onPress={() => {}}
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
            title={localizationText.CARD_OPTIONS.ACTIVATE_ONLINE_PURCHASE}
            onToggleChange={(isOn: boolean) => renderToast(isOn)}
          />

          <CardOptionsIPayListToggle
            leftIcon={icons.moneys}
            title={localizationText.CARD_OPTIONS.WITHDRAW_CASH_FROM}
            onToggleChange={() => {}}
          />
          <IPayView style={styles.deleteButtonStyle}>
            <IPayList
              isShowLeftIcon={true}
              leftIcon={<IPayIcon icon={icons.trash} size={24} color={colors.natural.natural1000} />}
              title={localizationText.CARD_OPTIONS.DELETE_THE_CARD}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
    </IPaySafeAreaView>
  );
};

export default CardOptionsScreen;
