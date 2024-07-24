import images from '@app/assets/images';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayList, IPayTopUpBox } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { useEffect, useState } from 'react';
import icons from '@app/assets/icons';
import { States } from '@app/utilities/enums.util';
import { PayData } from './money-request-summary.interface';
import moneyRequestStyles from './money-request-summary.styles';

const MoneyRequestSummaryScreen: React.FC = () => {
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; // TODO replace with orignal data
  const { colors } = useTheme();
  const styles = moneyRequestStyles(colors);
  const localizationText = useLocalization();
  const { requestSummaryData } = useConstantData();
  const [chipValue, setChipValue] = useState('');
  const topUpAmount = '1000'; // TODO: will be handeled by the api
  const { monthlyRemainingOutgoingAmount } = walletInfo.limitsDetails;
  const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
  const updatedTopUpAmount = parseFloat(topUpAmount.replace(/,/g, ''));

  useEffect(() => {
    if (monthlyRemaining === 0) {
      setChipValue(localizationText.REQUEST_SUMMARY.NO_REMAINING_AMOUNT);
    } else if (updatedTopUpAmount > monthlyRemaining) {
      setChipValue(localizationText.REQUEST_SUMMARY.INSUFFICIENT_BALANCE);
    } else {
      setChipValue('');
    }
  }, [monthlyRemaining, updatedTopUpAmount, localizationText]);

  const renderChip = () =>
    chipValue ? (
      <IPayChip
        textValue={chipValue}
        variant={States.WARNING}
        isShowIcon
        containerStyle={styles.chipContainer}
        icon={
          <IPayIcon
            icon={chipValue === localizationText.TOP_UP.LIMIT_REACHED ? icons.warning : icons.shield_cross}
            color={colors.critical.critical800}
            size={16}
          />
        }
      />
    ) : (
      <IPayList
        title={localizationText.REQUEST_SUMMARY.AMOUNT}
        rightText=<IPaySubHeadlineText
          color={colors.primary.primary800}
          regular
          text={`${topUpAmount} ${localizationText.COMMON.SAR}`}
        />
      />
    );

  const renderPayItem = ({ item }: { item: PayData }) => {
    const { detailsText, leftIcon, label } = item;
    return (
      <IPayView style={styles.listContainer}>
        <IPayView style={styles.listView}>
          <IPayView style={styles.iconLabel}>
            {leftIcon && (
              <IPayView style={styles.leftIcon}>
                <IPayImage image={images.alinmaP} style={styles.leftIconCard} resizeMode="contain" />
              </IPayView>
            )}
            <IPayFootnoteText color={colors.natural.natural900} text={label} />
          </IPayView>
          <IPayView style={styles.listDetails}>
            {detailsText ? (
              <IPayFootnoteText text={detailsText} style={styles.detailsText} />
            ) : (
              <IPayFootnoteText text={`${topUpAmount} ${localizationText.COMMON.SAR}`} style={styles.detailsText} />
            )}
          </IPayView>
        </IPayView>
      </IPayView>
    );
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.REQUEST_SUMMARY.TITLE} />
      <IPayView style={styles.container}>
        <IPayView>
          <IPayView>
            <IPayView>
              <IPayTopUpBox
                availableBalance={formatNumberWithCommas(currentBalance)}
                isShowTopup
                isShowRemaining
                isShowProgressBar
                currentBalance={formatNumberWithCommas(currentBalance)}
                monthlyRemainingOutgoingBalance={formatNumberWithCommas(currentBalance)}
              />
            </IPayView>
            <IPayView>
              <IPayFlatlist
                contentContainerStyle={styles.walletListBackground}
                renderItem={renderPayItem}
                data={requestSummaryData}
                style={styles.flatlist}
              />
            </IPayView>
          </IPayView>
        </IPayView>
        <IPayLinearGradientView style={styles.gradientBg}>
          {renderChip()}
          <IPayButton
            btnType="primary"
            medium
            btnText={localizationText.COMMON.CONFIRM}
            btnIconsDisabled
            disabled={monthlyRemaining === 0 || updatedTopUpAmount > monthlyRemaining}
          />
        </IPayLinearGradientView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default MoneyRequestSummaryScreen;
