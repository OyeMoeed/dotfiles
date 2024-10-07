import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayProgressBar,
  IPayText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayCarousel } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import { setAppData } from '@app/store/slices/app-data-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import checkUserAccess from '@app/utilities/check-user-access';
import { buttonVariants, DashboardOptions } from '@app/utilities';
import { balancePercentage, formatNumberWithCommas } from '@app/utilities/number-helper.util';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useCallback } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { openBrowser } from '@swan-io/react-native-browser';
import { View } from 'react-native';
import useCarouselData from './ipay-balance-box.data';
import { CarouselItem, IPayBalanceBoxProps } from './ipay-balance-box.interface';
import genratedStyles from './ipay-balance-box.styles';

/**
 * Props for the IPay Balance Box component.
 * @param {IPayBalanceBoxProps} props - The props for the IPay Balance Box component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {string} props.balance - User's account balance.
 * @param {string} props.totalBalance - Total account balance.
 * @param {boolean} props.hideBalance - Boolean flag to hide the balance display.
 * @param {function} props.walletInfoPress - Callback function invoked when the wallet information ('i' icon) is pressed.
 * @param {function} props.topUpPress - Callback function invoked when the top-up button is pressed.
 * @param {function} props.quickAction - Callback function for quick action.
 */
const IPayBalanceBox: React.FC<IPayBalanceBoxProps> = ({
  testID,
  balance = '5,200.40',
  hideBalance,
  walletInfoPress,
  topUpPress,
  quickAction,
  setBoxHeight,
  monthlyRemainingOutgoingAmount,
  monthlyOutgoingLimit,
  isLoading,
}) => {
  const carouselData = useCarouselData();
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const allowEyeIconFunctionality = useTypedSelector((state) => state.appDataReducer.appData.allowEyeIconFunctionality);
  const gradientLocations = [0, 0.8];

  const handleOnPress = useCallback(() => {
    openBrowser('https://ehsan.sa/', {
      onClose: () => {},
    });
  }, []);

  const onPressOption = (option: string) => {
    if (quickAction) quickAction();
    const hasAccess = checkUserAccess();
    if (hasAccess) {
      switch (option) {
        case DashboardOptions.ATM_WITHDRAWALS:
          navigate(screenNames.ATM_WITHDRAWALS, { hideBalance });
          break;
        case DashboardOptions.SEND_MONEY:
          navigate(screenNames.WALLET_TRANSFER);
          break;
        case DashboardOptions.LOCAL_TRANSFER:
          navigate(screenNames.LOCAL_TRANSFER, {});
          break;
        case DashboardOptions.INTERNATIONAL_TR:
          navigate(screenNames.INTERNATIONAL_TRANSFER);
          break;
        case DashboardOptions.BILL_PAYMENTS:
          navigate(screenNames.BILL_PAYMENTS_SCREEN);
          break;
        case DashboardOptions.SEND_GIFT:
          navigate(screenNames.SEND_GIFT);
          break;
        case DashboardOptions.REQUEST_MONEY:
          navigate(screenNames.REQUEST_MONEY);
          break;
        case DashboardOptions.MUSANED:
          navigate(screenNames.MUSANED);
          break;
        case DashboardOptions.EHSAN:
          handleOnPress();
          break;
        default:
          break;
      }
    }
  };

  const balanceValue = hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`;

  const renderDashboardOption = ({ item }: { item: CarouselItem }) => (
    <IPayPressable onPress={() => onPressOption(item?.navigate as string)}>
      <IPayView style={styles.subContainer}>
        <IPayView style={styles.iconConStyle}>
          {item.transfer_type === t('HOME.LOCAL_TRANSFER') || item?.text === t('HOME.EHSAN') ? (
            item?.icon
          ) : (
            <IPayGradientIcon icon={item?.icon} size={28} angle={125} gradientLocations={gradientLocations} useAngle />
          )}
        </IPayView>
        <IPayCaption2Text style={styles.iconTextStyle} text={item?.text} />
        {item?.isNew && (
          <IPayView style={styles.tagViewContainer}>
            <IPayText style={styles.tagViewText} text="COMMON.NEW" />
          </IPayView>
        )}
      </IPayView>
    </IPayPressable>
  );

  const renderCarouselItem = (item: CarouselItem) => (
    <IPayFlatlist
      data={item.data}
      numColumns={3}
      columnWrapperStyle={styles.gapListStyle}
      renderItem={({ item: option }) => renderDashboardOption({ item: option })}
    />
  );

  const onEyeIconPress = () => {
    dispatch(setAppData({ hideBalance: !hideBalance }));
  };
  const remainingSpendingLimit = parseFloat(monthlyRemainingOutgoingAmount);
  const monthlySpendingLimit = parseFloat(monthlyOutgoingLimit);
  return (
    <IPayView
      testID={`${testID}-balance-box`}
      style={styles.container}
      onLayout={({ nativeEvent }) => {
        const { height } = nativeEvent.layout;
        if (setBoxHeight) setBoxHeight(height);
      }}
    >
      {/* Card Text */}
      <IPayView style={styles.commonContainer}>
        <IPayView style={styles.eyeCon}>
          <IPayFootnoteText style={styles.textStyle} text="HOME.ACCOUNT_BALANCE" />
          {allowEyeIconFunctionality && (
            <IPayPressable onPress={onEyeIconPress}>
              <IPayIcon
                icon={hideBalance ? icons.eye_slash : icons.eyeBold}
                size={16}
                color={colors.natural.natural900}
              />
            </IPayPressable>
          )}
        </IPayView>
        <IPayPressable style={styles.eyeCon} onPress={walletInfoPress} disabled={isLoading}>
          <IPayFootnoteText style={styles.walletTextStyle} text="HOME.WALLET_INFO" isLoading={isLoading} />
          {!isLoading ? <IPayGradientIcon icon={icons.info_fetch} size={16} /> : <View />}
        </IPayPressable>
      </IPayView>

      <IPayView style={[styles.commonContainer, styles.gap]}>
        <IPayView style={styles.balanceContainer}>
          <IPayTitle2Text
            style={styles.balanceTextStyle}
            text={balanceValue}
            shouldTranslate={false}
            isLoading={isLoading}
          />
          {!isLoading && <IPayFootnoteText style={styles.currencyStyle} text="COMMON.SAR" />}
        </IPayView>
        <IPayButton
          onPress={topUpPress}
          btnType={buttonVariants.PRIMARY}
          leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.natural.natural0} />}
          btnText="COMMON.TOP_UP"
          btnStyle={styles.btnStyle}
          disabled={isLoading}
        />
      </IPayView>
      <IPayView style={styles.gap}>
        <IPayProgressBar
          gradientWidth={isLoading ? 0 : `${balancePercentage(monthlySpendingLimit, remainingSpendingLimit)}%`}
          colors={colors.gradientSecondary}
        />
      </IPayView>

      <IPayView style={[styles.gap, styles.commonContainer]}>
        <IPayCaption2Text style={styles.remainingAmountText} text="HOME.REMAINING_AMOUNT" />
        <IPayView style={styles.eyeCon}>
          <IPayCaption2Text
            style={styles.textBold}
            text={formatNumberWithCommas(remainingSpendingLimit)}
            isLoading={isLoading}
          />

          {!isLoading && (
            <IPayCaption2Text
              style={styles.textRegular}
              text={` ${t('HOME.OF')} ${formatNumberWithCommas(monthlySpendingLimit)}`}
              shouldTranslate={false}
            />
          )}
        </IPayView>
      </IPayView>
      <IPayView style={styles.lineBorderStyle} />

      <IPayCarousel
        stylePagination={styles.paginationStyle}
        pagination
        style={styles.paginationMain}
        width={scale(270)}
        height={verticalScale(140)}
        data={carouselData}
        renderItem={({ item }) => renderCarouselItem(item)}
      />
    </IPayView>
  );
};

export default IPayBalanceBox;
