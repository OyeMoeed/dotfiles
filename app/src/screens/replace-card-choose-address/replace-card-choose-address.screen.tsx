import React, { useRef, useState } from 'react';

import icons from '@app/assets/icons';
import {
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import IPayCardDetails from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { setTermsConditionsVisibility } from '@app/store/slices/nafath-verification';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayButton, IPayHeader, IPayList } from '@app/components/molecules';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { buttonVariants } from '@app/utilities';
import IPayReplaceCardChooseCityListComponent from './replace-card-choose-address-citylist.component';
import { RouteParams } from './replace-card-choose-address.interface';
import replaceCardStyles from './replace-card-choose-address.style';

const COUNTRY = 'Saudi Arabia';
const CITIES = ['Riyadh', 'Al-Khobar', 'Dammam'];
const DISTRICT = 'Al Olaya';

const ReplaceCardChooseAddressScreen: React.FC = () => {
  const { colors } = useTheme();
  type RouteProps = RouteProp<{ params: RouteParams }, 'params'>;

  const route = useRoute<RouteProps>();

  const {
    currentCard,
    currentCard: { cardType, cardHeaderText, name },
  } = route.params;

  const { showToast } = useToastContext();

  const styles = replaceCardStyles(colors);
  const { t } = useTranslation();
  const [checkTermsAndConditions, setCheckTermsAndConditions] = useState<boolean>(false);
  const openBottomSheet = useRef<bottomSheetTypes>(null);

  const [selectedCity, setSelectedCity] = useState(CITIES[0]);

  const toggleTermsAndConditions = () => setCheckTermsAndConditions((prev) => !prev);

  const dispatch = useDispatch();
  const onPressTermsAndConditions = () => {
    dispatch(
      setTermsConditionsVisibility({
        isVisible: true,
        isVirtualCardTermsAndConditions: true,
      }),
    );
  };

  const onCloseBottomSheet = () => {
    openBottomSheet.current?.close();
  };

  const renderToast = () => {
    showToast({
      title: t('COMMON.TERMS_AND_CONDITIONS'),
      subTitle: t('COMMON.TERMS_AND_CONDITIONS_VALIDATION'),
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning3} size={24} color={colors.natural.natural0} />,
    });
  };

  const onNavigateToNext = () => {
    if (checkTermsAndConditions) {
      navigate(ScreenNames.REPLACE_CARD_CONFIRM_DETAILS, { currentCard });
    } else {
      renderToast();
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title="CARD_OPTIONS.PRINT_CARD" backBtn applyFlex />
      <IPayView style={styles.contentContainer}>
        <IPayCardDetails
          containerStyle={styles.zeroMargin}
          cardType={cardType}
          cardTypeName={cardHeaderText}
          carHolderName={name}
          cardLastFourDigit={constants.DUMMY_USER_CARD_DETAILS.CARD_LAST_FOUR_DIGIT}
        />
        <IPayFootnoteText text="REPLACE_CARD.CHOOSE_SHIPPING_ADDRESS" style={styles.chooseAddressText} />
        <IPayList
          containerStyle={styles.countryButtonStyle}
          textStyle={[styles.titleStyle, styles.textGray]}
          subTextStyle={{ ...styles.subTextStyle, ...styles.textGray }}
          title="REPLACE_CARD.COUNTRY"
          isShowSubTitle
          subTitle={COUNTRY}
        />
        <IPayList
          onPress={() => openBottomSheet.current?.present()}
          containerStyle={styles.cityDistrict}
          textStyle={styles.titleStyle}
          subTextStyle={styles.subTextStyle}
          title="REPLACE_CARD.CITY_NAME"
          isShowSubTitle
          subTitle={selectedCity}
          isShowIcon
          icon={<IPayIcon icon={icons.arrow_circle_down} size={22} color={colors.primary.primary600} />}
        />
        <IPayList
          containerStyle={styles.cityDistrict}
          textStyle={styles.titleStyle}
          subTextStyle={styles.subTextStyle}
          title="REPLACE_CARD.DISTRICT"
          isShowSubTitle
          subTitle={DISTRICT}
        />

        <IPayView style={styles.bottomContainer}>
          <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
            <IPayView style={styles.termsChildContainer}>
              <IPayCheckbox onPress={toggleTermsAndConditions} isCheck={checkTermsAndConditions} />
              <IPayFootnoteText style={styles.termText} text="COMMON.TERMS_AND_CONDITIONS_TEXT" />
              <IPayIcon icon={icons.infoIcon} size={20} color={colors.primary.primary500} />
            </IPayView>
          </IPayPressable>
          <IPayButton
            onPress={onNavigateToNext}
            large
            btnIconsDisabled
            btnType={buttonVariants.PRIMARY}
            btnText="COMMON.NEXT"
          />
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        noGradient
        heading="REPLACE_CARD.SELECT_CITY"
        enablePanDownToClose
        simpleHeader
        cancelBnt
        customSnapPoint={['1%', '50%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={openBottomSheet}
      >
        <IPayView style={styles.citySheetContainer}>
          <IPayScrollView style={styles.citySheetContainerChild}>
            <IPayReplaceCardChooseCityListComponent
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              CITIES={CITIES}
              onCloseBottomSheet={onCloseBottomSheet}
            />
          </IPayScrollView>
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default ReplaceCardChooseAddressScreen;
