import React, { useCallback, useEffect, useRef, useState } from 'react';

import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';

import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import getOffers from '@app/network/services/core/offers/offers.service';

import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayProgressBar,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle1Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayActionSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { ApiResponseStatusType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { openGoogleMaps, openURL } from '@app/utilities/linking-utils';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTypedSelector } from '@app/store/store';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { GetOffersPayload, OfferItem } from '@app/network/services/core/offers/offers.interface';

import { FORMAT_2, formatDateAndTime } from '@app/utilities/date-helper.util';
import offerDetailsStyles from './offer-details.style';
import { NearestStoreSheetTypes } from './offer-details.interface';

// Added dummy details for now because there is no following details key in offer details response
const DUMMY_DETAILS =
  'Floward Shop offers a 10% discount when you use your AlinmaPay Debit Card. Just use your card at checkout to get the discount. Enjoy shopping!';
const DUMMY_AVAILABILITY = 'In Store';

const OfferDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = offerDetailsStyles(colors);
  const localizationText = useLocalization();
  const nearestStoreSheetRef = useRef<NearestStoreSheetTypes>({
    hide() {},
    show() {},
  });

  type RouteProps = RouteProp<{ params: { id: string } }, 'params'>;
  const route = useRoute<RouteProps>();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [offersData, setOffersData] = useState<OfferItem[] | null>([]);

  const { id } = route.params;

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
        id,
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

  const convertToISOFormat = (dateString: string) => {
    if (dateString) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);

      // Construct the ISO 8601 format string
      const isoFormat = `${year}-${month}-${day}T00:00:00Z`;

      return isoFormat;
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const endDate = new Date(convertToISOFormat(offersData[0]?.endDate));
    const startDate = new Date(convertToISOFormat(offersData[0]?.startDate));

    const totalDuration = +endDate - +startDate;
    const remainingTime = +endDate - +now;

    let timeLeft = {};

    if (remainingTime > 0) {
      timeLeft = {
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((remainingTime / 1000 / 60) % 60),
        seconds: Math.floor((remainingTime / 1000) % 60),
        percentage: ((remainingTime / totalDuration) * 100).toFixed(2),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        percentage: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [offersData[0]?.endDate]);

  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.OFFERS.DETAILS} backBtn applyFlex />
      <IPayView style={styles.container}>
        {offersData && (
          <IPayLatestOfferCard
            offer={offersData[0]}
            containerStyle={styles.offerContainerStyle}
            offerImageStyle={styles.offerImageStyle}
            lineImageStyle={styles.lineImageStyle}
            offStyles={styles.off}
          />
        )}
        {/* TODO: added dummy URL for now */}
        {/* <IPayWebView source={{ uri: 'https://www.google.com' }} /> */}

        <IPayView style={styles.fill}>
          <IPayScrollView showsVerticalScrollIndicator={false} style={styles.fill}>
            <>
              <IPayView style={[styles.offerExpiryContainer, styles.detailsSectionCommon]}>
                <IPayView style={styles.expiryTop}>
                  <IPayFootnoteText
                    color={colors.natural.natural900}
                    regular={false}
                    text={localizationText.OFFERS.OFFER_EXPIRES_IN}
                  />
                  {offersData && (
                    <IPayFootnoteText
                      color={colors.primary.primary800}
                      regular
                      text={formatDateAndTime(offersData[0]?.endDate, FORMAT_2)}
                    />
                  )}
                </IPayView>
                {offersData && (
                  <IPayView style={styles.expiryTop}>
                    <IPayView style={styles.center}>
                      <IPayTitle1Text text={timeLeft.days || '00'} regular color={colors.primary.primary800} />
                      <IPayCaption1Text text={localizationText.OFFERS.DAYS} regular color={colors.natural.natural500} />
                    </IPayView>
                    <IPayView style={styles.center}>
                      <IPayTitle1Text text={timeLeft.hours || '00'} regular color={colors.primary.primary800} />
                      <IPayCaption1Text
                        text={localizationText.OFFERS.HOURS}
                        regular
                        color={colors.natural.natural500}
                      />
                    </IPayView>
                    <IPayView style={styles.center}>
                      <IPayTitle1Text text={timeLeft.minutes || '00'} regular color={colors.primary.primary800} />
                      <IPayCaption1Text
                        text={localizationText.OFFERS.MINUTES}
                        regular
                        color={colors.natural.natural500}
                      />
                    </IPayView>
                    <IPayView style={styles.center}>
                      <IPayTitle1Text text={timeLeft.seconds || '00'} regular color={colors.primary.primary800} />
                      <IPayCaption1Text
                        text={localizationText.OFFERS.SECONDS}
                        regular
                        color={colors.natural.natural500}
                      />
                    </IPayView>
                  </IPayView>
                )}

                {offersData && (
                  <IPayProgressBar
                    gradientWidth={`${timeLeft.percentage}%`}
                    colors={colors.gradientPrimary}
                    style={{ backgroundColor: colors.natural.natural200 }}
                  />
                )}
              </IPayView>
              <IPayView style={[styles.detailsContainer, styles.detailsSectionCommon]}>
                <IPayFootnoteText
                  regular={false}
                  color={colors.natural.natural900}
                  text={localizationText.OFFERS.OFFER_DETAILS}
                />
                <IPayCaption1Text color={colors.natural.natural500} text={DUMMY_DETAILS} />
              </IPayView>
              <IPayView style={[styles.availabilityContainer, styles.detailsSectionCommon]}>
                <IPayFootnoteText color={colors.natural.natural900} text={localizationText.OFFERS.AVAILABILITY} />
                <IPaySubHeadlineText color={colors.primary.primary800} regular text={DUMMY_AVAILABILITY} />
              </IPayView>
              <IPayView style={[styles.termsContainer, styles.detailsSectionCommon]}>
                <IPayFootnoteText
                  regular={false}
                  color={colors.natural.natural900}
                  text={localizationText.COMMON.TERMS_AND_CONDITIONS}
                />
                <IPayCaption1Text color={colors.natural.natural500} text={offersData[0]?.termsDetailsEn} />
              </IPayView>
            </>
          </IPayScrollView>
        </IPayView>
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
            leftIcon={<IPayIcon icon={icons.location1} color={colors.primary.primary500} />}
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
        showCancel
        onPress={onClickDeleteCardSheet}
        bodyStyle={styles.alertBottom}
      />
    </IPaySafeAreaView>
  );
};

export default OfferDetailsScreen;
