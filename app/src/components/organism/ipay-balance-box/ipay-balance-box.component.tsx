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
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { dashboardOptions } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { forwardRef } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { setAppData } from '@app/store/slices/app-data-slice';
import { useTypedDispatch } from '@store/store';
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
const IPayBalanceBox: React.FC = forwardRef<{}, IPayBalanceBoxProps>(
  ({
    testID,
    balance = '5,200.40',
    totalBalance = '20,500',
    hideBalance,
    walletInfoPress,
    topUpPress,
    quickAction,
    setBoxHeight,
    dailyRemainingOutgoingAmount,
    monthlyIncomingLimit,
  }) => {
    const carouselData = useCarouselData();
    const buttonTypes = constants.BUTTON_TYPES;
    const { colors } = useTheme();
    const styles = genratedStyles(colors);
    const localizationText = useLocalization();
    const dispatch = useTypedDispatch();

    const onPressOption = (option: string) => {
      if (quickAction) quickAction();
      switch (option) {
        case dashboardOptions.ATM_WITHDRAWALS:
          navigate(screenNames.ATM_WITHDRAWALS, { hideBalance });
          break;
        case dashboardOptions.SEND_MONEY:
          navigate(screenNames.WALLET_TRANSFER);
          break;
        case dashboardOptions.LOCAL_TRANSFER:
          navigate(screenNames.LOCAL_TRANSFER, {});
          break;
        case dashboardOptions.BILL_PAYMENTS:
          navigate(screenNames.MOI_PAYMENT_SCREEN);
          break;
        case dashboardOptions.SEND_GIFT:
          navigate(screenNames.SEND_GIFT);
          break;
        case dashboardOptions.REQUEST_MONEY:
          navigate(screenNames.REQUEST_MONEY);
          break;
        default:
          break;
      }
      return null; // Consistently return null at the end of the function
    };

    const balanceValue = hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`;
    const totalAvailableBalance = ` ${
      localizationText.HOME.OF
    } ${hideBalance ? '*****' : formatNumberWithCommas(totalBalance)}`;

    const renderDashboardOption = ({ item }: { item: CarouselItem }) => (
      <IPayPressable onPress={() => onPressOption(item?.navigate as string)}>
        <IPayView style={styles.subContainer}>
          <IPayView style={styles.iconConStyle}>
            {item.transfer_type === localizationText.HOME.LOCAL_TRANSFER ? (
              item?.icon
            ) : (
              <IPayGradientIcon icon={item?.icon} size={28} />
            )}
          </IPayView>
          <IPayCaption2Text style={styles.iconTextStyle} text={item?.text} />
          {item?.isNew && (
            <IPayView style={styles.tagViewContainer}>
              <IPayText style={styles.tagViewText}>{localizationText.COMMON.NEW}</IPayText>
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
            <IPayFootnoteText style={styles.textStyle} text={localizationText.HOME.ACCOUNT_BALANCE} />
            <IPayPressable onPress={onEyeIconPress}>
              <IPayIcon
                icon={hideBalance ? icons.eye_slash : icons.eyeBold}
                size={16}
                color={colors.natural.natural900}
              />
            </IPayPressable>
          </IPayView>

          <IPayView style={styles.eyeCon}>
            <IPayFootnoteText style={styles.walletTextStyle} text={localizationText.HOME.WALLET_INFO} />
            <IPayPressable onPress={walletInfoPress}>
              <IPayGradientIcon icon={icons.info_fetch} size={16} />
            </IPayPressable>
          </IPayView>
        </IPayView>

        <IPayView style={[styles.commonContainer, styles.gap]}>
          <IPayView style={styles.balanceContainer}>
            <IPayTitle2Text style={styles.balanceTextStyle} text={balanceValue} />
            <IPayFootnoteText style={styles.currencyStyle} text={localizationText.COMMON.SAR} />
          </IPayView>
          <IPayButton
            onPress={topUpPress}
            btnType={buttonTypes.PRIMARY}
            leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.natural.natural0} />}
            btnText={localizationText.COMMON.TOP_UP}
            btnStyle={styles.btnStyle}
          />
        </IPayView>
        <IPayView style={styles.gap}>
          <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
        </IPayView>

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text style={styles.remainingAmountText} text={localizationText.HOME.REMAINING_AMOUNT} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text style={styles.textBold} text={dailyRemainingOutgoingAmount} />

            <IPayCaption2Text
              style={styles.textRegular}
              text={` ${localizationText.HOME.OF} ${monthlyIncomingLimit}`}
            />
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
  },
);

export default IPayBalanceBox;
