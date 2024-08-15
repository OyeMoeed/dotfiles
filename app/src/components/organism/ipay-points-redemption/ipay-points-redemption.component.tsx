import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayCheckbox,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayInput,
  IPayLargeTitleText,
  IPayLinearGradientView,
  IPayProgressBar,
  IPayText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import IPayKeyboardAwareScrollView from '@app/components/atoms/ipay-keyboard-aware-scroll-view/ipay-keyboard-aware-scroll-view.component';
import IPayPointRedemptionCard from '@app/components/atoms/ipay-point-redemption-card/ipay-point-redemption-card.component';
import { IPayButton, IPayChip, IPayHeader } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import IPointsRedemptionsRouteProps from '@app/screens/points-redemptions/points-redemptions.interface';
import { setPointsRedemptionReset } from '@app/store/slices/reset-state-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { fonts } from '@app/styles/typography.styles';
import { States } from '@app/utilities/enums.util';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import pointRedemption from './ipay-points-redemption.style';

const IPayPointsRedemption = ({ routeParams }: { routeParams: IPointsRedemptionsRouteProps }) => {
  const { isEligible } = routeParams;
  const { aktharPointsInfo } = routeParams;
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [points, setPoints] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const amountStr = amount || '';
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const styles = pointRedemption(colors, amountStr.length);

  const formatNumberWithCommas = (number: number): string => number.toLocaleString();
  const dispatch = useDispatch();
  const shouldReset = useTypedSelector((state) => state.resetStateSlice.pointsRedemption);

  useEffect(() => {
    if (shouldReset) {
      setAmount('');
      setPoints('');
      setIsChecked(false);
      dispatch(setPointsRedemptionReset(false));
    }
  }, [shouldReset]);

  const remainingProgress =
    (+walletInfo.limitsDetails.monthlyRemainingOutgoingAmount / +walletInfo.limitsDetails.monthlyOutgoingLimit) * 100;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (amount === '') {
      setErrorMessage(null);
      return;
    }
    const parsedAmount = parseInt(amount, 10);
    const isMoreThanDailyLimit = parsedAmount > +walletInfo.limitsDetails.dailyRemainingIncomingAmount;
    const isMoreThanMonthlyLimit = parsedAmount > +walletInfo.limitsDetails.monthlyRemainingIncomingAmount;
    if (isMoreThanDailyLimit && !isMoreThanMonthlyLimit) {
      setErrorMessage(
        `${localizationText.TOP_UP.DAILY_LIMIT} ${walletInfo.limitsDetails.dailyRemainingIncomingAmount}`,
      );
    } else if (isMoreThanMonthlyLimit) {
      setErrorMessage(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
    } else {
      setErrorMessage(null);
    }
  }, [amount, walletInfo.limitsDetails]);

  const undoCheckState = () => {
    if (isChecked) {
      setIsChecked(false);
    }
  };

  const handleAmountInputChange = (text: string) => {
    const parsedAmount = parseInt(text, 10);
    if (!Number.isNaN(parsedAmount) && parsedAmount >= 0) {
      setAmount(parsedAmount.toString());
      setPoints((Number(parsedAmount) * (aktharPointsInfo?.exchangeRate as unknown as number)).toFixed(2).toString());
    } else {
      setAmount('');
      setPoints('');
    }
    undoCheckState();
  };

  useEffect(() => {
    if (points === '') {
      setErrorMessage(null);
      return;
    }

    const parsedPoints = parseInt(points, 10);
    const availablePoints = Number(aktharPointsInfo?.mazayaPoints) || 0;

    if (parsedPoints > availablePoints) {
      setErrorMessage(localizationText.TOP_UP.POINTS_EXCEED);
    }
  }, [points, aktharPointsInfo?.mazayaPoints, aktharPointsInfo?.exchangeRate]);

  const handlePointInputChange = (text: string) => {
    const parsedAmount = parseInt(text, 10);
    if (!Number.isNaN(parsedAmount) && parsedAmount >= 0) {
      setPoints(parsedAmount.toString());
      setAmount((Number(parsedAmount) / (aktharPointsInfo?.exchangeRate as unknown as number)).toFixed(2).toString());
    } else {
      setAmount('');
      setPoints('');
    }
    undoCheckState();
  };

  const dynamicStyles = {
    textInput: {
      color: amountStr.length > 0 ? colors.primary.primary900 : colors.natural.natural300,
    },
    currencyText: {
      color: amountStr.length > 0 ? colors.primary.primary900 : colors.natural.natural300,
    },
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setAmount(aktharPointsInfo?.amount as string);
      setPoints(aktharPointsInfo?.mazayaPoints as string);
    } else {
      setAmount('');
      setPoints('');
    }
  }, [isChecked]);

  const onRedeem = () => {
    navigate(screenNames.POINTS_REDEMPTIONS_CONFIRMATION, {
      redeemAmount: amount,
      redeemPoints: points,
      totalpoints: aktharPointsInfo?.mazayaPoints,
    });
  };

  const disabled = !amountStr.length || errorMessage;

  const renderContent = (): JSX.Element => {
    if (isEligible === true) {
      return (
        <IPayView style={styles.pointsRedemptionContainer}>
          <IPayPointRedemptionCard points={aktharPointsInfo?.mazayaPoints} amount={aktharPointsInfo?.amount} />
          <IPayView style={styles.pointsConversionDetail}>
            <IPayText
              fontFamily={fonts.REGULAR}
              style={styles.redeemPointText}
              text={localizationText.TOP_UP.REDEEM_THE_POINTS}
            />
            <IPayChip
              textValue={localizationText.TOP_UP.POINT_CONVERSION_VALUE.replace(
                '$points_number',
                aktharPointsInfo?.exchangeRate,
              )}
              variant={States.SEVERE}
              isShowIcon={false}
            />
          </IPayView>

          <IPayView style={styles.conversionContainer}>
            <IPayLinearGradientView
              style={styles.gradientBarStyle}
              gradientColors={colors.appGradient.gradientPrimary20}
            />

            <IPayView style={styles.pointsAmountConversion}>
              <IPayView>
                <IPayFootnoteText text={localizationText.TOP_UP.AMOUNT_VALUE} style={styles.amountInputLabel} />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="amount-input"
                    text={amountStr}
                    placeholder="0"
                    maxLength={5}
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.textAmount, dynamicStyles.textInput]}
                    onChangeText={handleAmountInputChange}
                    keyboardType="numeric"
                    editable
                  />
                  <IPayLargeTitleText style={[styles.currencyText, dynamicStyles.currencyText]}>
                    {' ' + localizationText.COMMON.SAR}
                  </IPayLargeTitleText>
                </IPayView>
              </IPayView>
              <IPayView>
                <IPayLinearGradientView
                  style={styles.gradientLine}
                  locations={[0, 0.3, 0.6, 1]}
                  gradientColors={colors.appGradient.gradientSecondary50}
                />
                <IPayView style={styles.revertCycleIcon}>
                  <IPayGradientIcon icon={icons.repeat} />
                </IPayView>
              </IPayView>

              <IPayView>
                <IPayFootnoteText text={localizationText.TOP_UP.POINTS_REDEEMED} style={styles.amountInputLabel} />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="points-input"
                    text={points}
                    placeholder="0"
                    maxLength={5}
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.textAmount, styles.textPoint, dynamicStyles.textInput]} // Combine styles
                    onChangeText={handlePointInputChange}
                    keyboardType="numeric"
                    editable
                  />
                  <IPayLargeTitleText style={[styles.currencyText, dynamicStyles.currencyText]}>
                    {' ' + localizationText.COMMON.POINT}
                  </IPayLargeTitleText>
                </IPayView>
              </IPayView>
            </IPayView>
            {errorMessage && (
              <IPayChip
                textValue={errorMessage}
                variant={States.WARNING}
                isShowIcon={true}
                containerStyle={styles.chipContainer}
                icon={<IPayIcon icon={icons.shield_cross} color={colors.critical.critical800} size={scaleSize(16)} />}
              />
            )}
            <IPayView style={styles.checkmarkPoints}>
              <IPayCheckbox isCheck={isChecked} onPress={handleCheck} />
              <IPayFootnoteText
                text={
                  `${localizationText.TOP_UP.USE_ALL}` +
                  ` (${aktharPointsInfo?.mazayaPoints} ${localizationText.COMMON.POINTS})`
                }
              />
            </IPayView>
            <>
              <IPayProgressBar
                style={styles.progressBar}
                gradientWidth={`${remainingProgress}%`}
                colors={colors.gradientPrimaryReverse}
              />
              <IPayView style={styles.topUpContainer}>
                <IPayCaption2Text text={localizationText.TOP_UP.REMAINING} />
                <IPayCaption2Text color={colors.natural.natural500}>
                  <IPayCaption2Text style={styles.totalAmount}>
                    {`${formatNumberWithCommas(+walletInfo.limitsDetails.monthlyRemainingIncomingAmount)}`}{' '}
                  </IPayCaption2Text>
                  {`${localizationText.HOME.OF}` +
                    ` ${formatNumberWithCommas(+walletInfo.limitsDetails.monthlyIncomingLimit)}`}
                </IPayCaption2Text>
              </IPayView>
            </>
          </IPayView>
          <IPayButton
            onPress={onRedeem}
            btnType="primary"
            disabled={disabled}
            btnText={localizationText.TOP_UP.REDEEM}
            textColor={colors.natural.natural0}
            btnStyle={[styles.redeemButton, disabled && styles.disabledBackground]}
            rightIcon={
              <IPayIcon
                icon={icons.rightArrow}
                color={disabled ? colors.natural.natural300 : colors.natural.natural0}
              />
            }
          />
        </IPayView>
      );
    } else if (isEligible === false) {
      return (
        <IPayView style={styles.notEnrolled}>
          <IPayView style={styles.iconContainer}>
            <IPayIcon icon={icons.akhtr_pay2} size={scaleSize(80)} />
          </IPayView>
          <IPayTitle2Text text={localizationText.TOP_UP.NOT_ENROLLED} style={styles.notEnrolledText} />
          <IPayFootnoteText
            text={localizationText.TOP_UP.NOT_ENROLLED_DESCRIPTION}
            style={styles.notEnrolledSubtitle}
          />
          <IPayImage style={styles.image} image={images.blackLogo3x} />
        </IPayView>
      );
    } else {
      return <></>;
    }
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.COMMON.TOP_UP} backBtn applyFlex />
      <IPayKeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </IPayKeyboardAwareScrollView>
    </IPaySafeAreaView>
  );
};

export default IPayPointsRedemption;
