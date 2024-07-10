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
import IpayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { dashboardOptions } from '@app/utilities/enums.util';
import { formatNumberWithCommas } from '@utilities/number-comma-helper.util';
import React, { forwardRef } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { carouselData } from './ipay-balance-box.data';
import { IPayBalanceBoxProps } from './ipay-balance-box.interface';
import genratedStyles from './ipay-balance-box.styles';

const IPayBalanceBox: React.FC<IPayBalanceBoxProps> = forwardRef<{}, IPayBalanceBoxProps>(
  (
    {
      testID,
      balance = '5,200.40',
      totalBalance = '20,000',
      hideBalance,
      walletInfoPress,
      topUpPress,
      quickAction,
      setBoxHeight,
    },
    ref,
  ) => {
    const buttonTypes = constants.BUTTON_TYPES;
    const { colors } = useTheme();
    const styles = genratedStyles(colors);
    const localizationText = useLocalization();

    const onPressOption = (option: string) => {
      if (quickAction) quickAction();
      switch (option) {
        case dashboardOptions.ATM_WITHDRAWALS:
          navigate(screenNames.ATM_WITHDRAWALS, { hideBalance });
          break; // Add break statement to prevent fall-through
        default:
          return null;
      }
    };

    const balanceValue = hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`;
    const totalAvailableBalance = ` ${localizationText.of} ${hideBalance ? '*****' : formatNumberWithCommas(totalBalance)}`;

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
            <IPayPressable>
              <IPayIcon icon={hideBalance ? icons.eye_slash : icons.eye} size={16} color={colors.natural.natural900} />
            </IPayPressable>
          </IPayView>

          <IPayView style={styles.eyeCon}>
            <IPayFootnoteText style={styles.textStyle} text={localizationText.YOUR_CUSTOM_TEXT_HERE} />
            {/* Replace with your text */}
            <IPayPressable onPress={walletInfoPress}>
              <IpayGradientIcon icon={icons.info_fetch} size={16} />
            </IPayPressable>
          </IPayView>
        </IPayView>

        {/* Balance Text */}
        <IPayView style={[styles.commonContainer, styles.gap]}>
          <IPayView style={styles.balanceContainer}>
            <IPayTitle2Text style={styles.balanceTextStyle} text={balanceValue} />
            <IPayFootnoteText style={styles.currencyStyle} text={localizationText.COMMON.SAR} />
          </IPayView>
          <IPayButton
            onPress={topUpPress}
            btnType={buttonTypes.PRIMARY}
            leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.natural.natural0} />}
            btnText={localizationText.COMMON.TOP_UP}
            btnStyle={styles.btnStyle}
          />
        </IPayView>
        <IPayView style={styles.gap}>
          <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
        </IPayView>

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text text={localizationText.HOME.REMAINING_AMOUNT} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text style={styles.textBold} text={balanceValue} />
            <IPayCaption2Text text={totalAvailableBalance} />
          </IPayView>
        </IPayView>

        {/* Line */}
        <IPayView style={styles.lineBorderStyle} />
        {/* Icon Carousel */}
        <IPayCarousel
          stylePagination={styles.paginationStyle}
          pagination
          style={styles.paginationMain}
          width={scale(270)}
          height={verticalScale(140)}
          data={carouselData}
          renderItem={({ item }: any) => (
            <IPayFlatlist
              data={item.data}
              numColumns={3}
              columnWrapperStyle={styles.gapListStyle}
              renderItem={({ item }) => (
                <IPayPressable onPress={() => onPressOption(item?.text)}>
                  <IPayView style={styles.subContainer}>
                    <IPayView style={styles.iconConStyle}>
                      {item.text === localizationText.HOME.LOCAL_TRANSFER ? (
                        item?.icon
                      ) : (
                        <IpayGradientIcon icon={item?.icon} size={28} />
                      )}
                    </IPayView>
                    <IPayCaption2Text style={styles.iconTextStyle} text={item?.text} />
                    {item?.showTag && (
                      <IPayView style={styles.tagViewContainer}>
                        <IPayText style={styles.tagViewText}>{localizationText.COMMON.NEW}</IPayText>
                      </IPayView>
                    )}
                  </IPayView>
                </IPayPressable>
              )}
            />
          )}
        />
      </IPayView>
    );
  },
);

export default IPayBalanceBox;
