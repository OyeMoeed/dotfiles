import React, { forwardRef } from 'react';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayPressable,
  IPayText,
  IPayTitle2Text,
  IPayView
} from '@app/components/atoms';
import { IPayBalanceBoxProps } from './ipay-balancebox.interface';
import styles from './ipay-balancebox.styles';
import { Add, Eye, InfoCircle, SendIcon } from '@app/assets/svgs/index';
import { IPayButton, IPayCarousel, IPayPrimaryButton } from '@app/components/molecules';
import constants from '@app/constants/constants';
import colors from '@app/styles/colors.const';
import useLocalization from '@app/localization/hooks/localization.hook';
import { carouselData } from './ipay-balancebox.data';
import IPayProgressBar from '@app/components/atoms/ipay-progressbar/ipay-progressbar.component';

const IPayBalanceBox = forwardRef<{}, IPayBalanceBoxProps>(
  ({ testID, balance = '5,200.40', totalBalance = '20,000', walletInfoPress, topUpPress, quickAction }, ref) => {
    const buttonTypes = constants.BUTTON_TYPES;
    const localizationText = useLocalization();
    return (
      <IPayView testID={testID} style={styles.container}>
        {/* Card Text */}
        <IPayView style={styles.commonContainer}>
          <IPayView style={styles.eyeCon}>
            <IPayFootnoteText style={styles.textStyle} text={localizationText.accountBalance} />
            <IPayPressable>
              <Eye />
            </IPayPressable>
          </IPayView>

          <IPayView style={styles.eyeCon}>
            <IPayFootnoteText style={styles.textStyle} text={localizationText.walletInfo} />
            <IPayPressable onPress={walletInfoPress}>
              <InfoCircle />
            </IPayPressable>
          </IPayView>
        </IPayView>
        {/* Balance Text */}
        <IPayView style={[styles.commonContainer, styles.gap]}>
          <IPayView style={styles.balanceContainer}>
            <IPayTitle2Text style={styles.balanceTextStyle} text={`${balance}`} />
            <IPayFootnoteText style={styles.currencyStyle} text={localizationText.sar} />
          </IPayView>
          <IPayButton
            onPress={topUpPress}
            btnType={buttonTypes.PRIMARY}
            leftIcon={<Add />}
            btnText={localizationText.topUp}
            btnStyle={styles.btnStyle}
          />
        </IPayView>
        {/* <IPayView style={[styles.gap]}>
          <IPayProgressBar colors={colors.gradientTertiary} />
        </IPayView> */}

        <IPayView style={[styles.gap, styles.commonContainer]}>
          <IPayCaption2Text text={localizationText.remainingAmount} />
          <IPayView style={styles.eyeCon}>
            <IPayCaption2Text text={balance} />
            <IPayCaption2Text text={` ${localizationText.of} ${totalBalance}`} />
          </IPayView>
        </IPayView>

        {/* Line */}
        <IPayView style={styles.lineBorderStyle} />
        {/*Icon Carousel*/}
        <IPayCarousel
          stylePagination={styles.paginationStyle}
          pagination
          width={281}
          height={186}
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
                          <IPayView style={styles.iconConStyle}>{item?.icon}</IPayView>
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
