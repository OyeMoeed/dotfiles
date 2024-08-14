import icons from '@app/assets/icons';
import { IPayGradientText, IPayHeader, IPayOutlineButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { KycFormCategories } from '@app/enums/customer-knowledge.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView
} from '@components/atoms';

import images from '@app/assets/images';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { IFormData } from '@app/components/templates/ipay-customer-knowledge/ipay-customer-knowledge.interface';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { IWalletUpdatePayload } from '@app/network/services/core/update-wallet/update-wallet.interface';
import walletUpdate from '@app/network/services/core/update-wallet/update-wallet.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { setUserInfo } from '@app/store/slices/user-information-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { spinnerVariant } from '@app/utilities/enums.util';
import { IPayCustomerKnowledge, IPayNafathVerification, IPaySafeAreaView } from '@components/templates';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import profileStyles from './profile.style';
import useChangeImage from './proflie.changeimage.component';

const Profile = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = profileStyles(colors);
  const [userData, setUserData] = useState<object[]>([]);

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const dispatch = useTypedDispatch();
  const { selectedImage, showActionSheet, IPayActionSheetComponent, IPayAlertComponent } = useChangeImage();
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();
  const renderToast = (toastMsg: string, apiError: string = '') => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const formatAddress = (userInfoData: any) => {
    const { street, city, townCountry } = userInfoData;

    if (!city && !street && !townCountry) {
      return 'N/A';
    }

    return `${street ? `${street},` : ''} ${city ? `${city},` : ''} ${townCountry ? `${townCountry}` : ''}`
      .trim()
      .replace(/,\s*,/g, ',');
  };

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

  const updateProfileImage = async () => {
    renderSpinner(true);
    const apiResponse = await walletUpdate(
      {
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        profileImage: `data:image/jpeg;base64,${selectedImage}`,
      },
      walletInfo.walletNumber,
    );
    if (apiResponse?.status?.type === 'SUCCESS') {
      dispatch(setUserInfo({ profileImage: `data:image/jpeg;base64,${selectedImage}` }));
      renderSpinner(false);
    } else {
      renderToast(localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderSpinner(false);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      updateProfileImage();
    }
  }, [selectedImage]);

  const mapUserDataToDesiredFormat = (userInfoData: any) => [
    { key: 'name', text: 'Name', details: userInfoData.fullName || 'N/A' },
    { key: 'mobile', text: 'Mobile Number', details: userInfoData.mobileNumber || 'N/A' },
    { key: 'nationalAddress', text: 'National Address', details: formatAddress(userInfoData) },
  ];

  useEffect(() => {
    if (userInfo && walletInfo) {
      const userInfoData: any = {
        fullName: userInfo.fullName,
        ...walletInfo.addressDetails,
        ...walletInfo.userContactInfo,
        ...walletInfo.accountBasicInfo,
        ...walletInfo.workDetails,
      };

      // Create the userDataArray in the desired format
      const transformedData = mapUserDataToDesiredFormat(userInfoData);
      setUserData(transformedData);
    }
  }, [userInfo, walletInfo]);

  const kycBottomSheetRef = useRef<BottomSheetModal>(null);
  const nafathVerificationBottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    kycBottomSheetRef.current?.present();
  };

  const onCloseNafathVerificationSheet = () => {
    nafathVerificationBottomSheetRef.current?.close();
  };

  const openNafathBottomSheet = () => {
    nafathVerificationBottomSheetRef.current?.present();
  };

  const defaultSnapPoint = ['1%', isAndroidOS ? '99%' : '92%'];
  const smallSnapPoint = ['1%', '55%', isAndroidOS ? '99%' : '92%'];

  const [category, setCategory] = useState<string>(KycFormCategories.CUSTOMER_KNOWLEDGE);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(defaultSnapPoint);

  const renderPersonalInfo = ({ item }) => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText style={styles.personalInfoCardTitleText} regular>
        {item.text}
      </IPayFootnoteText>
      <IPaySubHeadlineText regular style={styles.subHeadline} numberOfLines={2}>
        {item.details}
      </IPaySubHeadlineText>
    </IPayView>
  );

  const handlePress = () => {
    showActionSheet();
  };
  const cardData = [
    {
      key: 'identityVerification',
      icon: <IPayImage style={styles.imageStyle} image={images.nafathLogo} />,
      text: localizationText.COMMON.INDENTITY_VERIFICATION,
      button: {
        text: localizationText.COMMON.VERIFY,
        iconColor: colors.primary.primary500,
        disabled: false,
        onPress: () => openNafathBottomSheet(),
      },
    },
    {
      key: 'customerKnowledgeForm',
      icon: <IPayIcon icon={icons.DOCUMENT} color={colors.primary.primary900} size={20} />,
      text: localizationText.PROFILE.CUSTOMER_KNOWLEDGE_FORM,
      button: {
        text:
          walletInfo.accountBasicInfoCompleted && walletInfo.nationalAddressComplete
            ? localizationText.PROFILE.EDIT
            : localizationText.PROFILE.COMPLETE,
        iconColor: colors.natural.natural300,
        disabled: false,
        onPress: () => openBottomSheet(),
      },
    },
  ];
  const renderItem = ({ item }) => (
    <IPayView style={styles.cardStyle}>
      <IPayView style={styles.cardText}>
        {item.icon}
        <IPayFootnoteText regular style={styles.headingStyles}>
          {item.text}
        </IPayFootnoteText>
      </IPayView>
      <IPayOutlineButton
        rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={14} color={colors.primary.primary500} />}
        btnText={item.button.text}
        onPress={() => item.button.onPress()}
        disabled={item.button.disabled}
      />
    </IPayView>
  );
  const renderOverlayIcon = () => (
    <IPayPressable onPress={handlePress} style={styles.overlayIcon}>
      <IPayView style={styles.addPhotoIcon}>
        <IPayImage image={images.galleryAdd} style={styles.galaryImage} />
      </IPayView>
    </IPayPressable>
  );
  const isSmallSheet = category === KycFormCategories.INCOME_SOURCE || category === KycFormCategories.MONTHLY_INCOME;
  const handleChangeCategory = (value: string) => {
    const useSmallSheet = value === KycFormCategories.INCOME_SOURCE || value === KycFormCategories.MONTHLY_INCOME;
    setSnapPoint(useSmallSheet ? smallSnapPoint : defaultSnapPoint);
    setCategory(value);
  };

  const getUpadatedWalletData = async (walletNumber: string) => {
    renderSpinner(true);
    const payload = {
      walletNumber,
    };
    await getWalletInfo(payload, dispatch);
    renderSpinner(false);
  };

  const updateWalletKYC = async (formData: IFormData) => {
    const payload: IWalletUpdatePayload = {
      incomeSource: formData.income_source.code,
      monthlyIncomeAmount: formData.monthly_income.code,
      workDetails: {
        occupation: formData.occupation.recTypeCode,
        industry: formData.employee_name,
      },
      userContactInfo: {
        city: formData.city_name.recTypeCode,
        address: `${formData.street_name} ${formData.city_name.recDescription}`,
        postalCode: formData.postal_code,
      },
      addressDetails: {
        district: formData.district,
        street: formData.street_name,
        buildingNumber: formData.building_number,
        unitNumber: formData.unit_number,
        additionalNumber: formData.additional_code,
        poBox: formData.postal_code,
      },
      deviceInfo: appData.deviceInfo as DeviceInfoProps,
    };
    renderSpinner(true);
    const walletUpdateResponse = await walletUpdate(payload, userInfo.walletNumber as string);
    if (walletUpdateResponse.status.type === 'SUCCESS') {
      getUpadatedWalletData(walletUpdateResponse?.response?.walletNumber as string);
    }
    renderSpinner(false);
  };

  const onSubmit = (formData: IFormData) => {
    kycBottomSheetRef.current?.close();
    updateWalletKYC(formData);
  };

  const onCloseKycSheet = () => {
    if (category !== KycFormCategories.CUSTOMER_KNOWLEDGE) {
      setSnapPoint(defaultSnapPoint);
      setCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
    } else {
      kycBottomSheetRef.current?.close();
    }
  };

  const getInitialLetterOfName = useCallback(
    (name: string) => {
      const words = name.split(' ');
      return `${words[0][0]}${words[1] ? words[1][0] : ''}`;
    },
    [userInfo.fullName],
  );

  return (
    <>
      <IPaySafeAreaView style={styles.SafeAreaView2}>
        <IPayHeader title={localizationText.PROFILE.TITLE} backBtn applyFlex />
        <IPayView style={styles.imageContainer}>
          <IPayPressable>
            {selectedImage || userInfo.profileImage ? (
              <IPayImage
                image={{ uri: selectedImage ? `data:image/jpeg;base64,${selectedImage}` : userInfo.profileImage }}
                style={styles.image}
              />
            ) : (
              <IPayView style={[styles.image, styles.initialsContainer]}>
                <IPayGradientText
                  yScale={22}
                  fontSize={typography.FONT_VARIANTS.TITLE_LARGE.FONT_SIZE}
                  text={getInitialLetterOfName(userInfo?.fullName || '')}
                  gradientColors={colors.appGradient.gradientPrimary10}
                />
              </IPayView>
            )}
            {renderOverlayIcon()}
          </IPayPressable>
        </IPayView>
        <IPayView>
          <IPayView style={styles.body1}>
            <IPayFootnoteText regular style={styles.containerHeadings}>
              {localizationText.PROFILE.REGISTERATION_COMPLETION}
            </IPayFootnoteText>
            <IPayFlatlist
              style={styles.listStyle}
              testID="profile"
              scrollEnabled={false}
              data={cardData}
              renderItem={renderItem}
              contentContainerStyle={styles.listBody}
            />
          </IPayView>
          <IPayView style={styles.body2}>
            <IPayFootnoteText regular style={styles.containerHeadings}>
              {localizationText.COMMON.PERSONAL_INFO}
            </IPayFootnoteText>
            <IPayFlatlist
              // scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              style={styles.listStyle}
              testID="profile"
              data={userData}
              renderItem={renderPersonalInfo}
              keyExtractor={(item) => item.key}
            />
          </IPayView>
        </IPayView>
        {IPayActionSheetComponent}
        {IPayAlertComponent}
      </IPaySafeAreaView>
      <IPayBottomSheet
        animate={false}
        noGradient
        heading={localizationText.PROFILE[category]}
        customSnapPoint={snapPoint}
        onCloseBottomSheet={onCloseKycSheet}
        ref={kycBottomSheetRef}
        simpleBar
        cancelBnt
        bold
        isPanningGesture={isSmallSheet}
      >
        <IPayCustomerKnowledge category={category} onChangeCategory={handleChangeCategory} onSubmit={onSubmit} />
      </IPayBottomSheet>
      <IPayBottomSheet
        heading={localizationText.COMMON.INDENTITY_VERIFICATION}
        onCloseBottomSheet={onCloseNafathVerificationSheet}
        ref={nafathVerificationBottomSheetRef}
        customSnapPoint={defaultSnapPoint}
        simpleBar
        cancelBnt
        bold
      >
        <IPayNafathVerification onComplete={onCloseNafathVerificationSheet} />
      </IPayBottomSheet>
    </>
  );
};

export default Profile;
