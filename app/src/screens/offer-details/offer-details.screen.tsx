import React, { useCallback, useRef } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';

import useLocalization from '@app/localization/hooks/localization.hook';
import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';

import { buttonVariants } from '@app/utilities/enums.util';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayIcon, IPayView, IPayWebView } from '@app/components/atoms';
import { openGoogleMaps, openURL } from '@app/utilities/linking-utils';
import { NearestStoreSheetTypes } from './offer-details.interface';

import offerDetailsStyles from './offer-details.style';

const OfferDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = offerDetailsStyles();
  const localizationText = useLocalization();
  const nearestStoreSheetRef = useRef<NearestStoreSheetTypes>({
    hide() {},
    show() {},
  });

  const onClickDeleteCardSheet = useCallback((index: number) => {
    switch (index) {
      case 0:
        nearestStoreSheetRef.current.hide();
        break;
      case 1:
        openGoogleMaps(12, 12);
        break;
      default:
        break;
    }
  }, []);

  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.OFFERS.DETAILS} backBtn applyFlex />
      <IPayView style={styles.container}>
        <IPayLatestOfferCard
          offer={null}
          containerStyle={styles.offerContainerStyle}
          offerImageStyle={styles.offerImageStyle}
          lineImageStyle={styles.lineImageStyle}
        />
        {/* TODO: added dummy URL for now */}
        <IPayWebView source={{ uri: 'https://www.google.com' }} />
        <IPayView style={styles.bottomButtonContainer}>
          <IPayButton
            onPress={() => openURL('https://www.google.com')} // TODO: added dummy URL for now
            medium
            btnType={buttonVariants.OUTLINED}
            leftIcon={<IPayIcon icon={icons.export_2} color={colors.primary.primary500} />}
            btnText={localizationText.OFFERS.VISIT_WEBSITE}
            btnStyle={styles.flexStyle}
          />
          <IPayButton
            onPress={() => nearestStoreSheetRef.current.show()}
            medium
            btnType={buttonVariants.OUTLINED}
            leftIcon={<IPayIcon icon={icons.location} color={colors.primary.primary500} />}
            btnText={localizationText.OFFERS.NEAREST_STORE}
            btnStyle={styles.flexStyle}
          />
        </IPayView>
      </IPayView>
      <IPayActionSheet
        ref={nearestStoreSheetRef}
        testID="nearest-store-action-sheet"
        options={[localizationText.COMMON.CANCEL, localizationText.OFFERS.OPEN_GOOGLE_MAP]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showCancel
        onPress={onClickDeleteCardSheet}
      />
    </IPaySafeAreaView>
  );
};

export default OfferDetailsScreen;
