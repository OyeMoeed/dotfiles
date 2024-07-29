import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayChip from '../ipay-chip/ipay-chip.component';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayBillDetailsOptionProps } from './ipay-declined-card.interface';
import sadadFooterComponentStyles from './ipay-declined-card.style';

const IPayDeclinedCard: React.FC<IPayBillDetailsOptionProps> = ({ testID, style, optionsStyles }) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayView>
      <IPayChip
        textValue={localizationText.TRAFFIC_VIOLATION.PAID_VIOLATION}
        variant={States.SUCCESS}
        isShowIcon={false}
      />
      <IPayChip
        textValue={localizationText.TRAFFIC_VIOLATION.UNPAID_VIOLATION}
        variant={States.ERROR}
        isShowIcon={false}
      />
      <IPayView testID={`${testID}-bill-details`} style={[styles.gradientView, style]}>
        <IPayList
          containerStyle={{ backgroundColor: colors.error.error25 }}
          title={'Declined transaction'}
          subTitle={'Saudi electricity does not accept partially payment'}
          subTextStyle={{ color: colors.error.error500 }}
          isShowSubTitle
          textStyle={{ color: colors.error.error500 , fontWeight:'bold'}}
          isShowLeftIcon
          leftIcon={<IPayIcon icon={'clipboard-close1'} color={colors.error.error500} size={24} />}
        />
        <IPayList
          containerStyle={[styles.heightStyles, optionsStyles]}
          title={'label'}
          detailText={'value'}
          detailTextStyle={styles.detailsText}
          isShowIcon
          icon={<IPayIcon icon={'icon'} color={colors.primary.primary500} />}
          onPressIcon={'onPressIcon'}
        />
        <IPayButton
          small
          btnType={buttonVariants.LINK_BUTTON}
          leftIcon={<IPayIcon icon={icons.share} color={colors.primary.primary500} size={16} />}
          btnText={localizationText.TOP_UP.SHARE}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayDeclinedCard;
