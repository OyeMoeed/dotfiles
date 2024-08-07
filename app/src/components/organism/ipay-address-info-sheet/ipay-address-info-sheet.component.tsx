import { IPayCaption1Text, IPayHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayBottomSheet } from '@components/organism/index';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddressInfoTruck } from '@app/assets/svgs';
import { isIosOS } from '@app/utilities/constants';
import ipayAddressInfoSheetStyles from './ipay-address-info-sheet.style';
import { IPayAddressInfoSheetProps } from './ipay-address-info-sheet.interface';

const IPayAddressInfoSheet: React.FC<IPayAddressInfoSheetProps> = forwardRef((_, ref) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = ipayAddressInfoSheetStyles();
  const ipayAddressInfoSheetRef = useRef<BottomSheetModal>(null);

  const showAddressInfoSheet = () => {
    ipayAddressInfoSheetRef?.current?.present();
  };

  useImperativeHandle(ref, () => ({
    showAddressInfoSheet,
  }));

  return (
    <IPayBottomSheet
      noGradient
      heading={localizationText.COMMON.ADDRESS_INFO}
      enablePanDownToClose
      simpleBar
      customSnapPoint={['1%', isIosOS ? '34%' : '29%']}
      ref={ipayAddressInfoSheetRef}
    >
      <IPayView style={styles.containerStyle}>
        <IPayView style={styles.contentContainer}>
          <IPayHeadlineText
            color={colors.primary.primary900}
            regular={false}
            text={localizationText.REPLACE_CARD.SHIPPING_ADDRESS}
          />
          <IPayCaption1Text
            style={styles.descriptionTextStyle}
            color={colors.natural.natural900}
            text={localizationText.PHYSICAL_CARD.CUORIER_COMPANY_WILL}
          />
        </IPayView>
        <IPayView style={styles.iconContainer}>
          <AddressInfoTruck style={styles.iconStyle} />
        </IPayView>
      </IPayView>
    </IPayBottomSheet>
  );
});

export default IPayAddressInfoSheet;
