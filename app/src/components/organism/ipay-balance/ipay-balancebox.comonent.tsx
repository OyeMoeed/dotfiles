import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayProgressBar,
  IPayTitle2Text,
  IPayView
} from '@app/components/atoms';
import { IPayButton, IPayCarousel } from '@app/components/molecules';
import IpayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { forwardRef } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { getCarouselData } from './ipay-balancebox.data';
import { IPayBalanceBoxProps } from './ipay-balancebox.interface';
import genratedStyles from './ipay-balancebox.styles';

const IPayBalanceBox: React.FC = forwardRef<{}, IPayBalanceBoxProps>(
  ({ testID, balance = '5,200.40', totalBalance = '20,000', walletInfoPress, topUpPress, quickAction }, ref) => {
    const buttonTypes = constants.BUTTON_TYPES;
    const { colors } = useTheme();
    const styles = genratedStyles(colors);
    const localizationText = useLocalization();
    const carouselData = getCarouselData(localizationText);

    return (
      <IPayView testID={`${testID}-balance-box`} style={styles.container}>
        {/* Card Text */}
        <IPayView style={[styles.commonContainer]}>
          <IPayView style={[styles.eyeCon]}>
            <IPayFootnoteText style={[styles.textStyle]} text={localizationText.accountBalance} />
            <IPayPressable>
              <IPayIcon icon={icons.eye} size={16} color={colors.darkColorPalette.black} />
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
            <IPayTitle2Text style={[styles.balanceTextStyle]} text={`${balance}`} />
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
          <IPayProgressBar colors={colors.gradientSecondary} />
        </IPayView>

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text text={localizationText.remainingAmount} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text style={styles.textBold} text={balance} />
            <IPayCaption2Text text={` ${localizationText.of} ${totalBalance}`} />
          </IPayView>
        </IPayView>

        {/* Line */}
        <IPayView style={styles.lineBorderStyle} />
        {/*Icon Carousel*/}
        <IPayCarousel
          stylePagination={styles.paginationStyle}
          pagination
          width={scale(260)}
          height={verticalScale(186)}
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
  }
);

export default IPayBalanceBox;
