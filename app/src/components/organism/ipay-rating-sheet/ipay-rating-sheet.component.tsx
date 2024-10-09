import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { setRatingData } from '@app/store/slices/rating.slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant } from '@app/utilities';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as StoreReview from 'react-native-store-review';
import { useDispatch } from 'react-redux';
import IPayRatingSheetStyles from './ipay-rating-sheet.style';

const IPayRatingSheet = () => {
  const { colors } = useTheme();
  const styles = IPayRatingSheetStyles(colors);
  const { t } = useTranslation();
  const ref = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const { shouldShowRate } = useTypedSelector((state) => state.ratingReducer);

  const [showAlert, setShowAlert] = useState<{ show: boolean; type: 'satisfied' | 'notSatisfied' }>({
    show: false,
    type: 'satisfied',
  });

  const rateApp = useCallback(() => {
    setShowAlert({ show: false, type: 'satisfied' });
    ref?.current?.close();

    StoreReview.requestReview();
    setTimeout(() => {
      dispatch(
        setRatingData({
          shouldShowRate: false,
          savedDate: moment().toString(),
          isFirstLogin: false,
        }),
      );
    }, 500);
  }, [dispatch]);

  const onCloseSheet = useCallback(() => {
    dispatch(setRatingData({ shouldShowRate: false }));
  }, [dispatch]);

  const onCloseAlert = useCallback(() => {
    setShowAlert({ show: false, type: 'satisfied' });
  }, []);

  const onRateButtonPress = (type: 'satisfied' | 'notSatisfied') => {
    ref?.current?.close();
    setShowAlert({ show: true, type });
  };

  useEffect(() => {
    if (shouldShowRate) {
      ref?.current?.present();
    }
  }, [shouldShowRate]);

  const alertData = {
    satisfied: {
      title: 'RATING.THANK_YOU',
      message: 'RATING.REVIEW_IN_STORE',
      icon: icons.tick_square1,
      primaryAction: {
        text: 'COMMON.CANCEL',
        onPress: onCloseAlert,
      },
      secondaryAction: {
        text: 'COMMON.SURE',
        onPress: rateApp,
      },
    },
    notSatisfied: {
      title: 'RATING.WE_APOLOGIZE_FOR_DISSATISFACTION',
      message: 'RATING.CONTINUALLY_IMPROVING',
      icon: icons.heart_slash1,
      primaryAction: undefined,
      secondaryAction: {
        text: 'COMMON.DONE',
        onPress: onCloseAlert,
      },
    },
  };

  const renderRatingButtons = () => (
    <IPayView style={styles.row}>
      <IPayPressable style={styles.button} onPress={() => onRateButtonPress('notSatisfied')}>
        <IPayView>
          <IPayIcon icon={icons.thumbs_down} size={32} />
          <IPaySubHeadlineText
            regular={false}
            text="RATING.NOT_SATISFIED"
            color={colors.natural.natural500}
            style={styles.buttonTitle}
          />
        </IPayView>

        <IPayCaption2Text text="RATING.WITH_THE_APP" color={colors.natural.natural500} />
      </IPayPressable>

      <IPayPressable style={styles.button} onPress={() => onRateButtonPress('satisfied')}>
        <IPayView>
          <IPayIcon icon={icons.thumbs_up} size={32} />
          <IPaySubHeadlineText
            regular={false}
            text="RATING.SATISFIED"
            color={colors.primary.primary500}
            style={styles.buttonTitle}
          />
        </IPayView>

        <IPayCaption2Text text="RATING.WITH_THE_APP" color={colors.natural.natural500} />
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPayPortalBottomSheet
      ref={ref}
      onCloseBottomSheet={onCloseSheet}
      isVisible
      noGradient
      simpleBar
      simpleHeader
      enablePanDownToClose
      headerContainerStyles={styles.sheetHeadercontainerStyle}
      enableDynamicSizing
      defaultIndex={-1}
      overrideContainerStyle={styles.overrideContainerStyle}
    >
      <IPayView style={styles.mainViewStyle}>
        <IPaySubHeadlineText
          regular={false}
          text="RATING.APP_RATING"
          style={styles.sheetTitle}
          color={colors.primary.primary900}
        />
        <IPayLinearGradientView
          key="IPayRating-IPayLinearGradientView"
          gradientColors={colors.appGradient.buttonBackground}
          style={styles.gradientContainer}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.8]}
        >
          <View style={styles.iconContainer}>
            <icons.HeartGradientIcon />
          </View>
          <IPayTitle2Text regular shouldTranslate={false} style={styles.gradientBoxTitle}>
            {`${t('RATING.SATISFACTION')}\n`}
            <IPayTitle2Text regular={false} text="RATING.ALINMA_PAY_APP" />
          </IPayTitle2Text>
          {renderRatingButtons()}
        </IPayLinearGradientView>
      </IPayView>

      <IPayAlert
        visible={showAlert.show}
        onClose={onCloseAlert}
        title={alertData[showAlert.type].title}
        message={alertData[showAlert.type].message}
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DEFAULT}
        icon={<IPayIcon icon={alertData[showAlert.type].icon} size={64} />}
        showIcon={false}
        primaryAction={alertData[showAlert.type].primaryAction}
        secondaryAction={alertData[showAlert.type].secondaryAction}
      />
    </IPayPortalBottomSheet>
  );
};

export default IPayRatingSheet;
