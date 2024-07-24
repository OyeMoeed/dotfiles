import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayProgressBar,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayAnimatedTextInput, IPayButton, IPayHeader, IPayList, IPayToggleButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayCountryCurrencyBox, IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import transferInfoDummyData from './international-transfer-info.constant';
import transferInfoStyles from './international-transfer-info.style';

const InternationalTransferInfoScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);
  const localizationText = useLocalization();
  const resonOfTransferSheet = useRef<any>(null);
  const [isIncludeFees, setIsIncludeFees] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.TRANSFER.TRANSFER_INFRORMATION} applyFlex />
      <IPayView style={styles.container}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView>
            <IPayView style={styles.accountBalanceView}>
              <IPayView style={styles.commonContainer}>
                <IPayView>
                  <IPayCaption2Text color={colors.primary.primary900} text={localizationText.HOME.ACCOUNT_BALANCE} />
                  <IPayView style={styles.balanceContainer}>
                    <IPayView>
                      <IPaySubHeadlineText
                        color={colors.primary.primary900}
                        text={transferInfoDummyData.accountBalance}
                      />
                    </IPayView>
                    <IPayView>
                      <IPaySubHeadlineText
                        color={colors.primary.primary900}
                        style={styles.currencyStyle}
                        text={localizationText.COMMON.SAR}
                      />
                    </IPayView>
                  </IPayView>
                </IPayView>
                <IPayButton
                  medium
                  btnType={buttonVariants.OUTLINED}
                  leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
                  btnText={localizationText.COMMON.TOP_UP}
                />
              </IPayView>
              <IPayView style={styles.gap}>
                <IPayProgressBar gradientWidth="70%" colors={colors.gradientSecondary} />
              </IPayView>
              <IPayView style={[styles.gap, styles.commonContainer]}>
                <IPayCaption2Text color={colors.natural.natural700} text={localizationText.HOME.REMAINING_AMOUNT} />
                <IPayView style={styles.remainingBalanceView}>
                  <IPayCaption2Text regular={false} text={transferInfoDummyData.remainingAmount} />
                  <IPayCaption2Text
                    color={colors.natural.natural500}
                    text={` ${localizationText.HOME.OF} ${transferInfoDummyData.totalAmount}`}
                  />
                </IPayView>
              </IPayView>
            </IPayView>
            <IPayView>
              <IPayList
                regularTitle={false}
                title={transferInfoDummyData.name}
                subTitle={transferInfoDummyData.country}
                adjacentSubTitle={transferInfoDummyData.via}
                isShowSubTitle
                isShowLeftIcon
                leftIcon={<IPayImage image={images.egyFlag} style={styles.nationalFlag} />}
                rightText={
                  <IPayButton btnIconsDisabled btnType="link-button" btnText={localizationText.COMMON.VIEW_DETAILS} />
                }
              />
            </IPayView>
            <IPayView>
              <IPayCountryCurrencyBox />
            </IPayView>
            <IPayView>
              <IPayView style={styles.feeContainer}>
                <IPayView style={styles.feeText}>
                  <IPayView>
                    <IPayFootnoteText color={colors.natural.natural900}>
                      {localizationText.COMMON.INCLUDE_FEES}
                    </IPayFootnoteText>
                    <IPayCaption1Text
                      color={colors.natural.natural500}
                    >{`${localizationText.LOCAL_TRANSFER.FEES} ${transferInfoDummyData.fee} ${localizationText.COMMON.AND_VAT} ${transferInfoDummyData.vat}`}</IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState={isIncludeFees} onToggleChange={() => setIsIncludeFees(!isIncludeFees)} />
              </IPayView>
              <IPayView>
                <IPayAnimatedTextInput
                  label={localizationText.COMMON.REASON_OF_TRANSFER}
                  editable={false}
                  value={selectedReason}
                  containerStyle={styles.inputContainerStyle}
                  customIcon={<IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />}
                  showRightIcon
                  onChangeText={() => {}}
                  onClearInput={() => resonOfTransferSheet.current.present()}
                />
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayScrollView>
        <IPayView style={styles.nextBtn}>
          <IPayButton
            btnText={localizationText.COMMON.NEXT}
            btnType="primary"
            large
            disabled={!selectedReason}
            btnIconsDisabled
          />
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.COMMON.REASON_OF_TRANSFER}
        customSnapPoint={['1%', '60%']}
        onCloseBottomSheet={() => resonOfTransferSheet.current.close()}
        ref={resonOfTransferSheet}
        simpleBar
        cancelBnt
        bold
      >
        <IPayView style={styles.reasonContainer}>
          <IPayFlatlist
            style={styles.reasonList}
            showsVerticalScrollIndicator={false}
            data={transferInfoDummyData.reasonOfTransfer}
            renderItem={({ item }) => (
              <IPayList
                key={item}
                style={styles.listItem}
                title={item}
                isShowIcon={selectedReason === item}
                icon={<IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />}
                onPress={() => {
                  setSelectedReason(item);
                  resonOfTransferSheet.current.close();
                }}
              />
            )}
          />
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferInfoScreen;
