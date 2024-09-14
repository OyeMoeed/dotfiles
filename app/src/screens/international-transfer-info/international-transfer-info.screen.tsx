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
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayCountryCurrencyBox, IPaySafeAreaView } from '@app/components/templates';
import useTransferMethodsData from '@app/components/templates/ipay-country-currency-box/ipay-country-currency-box.constant';
import { BeneficiariesDetails, LocalizationKeysMapping } from '@app/enums/international-beneficiary-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import WUBeneficiaryDetailsMetaDataProps, {
  WUTransferReason,
} from '@app/network/services/international-transfer/wu-beneficiary-details-metadata/wu-beneficiary-details-metadata.interface';
import getWUBeneficiaryInfoMetaData from '@app/network/services/international-transfer/wu-beneficiary-details-metadata/wu-beneficiary-details-metadata.service';
import { FeesInquiryPayload } from '@app/network/services/international-transfer/wu-fees-inquiry/wu-fees-inquiry.interface';
import westerUnionFeesInquiry from '@app/network/services/international-transfer/wu-fees-inquiry/wu-fees-inquiry.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { isAndroidOS } from '@app/utilities/constants';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import Flag from 'react-native-round-flags';
import { useTranslation } from 'react-i18next';
import { OptionItem } from '../international-transfer-success/international-transfer-success.interface';
import beneficiaryKeysMapping from './international-transfer-info.constant';
import InternationalBeneficiariesDetails from './international-transfer-info.interface';
import transferInfoStyles from './international-transfer-info.style';

