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
import useTheme from '@app/styles/hooks/theme.hook';
import { isIpad } from '@app/utilities/constants';
import { formatNumberWithCommas } from '@app/utilities/numberComma-helper.util';
import React, { forwardRef, useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { scale, verticalScale } from 'react-native-size-matters';
import { carouselData } from './ipay-balancebox.data';
import { IPayBalanceBoxProps } from './ipay-balancebox.interface';
import genratedStyles from './ipay-balancebox.styles';

const IPayBalanceBox: React.FC = forwardRef<{}, IPayBalanceBoxProps>(
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
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
      const checkDeviceType = () => {
        const tablet = DeviceInfo.isTablet();
        setIsTablet(tablet);
      };

      checkDeviceType();
    }, []);

    return (
      <IPayView
        testID={`${testID}-balance-box`}
        style={[styles.container, { height: isTablet || !!isIpad ? verticalScale(340) : verticalScale(310) }]}
        onLayout={({ nativeEvent }) => {
          const { height } = nativeEvent.layout;
          setBoxHeight && setBoxHeight(height);
        }}
      >
        {/* Card Text */}
        <IPayView style={[styles.commonContainer]}>
          <IPayView style={[styles.eyeCon]}>
            <IPayFootnoteText style={[styles.textStyle]} text={localizationText.accountBalance} />
            <IPayPressable>
              <IPayIcon icon={hideBalance ? icons.eye_slash : icons.eye} size={16} color={colors.natural.natural900} />
            </IPayPressable>
          </IPayView>

          <IPayView style={[styles.eyeCon]}>
            <IPayFootnoteText style={[styles.textStyle]} text={localizationText.walletInfo} />
            <IPayPressable onPress={walletInfoPress}>
              <IpayGradientIcon icon={icons.info_fetch} size={16} />
            </IPayPressable>
          </IPayView>
        </IPayView>

        {/* Balance Text */}
        <IPayView style={[styles.commonContainer, styles.gap]}>
          <IPayView style={[styles.balanceContainer]}>
            <IPayTitle2Text
              style={[styles.balanceTextStyle]}
              text={hideBalance ? '*****' : `${formatNumberWithCommas(balance)}`}
            />
            <IPayFootnoteText style={[styles.currencyStyle]} text={localizationText.sar} />
          </IPayView>
          <IPayButton
            onPress={topUpPress}
            btnType={buttonTypes.PRIMARY}
            leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.natural.natural0} />}
            btnText={localizationText.topUp}
            btnStyle={styles.btnStyle}
          />
        </IPayView>
        <IPayView style={[styles.gap]}>
          <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
        </IPayView>

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text text={localizationText.remainingAmount} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text style={styles.textBold} text={hideBalance ? '*****' : formatNumberWithCommas(balance)} />
            <IPayCaption2Text
              text={` ${localizationText.of} ${hideBalance ? '*****' : formatNumberWithCommas(totalBalance)}`}
            />
          </IPayView>
        </IPayView>

        {/* Line */}
        <IPayView style={styles.lineBorderStyle} />
        {/* Icon Carousel */}
        <IPayCarousel
          stylePagination={[styles.paginationStyle, isTablet && { top: verticalScale(10) }]}
          pagination
          style={{ marginStart: isTablet ? scale(3) : -scale(8) }}
          width={scale(270)}
          height={verticalScale(140)}
          data={carouselData}
          renderItem={({ item, index }: any) => {
            return (
              <>
                <IPayFlatlist
                  data={item.data}
                  numColumns={3}
                  columnWrapperStyle={styles.gapListStyle}
                  renderItem={({ item, index }) => {
                    return (
                      <IPayPressable onPress={quickAction}>
                        <IPayView style={styles.subContainer}>
                          <IPayView style={styles.iconConStyle}>
                            {item.text == 'Local transfer' ? (
                              item?.icon
                            ) : (
                              <IpayGradientIcon icon={item?.icon} size={28} />
                            )}
                          </IPayView>
                          <IPayCaption2Text style={styles.iconTextStyle} text={item?.text} />
                          {item?.showTag && (
                            <IPayView style={styles.tagViewContainer}>
                              <IPayText style={styles.tagViewText}>{'New'}</IPayText>
                            </IPayView>
                          )}
                        </IPayView>
                      </IPayPressable>
                    );
                  }}
                />
              </>
            );
          }}
        />
      </IPayView>
    );
  },
);

export default IPayBalanceBox;
