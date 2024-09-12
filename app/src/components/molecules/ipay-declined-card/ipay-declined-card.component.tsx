import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);

  const renderOption = ({ item }: { item: BillData }) => {
    const { label, value, violationNumber } = item;

    return (
      <IPayList
        textStyle={styles.boldStyles}
        containerStyle={[styles.heightStyles, optionsStyles]}
        title={label}
        subTitle={`${t('TRAFFIC_VIOLATION.VIOLATION_NUMBER')} ${violationNumber || ''}`}
        detailText={`${value} ${t('COMMON.SAR')}`}
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
          textValue={`${paidViolation} ${t('TRAFFIC_VIOLATION.PAID_VIOLATION')}`}
          variant={States.SUCCESS}
          isShowIcon={false}
        />
        <IPayChip
          textValue={`${declinedTrasactionData?.length} ${t('TRAFFIC_VIOLATION.UNPAID_VIOLATION')}`}
          variant={States.ERROR}
          isShowIcon={false}
        />
      </IPayView>
      <IPayView style={[styles.gradientView, style]}>
        <IPayList
          containerStyle={styles.backgroudStyle}
          title="COMMON.DECLINED_TRANSACTION"
          subTitle="TRAFFIC_VIOLATION.NO_PARTIAL_PAYMENT"
          subTextStyle={styles.subText}
          isShowSubTitle
          textStyle={styles.erroText}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={icons.clipboard_close1} color={colors.error.error500} size={24} />}
        />
        <IPayFlatlist
          style={[styles.detailsFlex, listStyles]}
          scrollEnabled
          data={declinedTrasactionData}
          showsVerticalScrollIndicator={false}
          renderItem={renderOption}
        />

        <IPayButton
          small
          btnStyle={styles.shareStyles}
          btnType={buttonVariants.LINK_BUTTON}
          leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
          btnText="TOP_UP.SHARE"
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayDeclinedCard;
