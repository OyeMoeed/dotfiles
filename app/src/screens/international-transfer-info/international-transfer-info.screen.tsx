import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import IPaySectionList from '@app/components/atoms/ipay-section-list/ipay-section-list.component';
import {
  IPayAccountBalance,
  IPayAnimatedTextInput,
  IPayButton,
  IPayHeader,
  IPayList,
  IPayToggleButton,
} from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayCountryCurrencyBox, IPaySafeAreaView } from '@app/components/templates';
import useConverterData from '@app/components/templates/ipay-country-currency-box/ipay-country-currency-box.constant';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { SectionList } from 'react-native';
import transferInfoDummyData from './international-transfer-info.constant';
import transferInfoStyles from './international-transfer-info.style';

const InternationalTransferInfoScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);
  const localizationText = useLocalization();
  const resonOfTransferSheet = useRef<any>(null);
  const sectionListRef = useRef<SectionList>(null);
  const { converterData } = useConverterData();
  const [isIncludeFees, setIsIncludeFees] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [senderValue, setSenderValue] = useState<string>('');
  const [receiverValue, setReceiverValue] = useState<string>('');
  const [isCheck, setIsCheck] = useState<number | null>(null);
  // TODO will update this basis of API
  const dummyData = {
    balance: '5200',
    availableBalance: '20,000',
    totalAmount: '550',
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.TRANSFER.TRANSFER_INFRORMATION} applyFlex />
      <IPayView style={styles.contentContainer}>
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView>
            <IPayAccountBalance
              accountBalanceTextStyle={styles.darkStyle}
              currentBalanceTextStyle={styles.darkStyle}
              currencyTextStyle={styles.darkStyle}
              remainingAmountTextStyle={styles.remainingText}
              gradientWidth="50%"
              currentAvailableTextStyle={styles.currencyTextStyle}
              balance={dummyData.balance}
              availableBalance={dummyData.availableBalance}
              showRemainingAmount
              onPressTopup={() => {}}
            />
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
                  <IPayButton
                    btnIconsDisabled
                    btnType={buttonVariants.LINK_BUTTON}
                    btnText={localizationText.COMMON.VIEW_DETAILS}
                  />
                }
              />
            </IPayView>
            <IPayView>
              <IPaySectionList
                ref={sectionListRef}
                sections={converterData}
                renderItem={({ item, index }) => (
                  <IPayCountryCurrencyBox
                    item={item}
                    isChecked={isCheck === index}
                    onSenderChange={setSenderValue}
                    senderValue={senderValue}
                    onReceiverChange={setReceiverValue}
                    receiverValue={receiverValue}
                    onCheckChange={() => setIsCheck(index)}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
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
        <IPayButton
          btnText={localizationText.COMMON.NEXT}
          btnType={buttonVariants.PRIMARY}
          large
          disabled={!selectedReason}
          btnIconsDisabled
          btnStyle={styles.nextBtn}
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.COMMON.REASON_OF_TRANSFER}
        customSnapPoint={['1%', '60%']}
        onCloseBottomSheet={() => resonOfTransferSheet.current.close()}
        ref={resonOfTransferSheet}
        simpleBar
        cancelBnt
        bold
        noGradient
      >
        <IPayView style={[styles.reasonContainer, isAndroidOS ? {} : styles.iosContainerPadding]}>
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