const InternationalTransferInfoScreen: React.FC = ({ route }: any) => {
  const { t } = useTranslation();
  const { transferData } = route.params;
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
  const [transferGateway, setTransferGateway] = useState<{} | null>(null);
  const [apiError, setAPIError] = useState<string>('');
  const [beneficiaryDetailsData, setBeneficiaryDetailsData] = useState<WUTransferReason[]>([]);
  const [wuFeesInquiryData, setWUFeesInquiryData] = useState({});

  const { showToast } = useToastContext();

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const transferFees = `${t('LOCAL_TRANSFER.FEES')} ${beneficiaryDummyData.fee} ${t('COMMON.AND_VAT')} ${beneficiaryDummyData.vat}`;

  const onPressNext = () => navigate(ScreenNames.INTERNATIONAL_TRANSFER_CONFIRMATION);

  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, image } = item;
    const localizationKey = LocalizationKeysMapping[label as keyof InternationalBeneficiariesDetails];
    const localization = t('INTERNATIONAL_TRANSFER[localizationKey] || label');

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

  const flattenBeneficiaryDetails = (details) => {
    const { beneficiaryBankDetail, ...rest } = details;
    return {
      ...rest,
      ...beneficiaryBankDetail,
    };
  };

  const getGeneratedBeneficiary = (includesKeys = []) =>
    Object.keys(flattenBeneficiaryDetails(transferData))
      ?.map((key) => ({ label: key, value: transferData[key] }))
      ?.filter((key) => includesKeys.includes(key?.label));

  const onPressNext = () =>
    navigate(ScreenNames.INTERNATIONAL_TRANSFER_CONFIRMATION, {
      beneficiaryData: {
        ...flattenBeneficiaryDetails(transferData),
        selectedReason,
        transferGateway: transferGateway?.transferMethod,
      },
      feesInquiryData: { beneficiaryCurrencyAmount, remitterCurrencyAmount, isIncludeFees, ...wuFeesInquiryData },
    });

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getBeneficiariesDetailsData = async () => {
    try {
      const apiResponse: WUBeneficiaryDetailsMetaDataProps = await getWUBeneficiaryInfoMetaData(
        transferData?.beneficiaryCode,
      );
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setBeneficiaryDetailsData(apiResponse?.response?.transferReasonList);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const wuFeesInquiry = async () => {
    const payload: FeesInquiryPayload = {
      amount: '',
      amountCurrency: remitterCurrencyAmount,
      convertedAmountCurrency: beneficiaryCurrencyAmount,
      deductFeesFromAmount: isIncludeFees,
      promoCode: '',
      deviceInfo: await getDeviceInfo(),
    };
    try {
      const apiResponse = await westerUnionFeesInquiry(payload, transferData?.beneficiaryCode);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setWUFeesInquiryData(apiResponse?.response);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getBeneficiariesDetailsData();
  }, []);

  useEffect(() => {
    wuFeesInquiry();
  }, [isIncludeFees]);

  const handleAmountInputChange = (text) => {
    const exchangeRate = 12.8; // TODO for need 1 SAR = 12.8 EGP
    setRemitterCurrencyAmount(text);
    const egpAmount = text * exchangeRate;
    setBeneficiaryCurrencyAmount(egpAmount?.toFixed(2));
  };

  const transferFees = localizationText.LOCAL_TRANSFER.FEES;
  const feeAmount = `${wuFeesInquiryData?.feeAmount ?? ''} ${localizationText.COMMON.SAR}`;
  const transferVat = localizationText.COMMON.AND_VAT;
  const vatAmount = `${wuFeesInquiryData?.vatAmount ?? ''} ${localizationText.COMMON.SAR}`;

  const onTransferGateway = (methodName: string, index: number) => {
    setTransferGateway({ transferMethod: methodName, index });
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title="TRANSFER.TRANSFER_INFRORMATION" applyFlex />
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
                title={transferData?.fullName}
                subTitle={transferData?.countryDesc}
                adjacentSubTitle={transferData?.remittanceTypeDesc}
                isShowSubTitle
                isShowLeftIcon
                leftIcon={<Flag code={transferData?.countryCode} style={styles.nationalFlag} />}
                rightText={
                  <IPayButton
                    btnIconsDisabled
                    btnType={buttonVariants.LINK_BUTTON}
                    btnText="COMMON.VIEW_DETAILS"
                    onPress={() => beneficiaryDetailsRef.current.present()}
                  />
                }
              />
            </IPayView>
            <IPayView>
              <IPaySectionList
                ref={sectionListRef}
                sections={transferMethods}
                renderItem={({ item: transferMethod, index }) => {
                  const isCheck = transferGateway?.index === index;
                  return (
                    <IPayCountryCurrencyBox
                      transferMethod={transferMethod}
                      isChecked={isCheck}
                      onRemitterAmountChange={handleAmountInputChange}
                      remitterCurrencyAmount={remitterCurrencyAmount}
                      beneficiaryCurrencyAmount={beneficiaryCurrencyAmount}
                      onTransferMethodChange={() => onTransferGateway(transferMethod?.transferMethodName, index)}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </IPayView>
            <IPayView>
              <IPayView style={styles.feeContainer}>
                <IPayView style={styles.feeText}>
                  <IPayView>
                    <IPayFootnoteText color={colors.natural.natural900} text="COMMON.INCLUDE_FEES" />
                    <IPayCaption1Text
                      color={colors.natural.natural500}
                    >{`${transferFees} ${feeAmount} ${transferVat} ${vatAmount}`}</IPayCaption1Text>
                  </IPayView>
                </IPayView>
                <IPayToggleButton toggleState={isIncludeFees} onToggleChange={() => setIsIncludeFees(!isIncludeFees)} />
              </IPayView>
              <IPayView>
                <IPayAnimatedTextInput
                  label="COMMON.REASON_OF_TRANSFER"
                  editable={false}
                  value={selectedReason?.desc}
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
          btnText="COMMON.NEXT"
          btnType={buttonVariants.PRIMARY}
          large
          disabled={!selectedReason?.desc}
          btnIconsDisabled
          btnStyle={styles.nextBtn}
          onPress={onPressNext}
        />
      </IPayView>
      <IPayBottomSheet
        heading="COMMON.REASON_OF_TRANSFER"
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
            data={beneficiaryDetailsData}
            renderItem={({ item }) => (
              <IPayList
                key={item}
                style={styles.listItem}
                title={item?.desc}
                isShowIcon={selectedReason?.desc === item?.desc}
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
        heading="INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS"
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
            data={getGeneratedBeneficiary(beneficiaryKeysMapping[BeneficiariesDetails.INFORMATIONS])}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(t('INTERNATIONAL_TRANSFER.BENEFECIARY_INFORMATION'))}
          />
          <IPayFlatlist
            data={getGeneratedBeneficiary(beneficiaryKeysMapping[BeneficiariesDetails.DETAILS])}
            showsVerticalScrollIndicator={false}
            renderItem={renderOption}
            ListHeaderComponent={renderListHeader(t('INTERNATIONAL_TRANSFER.BENEFECIARY_DETAILS'))}
          />
        </IPayView>
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default InternationalTransferInfoScreen;
