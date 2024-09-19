import React from 'react';

import images from '@app/assets/images';
import { ArrowSquareRightIcon } from '@app/assets/svgs';
import { IPayCaption2Text, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useTranslation } from 'react-i18next';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPaySadadBillsHeaderProps } from './ipay-bills-payment-components.interface';

const IPaySadadBillsHeader: React.FC<IPaySadadBillsHeaderProps> = ({
  testID,
  style,
  unpaidBillsCount,
  onPressViewAll,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);

  const unpaidBills = `(${unpaidBillsCount} ${t('BILL_PAYMENTS.UNPAID')})`;

  return (
    <IPayView testID={`${testID}-sadad-bill`} style={[styles.sadadBillsHeaderView, style]}>
      <IPayView style={styles.sadadImageView}>
        <IPayImage image={images.sadad} style={styles.sadadImg} />
        <IPayView style={styles.sadadBillsStatuView}>
          <IPayFootnoteText regular={false} text="SADAD.SADAD_BILLS" color={colors.primary.primary900} />
          {(unpaidBillsCount ?? 0) > 0 && <IPayCaption2Text text={unpaidBills} style={styles.unpaidText} />}
        </IPayView>
      </IPayView>
      <IPayButton
        small
        onPress={onPressViewAll}
        btnType={buttonVariants.LINK_BUTTON}
        btnText="COMMON.VIEW_ALL"
        textColor={colors.primary.primary600}
        rightIcon={<ArrowSquareRightIcon style={styles.viewAllIcon} color={colors.primary.primary600} />}
      />
    </IPayView>
  );
};

export default IPaySadadBillsHeader;
