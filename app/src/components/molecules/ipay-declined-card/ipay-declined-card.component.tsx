import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayChip from '../ipay-chip/ipay-chip.component';
import IPayList from '../ipay-list/ipay-list.component';
import { BillData, IPayBillDetailsOptionProps } from './ipay-declined-card.interface';
import sadadFooterComponentStyles from './ipay-declined-card.style';

const IPayDeclinedCard: React.FC<IPayBillDetailsOptionProps> = ({
  testID,
  style,
  optionsStyles,
  listStyles,
  declinedTrasactionData,
  paidViolation,
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const localizationText = useLocalization();

  const renderOption = ({ item }: { item: BillData }) => {
    const { label, value, violationNumber } = item;

    return (
      <IPayList
        textStyle={styles.boldStyles}
        containerStyle={[styles.heightStyles, optionsStyles]}
        title={label}
        subTitle={`${localizationText.TRAFFIC_VIOLATION.VIOLATION_NUMBER} ${violationNumber}`}
        detailText={`${value} ${localizationText.COMMON.SAR}`}
        detailTextStyle={styles.detailsText}
        showDetail
        isShowSubTitle
      />
    );
  };
  return (
    <IPayView testID={`${testID}-declined-card`}>
      <IPayView style={[styles.rowStyles, styles.centerAlign]}>
        <IPayChip
          textValue={`${paidViolation} ${localizationText.TRAFFIC_VIOLATION.PAID_VIOLATION}`}
          variant={States.SUCCESS}
          isShowIcon={false}
        />
        <IPayChip
          textValue={`${declinedTrasactionData?.length} ${localizationText.TRAFFIC_VIOLATION.UNPAID_VIOLATION}`}
          variant={States.ERROR}
          isShowIcon={false}
        />
      </IPayView>
      <IPayView style={[styles.gradientView, style]}>
        <IPayList
          containerStyle={{ backgroundColor: colors.error.error25 }}
          title={localizationText.COMMON.DECLINED_TRANSACTION}
          subTitle={localizationText.TRAFFIC_VIOLATION.NO_PARTIAL_PAYMENT}
          subTextStyle={{ color: colors.error.error500 }}
          isShowSubTitle
          textStyle={styles.erroText}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.clipboard_close1} color={colors.error.error500} size={24} />}
        />
        <IPayFlatlist
          style={[styles.detailsFlex, listStyles]}
          scrollEnabled={true}
          data={declinedTrasactionData}
          showsVerticalScrollIndicator={false}
          renderItem={renderOption}
        />

        <IPayButton
          small
          btnStyle={styles.shareStyles}
          btnType={buttonVariants.LINK_BUTTON}
          leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
          btnText={localizationText.TOP_UP.SHARE}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayDeclinedCard;
