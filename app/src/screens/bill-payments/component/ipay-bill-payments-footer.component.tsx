import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import checkImage from '@app/utilities/image-helper.util';
import React from 'react';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPayBillPaymentsFooterProps } from './ipay-bills-payment-components.interface';

const IPayBillPaymentsFooter: React.FC<IPayBillPaymentsFooterProps> = ({ testID, style }) => {
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);
  const localizationText = useLocalization();
  const otherBills = constants.OTHER_BILL_TYPES;
  const unpaidCount = `(3 ${localizationText.BILL_PAYMENTS.UNPAID})`;

  const getIcon = (icon: string) => {
    const isImage = checkImage(icon);
    if (isImage) {
      return <IPayImage image={icon} style={styles.moiIcon} />;
    }
    return <IPayIcon icon={icon} size={31} color={colors.primary.primary900} />;
  };

  return (
    <IPayView testID={`${testID}-bill-payments-footer`} style={[styles.billPaymentsFooterView, style]}>
      <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.footerChildView}>
        <IPayFlatlist
          data={otherBills}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          renderItem={({ item }) => (
            <IPayView style={styles.footerCardView}>
              <IPayView style={styles.moiIconView}>{getIcon(item.icon)}</IPayView>
              <IPayFootnoteText regular={false} text={item?.title} style={styles.footerTitleText} />
              <IPayView style={styles.footerBtnView}>
                <IPayCaption2Text text={unpaidCount} color={colors.warning.warning500} />
                <IPayButton
                  medium
                  btnStyle={styles.footerBtn}
                  btnType={buttonVariants.PRIMARY}
                  rightIcon={<IPayIcon icon={icons.rightArrow} size={18} color={colors.natural.natural0} />}
                />
              </IPayView>
            </IPayView>
          )}
        />
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayBillPaymentsFooter;