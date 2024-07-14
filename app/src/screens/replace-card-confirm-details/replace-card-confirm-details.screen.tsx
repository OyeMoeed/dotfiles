import React from 'react';

import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { IPaySafeAreaView } from '@components/templates';

import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayFootnoteText, IPayScrollView, IPayView } from '@app/components/atoms';
import { buttonVariants } from '@app/utilities/enums.util';
import constants from '@app/constants/constants';
import replaceCardStyles from './replace-card-confirm-details.style';

const DUMMY_DATA = {
  address: 'Al Olaya, Riyadh',
  replaceFee: '100',
  shippingFee: '100',
  totalFee: '200',
  balance: '5,200.40',
};

const ReplaceCardConfirmDetailsScreen: React.FC = () => {
  const { colors } = useTheme();

  const localizationText = useLocalization();

  const styles = replaceCardStyles(colors);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.REPLACE_CARD.REPLACE_PHYSICAL_CARD} backBtn applyFlex />
      <IPayView style={styles.childContainer}>
        <IPayAccountBalance balance={DUMMY_DATA.balance} onPressTopup={() => {}} />
        <IPayView style={styles.contentContainer}>
          <IPayScrollView>
            <IPayView>
              <IPayFootnoteText text={localizationText.CARDS.CARD_DETAILS} color={colors.natural.natural500} />
              <IPayList
                title={localizationText.REPLACE_CARD.HOLDERS_NAME}
                detailText={constants.DUMMY_USER_CARD_DETAILS.CARD_HOLDER_NAME}
              />
              <IPayList
                title={localizationText.CARDS.CARD_TYPE}
                detailText={constants.DUMMY_USER_CARD_DETAILS.CARD_TYPE_NAME}
              />

              <IPayFootnoteText
                text={localizationText.REPLACE_CARD.SHIPPING_ADDRESS}
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList title={localizationText.REPLACE_CARD.ADDRESS} detailText={DUMMY_DATA.address} />
              <IPayFootnoteText
                text={localizationText.CARD_OPTIONS.CARD_FEE}
                color={colors.natural.natural500}
                style={styles.footNoteTextStyle}
              />
              <IPayList
                title={localizationText.REPLACE_CARD.REPLACEMENT_FEE}
                detailText={`${DUMMY_DATA.replaceFee} ${localizationText.COMMON.SAR}`}
              />

              <IPayList
                title={localizationText.REPLACE_CARD.SHIPPING_FEE}
                detailText={`${DUMMY_DATA.shippingFee} ${localizationText.COMMON.SAR}`}
              />

              <IPayView style={styles.bottomContainer}>
                <IPayList
                  title={localizationText.REPLACE_CARD.TOTAL_FEE}
                  detailText={`${DUMMY_DATA.totalFee} ${localizationText.COMMON.SAR}`}
                />
                <IPayButton
                  large
                  btnIconsDisabled
                  btnType={buttonVariants.PRIMARY}
                  btnText={localizationText.COMMON.CONFIRM}
                />
              </IPayView>
            </IPayView>
          </IPayScrollView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ReplaceCardConfirmDetailsScreen;
