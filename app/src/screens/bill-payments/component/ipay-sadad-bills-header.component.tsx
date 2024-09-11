import React from 'react';

import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPaySadadBillsHeaderProps } from './ipay-bills-payment-components.interface';

const IPaySadadBillsHeader: React.FC<IPaySadadBillsHeaderProps> = ({
  testID,
  style,
  unpaidBillsCount,
  onPressViewAll,
}) => {
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);
  const localizationText = useLocalization();

  const unpaidBills = `(${unpaidBillsCount} ${localizationText.BILL_PAYMENTS.UNPAID})`;

  return (
    <IPayView testID={`${testID}-sadad-bill`} style={[styles.sadadBillsHeaderView, style]}>
      <IPayView style={styles.sadadImageView}>
        <IPayImage image={images.sadad} style={styles.sadadImg} />
        <IPayView style={styles.sadadBillsStatuView}>
          <IPayFootnoteText
            regular={false}
            text={localizationText.SADAD.SADAD_BILLS}
            color={colors.primary.primary900}
          />
          {(unpaidBillsCount ?? 0) > 0 && <IPayCaption2Text text={unpaidBills} style={styles.unpaidText} />}
        </IPayView>
      </IPayView>
      <IPayButton
        small
        onPress={onPressViewAll}
        btnType={buttonVariants.LINK_BUTTON}
        btnText={localizationText.COMMON.VIEW_ALL}
        textColor={colors.primary.primary600}
        rightIcon={<IPayIcon icon={icons.arrow_right_square} size={14} color={colors.primary.primary600} />}
      />
    </IPayView>
  );
};

export default IPaySadadBillsHeader;
