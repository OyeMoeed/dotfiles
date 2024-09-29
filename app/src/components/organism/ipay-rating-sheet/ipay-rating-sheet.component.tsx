import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayLinearGradientView, IPaySubHeadlineText, IPayTitle2Text } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { buttonVariants } from '@app/utilities';
import { IPayButton } from '@app/components/molecules';
import icons from '@app/assets/icons';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTypedSelector } from '@app/store/store';
import * as StoreReview from 'react-native-store-review';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useDispatch } from 'react-redux';
import IPayRatingSheetStyles from './ipay-rating-sheet.style';

const IPayRatingSheet = () => {
  const { colors } = useTheme();
  const styles = IPayRatingSheetStyles(colors);
  const { t } = useTranslation();
  const ref = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const {
    appData: { didUserRateApp, shouldShowRate },
  } = useTypedSelector((state) => state.appDataReducer);

  const rateApp = useCallback(() => {
    dispatch(setAppData({ didUserRateApp: true, shouldShowRate: false }));
    StoreReview.requestReview();
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(setAppData({ shouldShowRate: false }));
  }, [dispatch]);

  const isVisible = useMemo(() => !didUserRateApp && shouldShowRate, [didUserRateApp, shouldShowRate]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        ref?.current?.snapToIndex(0);
      }, 100);
    } else {
      ref?.current?.close();
    }
  }, [isVisible]);

  return (
    <IPayPortalBottomSheet
      ref={ref}
      onCloseBottomSheet={onClose}
      isVisible
      noGradient
      headerContainerStyles={styles.sheetHeadercontainerStyle}
      customSnapPoint={['45%']}
    >
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
    </IPayPortalBottomSheet>
  );
};

export default IPayRatingSheet;
