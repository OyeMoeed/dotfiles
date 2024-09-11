import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';

import icons from '@app/assets/icons';
import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getOffers from '@app/network/services/core/offers/offers.service';
import useTheme from '@app/styles/hooks/theme.hook';

import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayFilterBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import { GetOffersPayload, OfferItem } from '@app/network/services/core/offers/offers.interface';
import { useTypedSelector } from '@app/store/store';
import { ApiResponseStatusType, spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';

import offersListStyles from './offers-list.style';

const OffersListScreen: React.FC = () => {
  const { colors } = useTheme();
  const { offerFilterData, offerFilterDefaultValues } = useConstantData();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();
  const [isLoading] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [offersData, setOffersData] = useState<OfferItem[] | null>(null);

  const localizationText = useLocalization();
  const filterRef = useRef<bottomSheetTypes>(null);

  const styles = offersListStyles(colors);

  const handleSubmit = () => {};

  const renderSpinner = useCallback(
    (isVisbile: boolean) => {
      if (isVisbile) {
        showSpinner({
          variant: spinnerVariant.DEFAULT,
          hasBackgroundColor: true,
        });
      } else {
        hideSpinner();
      }
    },
    [isLoading],
  );

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getOffersData = async () => {
    renderSpinner(true);
    try {
      const payload: GetOffersPayload = {
        walletNumber,
      };

      const apiResponse = await getOffers(payload);
      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        setOffersData(apiResponse?.response?.offers);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
      renderSpinner(false);
    } catch (error) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getOffersData();
  }, []);

  return (
    <IPaySafeAreaView style={styles.backgroundColor}>
      <IPayHeader
        title={localizationText.OFFERS.OFFERS_TITLE}
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={() => filterRef.current?.showFilters()}>
            <IPayIcon icon={icons.filter} size={20} color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.container}>
        <IPayView style={styles.topTextContainer}>
          <IPayFootnoteText color={colors.natural.natural500} regular text="OFFERS.AVAILABLE_OFFERS" />
          <IPayView style={styles.smallDOT} />
          <IPayCaption2Text
            regular
            text={`${offersData?.length} ${localizationText.OFFERS.OFFERS_TITLE}`}
            color={colors.secondary.secondary500}
          />
        </IPayView>
        <IPayFlatlist
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={offersData}
          renderItem={({ item }) => (
            <IPayLatestOfferCard
              onPress={() =>
                navigate(ScreenNames.OFFER_DETAILS, {
                  id: item.id,
                })
              }
              offer={item}
              isSpecialOffer={item.isSpecialOffer}
              containerStyle={styles.offerContainerStyle}
              offerImageStyle={styles.offerImageStyle}
              lineImageStyle={styles.lineImageStyle}
              offStyles={styles.off}
            />
          )}
          ListFooterComponent={<IPayView style={styles.lastItem} />}
        />
      </IPayView>
      <IPayFilterBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.FILTER}
        defaultValues={offerFilterDefaultValues}
        ref={filterRef}
        onSubmit={handleSubmit}
        filters={offerFilterData}
        inputStyle={styles.inputContainer}
        doneText={localizationText.TRANSACTION_HISTORY.CLEAR_FILTER}
      />
    </IPaySafeAreaView>
  );
};

export default OffersListScreen;
