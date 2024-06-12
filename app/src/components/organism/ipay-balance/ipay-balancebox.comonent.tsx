import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayPressable,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayCarousel } from '@app/components/molecules';
import IpayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { SCREEN_WIDTH } from '@app/styles/mixins';
import { forwardRef } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { getCarouselData } from './ipay-balancebox.data';
import { IPayBalanceBoxProps } from './ipay-balancebox.interface';
import genratedStyles from './ipay-balancebox.styles';

const IPayBalanceBox = forwardRef<{}, IPayBalanceBoxProps>(
  ({ testID, balance = '5,200.40', totalBalance = '20,000', walletInfoPress, topUpPress, quickAction }, ref) => {
    const buttonTypes = constants.BUTTON_TYPES;
    const { colors } = useTheme();
    const styles = genratedStyles(colors);
    const localizationText = useLocalization();
    const carouselData = getCarouselData(localizationText);

    return (
      <IPayView testID={testID} style={[styles.container]}>
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
            leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.lightColorPalette.white} />}
            btnText={localizationText.topUp}
            btnStyle={styles.btnStyle}
            textStyle={styles.textStyle}
          />
        </IPayView>
        {/* <IPayView style={[styles.gap]}>
          <IPayProgressBar progressStyle={styles.progressBarStyle} colors={colors.gradientTertiary} />
        </IPayView> */}

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text style={styles.captionTextStyle} text={localizationText.remainingAmount} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text style={[styles.captionTextStyle, styles.captionBoldNumStyle]} text={balance} />
            <IPayCaption2Text style={styles.captionTextStyle} text={` ${localizationText.of} ${totalBalance}`} />
          </IPayView>
        </IPayView>

        {/* Line */}
        <IPayView style={styles.lineBorderStyle} />
        {/* Icon Carousel */}

        <IPayCarousel
          stylePagination={styles.paginationStyle}
          pagination
          width={SCREEN_WIDTH > 600 ? SCREEN_WIDTH / 1.5 : moderateScale(283)}
          height={moderateScale(186)}
          data={carouselData}
          renderItem={({ item, index }: any) => (
            <IPayFlatlist
              data={item.data}
              numColumns={3}
              contentContainerStyle={[styles.gapListRow]}
              columnWrapperStyle={styles.gapListStyle}
              renderItem={({ item, index }) => (
                <IPayPressable onPress={quickAction}>
                  <IPayView style={styles.subContainer}>
                    <IPayView style={styles.iconConStyle}>
                      <IpayGradientIcon icon={item?.icon} size={25} />
                    </IPayView>
                    <IPayCaption2Text style={styles.iconTextStyle} text={item?.text} />
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
