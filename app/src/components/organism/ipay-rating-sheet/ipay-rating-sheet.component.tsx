import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayLinearGradientView, IPaySubHeadlineText, IPayTitle2Text, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef } from 'react';
import { buttonVariants } from '@app/utilities';
import { IPayButton } from '@app/components/molecules';
import icons from '@app/assets/icons';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTypedSelector } from '@app/store/store';
import * as StoreReview from 'react-native-store-review';
import { useDispatch } from 'react-redux';
import { setRatingData } from '@app/store/slices/rating.slice';
import moment from 'moment';
import IPayRatingSheetStyles from './ipay-rating-sheet.style';

const IPayRatingSheet = () => {
  const { colors } = useTheme();
  const styles = IPayRatingSheetStyles(colors);
  const { t } = useTranslation();
  const ref = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const { shouldShowRate } = useTypedSelector((state) => state.ratingReducer);

  const rateApp = useCallback(() => {
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

  const onClose = useCallback(() => {
    dispatch(setRatingData({ shouldShowRate: false }));
  }, [dispatch]);

  useEffect(() => {
    if (shouldShowRate) {
      ref?.current?.present();
    }
  }, [shouldShowRate]);

  return (
    <IPayPortalBottomSheet
      ref={ref}
      onCloseBottomSheet={onClose}
      isVisible
      noGradient
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
          <IPayButton
            onPress={rateApp}
            btnType={buttonVariants.PRIMARY}
            btnText="RATING.RATE_APP_NOW"
            btnIconsDisabled
            medium
          />
        </IPayLinearGradientView>
      </IPayView>
    </IPayPortalBottomSheet>
  );
};

export default IPayRatingSheet;
