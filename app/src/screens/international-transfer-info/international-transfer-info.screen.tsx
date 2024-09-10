import icons from '@app/assets/icons';
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
import useTransferMethodsData from '@app/components/templates/ipay-country-currency-box/ipay-country-currency-box.constant';
import { LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { isAndroidOS } from '@app/utilities/constants';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useRef, useState } from 'react';
import { OptionItem } from '../international-transfer-success/international-transfer-success.interface';
import { internationalTransferBeneficiaryDetails } from '../international-transfer/international-transfer.constent';
import InternationalBeneficiariesDetails from './international-transfer-info.interface';
import transferInfoStyles from './international-transfer-info.style';

const InternationalTransferInfoScreen: React.FC = ({ route }: any) => {
  const { beneficiaryDummyData } = route.params;
  const { colors } = useTheme();
  const styles = transferInfoStyles(colors);
  const localizationText = useLocalization();
  const reasonOfTransferSheet = useRef<any>(null);
  const sectionListRef = useRef<any>(null);
  const beneficiaryDetailsRef = useRef<any>(null);
  const { transferMethods } = useTransferMethodsData();
  const [isIncludeFees, setIsIncludeFees] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [remitterCurrencyAmount, setRemitterCurrencyAmount] = useState<string>('');
  const [beneficiaryCurrencyAmount, setBeneficiaryCurrencyAmount] = useState<string>('');
  const [isCheck, setIsCheck] = useState<number | null>(null);

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const localTransfer = `${localizationText.LOCAL_TRANSFER.FEES} ${beneficiaryDummyData.fee} ${localizationText.COMMON.AND_VAT} ${beneficiaryDummyData.vat}`;

  const onPressNext = () => navigate(ScreenNames.INTERNATIONAL_TRANSFER_CONFIRMATION);

  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, image } = item;
    const localizationKey = LocalizationKeysMapping[label as keyof InternationalBeneficiariesDetails];
    const localization = localizationText.INTERNATIONAL_TRANSFER[localizationKey] || label;

    return (
      <IPayList
        containerStyle={styles.heightStyles}
        title={localization}
        detailText={value}
        detailTextStyle={styles.detailsText}
        isShowIcon
        icon={<IPayIcon icon={icon} color={colors.primary.primary500} />}
        rightText={image ? <IPayImage image={image} style={styles.listImage} /> : <IPayView />}
      />
    );
  };

  const renderListHeader = (heading: string) => (
    <IPayView style={styles.sheetListHeader}>
      <IPayFootnoteText color={colors.natural.natural500} text={heading} />
    </IPayView>
  );

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
              gradientWidth={`${getBalancePercentage(walletInfo?.currentBalance, walletInfo?.availableBalance)}%`}
              currentAvailableTextStyle={styles.currencyTextStyle}
              balance={walletInfo?.currentBalance}
              availableBalance={walletInfo?.availableBalance}
              showRemainingAmount
              onPressTopup={() => {}}
            />
            <IPayView>
              <IPayList
                regularTitle={false}
                title={beneficiaryDummyData.beneficiaryName}
                subTitle={beneficiaryDummyData.beneficiaryCountry}
                adjacentSubTitle={beneficiaryDummyData.beneficiaryType}
                isShowSubTitle
                isShowLeftIcon
                leftIcon={
                  <IPayImage image={beneficiaryDummyData.beneficiaryCurrencyFlag} style={styles.nationalFlag} />
                }
                rightText={
                  <IPayButton
                    btnIconsDisabled
                    btnType={buttonVariants.LINK_BUTTON}
                    btnText={localizationText.COMMON.VIEW_DETAILS}
                    onPress={() => beneficiaryDetailsRef.current.present()}
                  />
                }
              />
            </IPayView>
            <IPayView>
              <IPaySectionList
                ref={sectionListRef}
                sections={transferMethods}
                renderItem={({ item: transferMethod, index }) => (
                  <IPayCountryCurrencyBox
                    transferMethod={transferMethod}
                    isChecked={isCheck === index}
                    onRemitterAmountChange={setRemitterCurrencyAmount}
                    remitterCurrencyAmount={remitterCurrencyAmount}
                    onBeneficiaryAmountChange={setBeneficiaryCurrencyAmount}
                    beneficiaryCurrencyAmount={beneficiaryCurrencyAmount}
                    onTransferMethodChange={() => setIsCheck(index)}
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
                    <IPayCaption1Text color={colors.natural.natural500}>{localTransfer}</IPayCaption1Text>
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
                  onClearInput={() => reasonOfTransferSheet.current.present()}
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
          onPress={onPressNext}
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.COMMON.REASON_OF_TRANSFER}
        customSnapPoint={['1%', '60%']}
        onCloseBottomSheet={() => reasonOfTransferSheet.current.close()}
        ref={reasonOfTransferSheet}
        simpleBar
        cancelBnt
        bold
        noGradient
      >
        <IPayView style={[styles.reasonContainer, isAndroidOS ? {} : styles.iosContainerPadding]}>
          <IPayFlatlist
            style={styles.reasonList}
            showsVerticalScrollIndicator={false}
            data={beneficiaryDummyData.reasonOfTransfer}
            renderItem={({ item }) => (
              <IPayList
                key={item}
                style={styles.listItem}
                title={item}
                isShowIcon={selectedReason === item}
                icon={<IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />}
                onPress={() => {
                  setSelectedReason(item);
                  reasonOfTransferSheet.current.close();
                }}
              />
            )}
          />
        </IPayView>
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS}
        customSnapPoint={['1%', '90%']}
        onCloseBottomSheet={() => beneficiaryDetailsRef.current.close()}
        ref={beneficiaryDetailsRef}
        simpleBar
        cancelBnt
        bold
        noGradient
      >
        <IPayView style={styles.sheetContentContainer}>
          <IPayFlatlist
            data={internationalTransferBeneficiaryDetails.beneficiaryInfo}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(localizationText.INTERNATIONAL_TRANSFER.BENEFECIARY_INFORMATION)}
          />
          <IPayFlatlist
            data={internationalTransferBeneficiaryDetails.beneficiaryDetails}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(localizationText.INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS)}
          />
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferInfoScreen;
