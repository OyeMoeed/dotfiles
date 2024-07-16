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
  IPayPressable,
  IPayProgressBar,
  IPayText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import IPayPointRedemptionCard from '@app/components/atoms/ipay-point-redemption-card/ipay-point-redemption-card.component';
import { IPayButton, IPayChip, IPayHeader } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { fonts } from '@app/styles/typography.styles';
import { variants } from '@app/utilities/enums.util';
import { useEffect, useState } from 'react';
import pointRedemption from './ipay-points-redemption.style';

const IPayPointsRedemption = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [points, setPoints] = useState('');
  const [revert, setRevert] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const amountStr = amount || '';

  const styles = pointRedemption(colors, amountStr.length);

  const formatNumberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };
  const totalAmount = 20000;
  const currentAmount = 14800;
  const totalPoints = 3000;
  const CONVERTION_RATE = 30;

  const remainingAmount = totalAmount - currentAmount;
  const remainingProgress = (remainingAmount / totalAmount) * 100;

  const handleAmountInputChange = (text: string) => {
    const parsedAmount = parseInt(text, 10);
    if (!isNaN(parsedAmount) && parsedAmount >= 0) {
      setAmount(text);
      setPoints((Number(text) * CONVERTION_RATE).toFixed(2).toString());
    } else {
      setAmount('');
      setPoints('');
    }
  };

  const handlePointInputChange = (text: string) => {
    const parsedAmount = parseInt(text, 10);
    if (!isNaN(parsedAmount) && parsedAmount >= 0) {
      setPoints(text);
      setAmount((Number(text) / CONVERTION_RATE).toFixed(2).toString());
    } else {
      setAmount('');
      setPoints('');
    }
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
      setAmount(totalAmount.toString());
      setPoints(totalPoints.toString());
    } else {
      setAmount('');
      setPoints('');
    }
  }, [isChecked]);

  const onRedeem = () => {
    navigate(screenNames.POINTS_REDEMPTIONS_CONFIRMATION);
    setAmount('');
    setPoints('');
  };
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader title={localizationText.COMMON.TOP_UP} backBtn applyFlex />

      {isEligible ? (
        <IPayView style={styles.pointsRedemptionContainer}>
          <IPayPointRedemptionCard points={totalPoints} amount={remainingAmount} />
          <IPayView style={styles.pointsConversionDetail}>
            <IPayText
              fontFamily={fonts.REGULAR}
              style={styles.redeemPointText}
              text={localizationText.TOP_UP.REDEEM_THE_POINTS}
            />
            <IPayChip
              textValue={localizationText.TOP_UP.POINT_CONVERSION_VALUE}
              variant={variants.SEVERE}
              isShowIcon={false}
            />
          </IPayView>

          <IPayView style={styles.conversionContainer}>
            <IPayLinearGradientView
              style={styles.gradientBarStyle}
              gradientColors={colors.appGradient.gradientPrimary20}
            />

            <IPayView style={[styles.pointsAmountConversion, revert && { flexDirection: 'row-reverse' }]}>
              <IPayView>
                <IPayFootnoteText text={localizationText.TOP_UP.AMOUNT_VALUE} style={styles.amountInputLabel} />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="amount-input"
                    text={amountStr}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.textAmount, dynamicStyles.textInput]}
                    onChangeText={handleAmountInputChange}
                    keyboardType="numeric"
                    editable
                  />
                  <IPayLargeTitleText style={[styles.currencyText, dynamicStyles.currencyText]}>
                    {localizationText.COMMON.SAR}
                  </IPayLargeTitleText>
                </IPayView>
              </IPayView>
              <IPayView>
                <IPayLinearGradientView
                  style={styles.gradientLine}
                  locations={[0, 0.3, 0.6, 1]}
                  gradientColors={colors.appGradient.gradientSecondary50}
                />
                <IPayPressable style={styles.revertCycleIcon} onPress={() => setRevert(!revert)}>
                  <IPayGradientIcon icon={icons.repeat} />
                </IPayPressable>
              </IPayView>

              <IPayView>
                <IPayFootnoteText text={localizationText.TOP_UP.POINTS_REDEEMED} style={styles.amountInputLabel} />
                <IPayView style={styles.amountInput}>
                  <IPayInput
                    testID="points-input"
                    text={points}
                    placeholder="0"
                    placeholderTextColor={colors.natural.natural300}
                    style={[styles.textAmount, styles.textPoint, dynamicStyles.textInput]} // Combine styles
                    onChangeText={handlePointInputChange}
                    keyboardType="numeric"
                    editable
                  />
                  <IPayLargeTitleText style={[styles.currencyText, dynamicStyles.currencyText]}>
                    {localizationText.COMMON.POINTS}
                  </IPayLargeTitleText>
                </IPayView>
              </IPayView>
            </IPayView>
            <IPayChip
              textValue={localizationText.TOP_UP.POINTS_EXCEED}
              variant={variants.WARNING}
              isShowIcon={true}
              containerStyle={styles.chipContainer}
              icon={<IPayIcon icon={icons.shield_cross} color={colors.critical.critical800} size={scaleSize(16)} />}
            />
            <IPayView style={styles.checkmarkPoints}>
              <IPayCheckbox isCheck={isChecked} onPress={handleCheck} />
              <IPayFootnoteText
                text={`${localizationText.TOP_UP.USE_ALL} (${totalPoints} ${localizationText.COMMON.POINTS})`}
              />
            </IPayView>
            <>
              <IPayProgressBar
                style={styles.progressBar}
                gradientWidth={`${remainingProgress}%`}
                colors={colors.gradientPrimary}
              />
              <IPayView style={styles.topUpContainer}>
                <IPayCaption2Text text={localizationText.TOP_UP.REMAINING} />
                <IPayCaption2Text style={styles.totalAmount}>
                  {`${formatNumberWithCommas(currentAmount)} ${localizationText.HOME.OF} ${formatNumberWithCommas(totalAmount)}`}
                </IPayCaption2Text>
              </IPayView>
            </>
          </IPayView>
          <IPayButton
            onPress={onRedeem}
            btnType="primary"
            disabled={!amountStr.length}
            btnText={localizationText.TOP_UP.REDEEM}
            textColor={colors.natural.natural0}
            btnStyle={[styles.redeemButton]}
            rightIcon={
              <IPayIcon
                icon={icons.rightArrow}
                color={amountStr.length ? colors.natural.natural0 : colors.natural.natural300}
              />
            }
          />
        </IPayView>
      ) : (
        <IPayView style={styles.notEnrolled}>
          <IPayIcon icon={icons.akhtr_pay2} size={scaleSize(80)} />
          <IPayTitle2Text text={localizationText.TOP_UP.NOT_ENROLLED} style={styles.notEnrolledText} />
          <IPayFootnoteText
            text={localizationText.TOP_UP.NOT_ENROLLED_DESCRIPTION}
            style={styles.notEnrolledSubtitle}
          />
          <IPayImage image={images.blackLogo} />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default IPayPointsRedemption;
