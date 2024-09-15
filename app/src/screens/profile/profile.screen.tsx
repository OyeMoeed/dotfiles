import icons from '@app/assets/icons';
import { IPayChip, IPayHeader, IPayOutlineButton, IPayUserAvatar } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { KycFormCategories } from '@app/enums';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@components/atoms';

import images from '@app/assets/images';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IFormData } from '@app/components/templates/ipay-customer-knowledge/ipay-customer-knowledge.interface';
import { SNAP_POINT } from '@app/constants/constants';
import getWalletInfo from '@app/network/services/core/get-wallet/get-wallet.service';
import { IWalletUpdatePayload } from '@app/network/services/core/update-wallet/update-wallet.interface';
import walletUpdate from '@app/network/services/core/update-wallet/update-wallet.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { isBasicTierSelector, setWalletInfo } from '@app/store/slices/wallet-info-slice';
import { useTypedDispatch, useTypedSelector } from '@app/store/store';
import { States, ToastTypes } from '@app/utilities/enums.util';
import { IPayCustomerKnowledge, IPayNafathVerification, IPaySafeAreaView } from '@components/templates';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardKeys, UserFieldKeys } from './profile.interface';
import profileStyles from './profile.style';
import useChangeImage from './proflie.changeimage.component';

const Profile = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = profileStyles(colors);
  const [userData, setUserData] = useState<object[]>([]);
  const [kycVisible, setKycVisible] = useState<boolean>(false);

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const dispatch = useTypedDispatch();
  const { selectedImage, showActionSheet, IPayActionSheetComponent, IPayAlertComponent } = useChangeImage();
  const { showToast } = useToastContext();

  const formatAddress = (userInfoData: any) => {
    const { street, city, townCountry } = userInfoData;

    if (!city && !street && !townCountry) {
      return 'N/A';
    }

    return `${street ? `${street},` : ''} ${city ? `${city},` : ''} ${townCountry ? `${townCountry}` : ''}`
      .trim()
      .replace(/,\s*,/g, ',');
  };

  const renderUploadSuccessToast = () => {
    showToast({
      title: t('PROFILE.PROFILE_UPLOAD_SUCCESS_MESSAGE'),
      containerStyle: styles.containerToastStyle,
      leftIcon: <IPayIcon icon={icons.tick_square} size={24} color={colors.natural.natural0} />,
    });
  };

  const renderSuccessToast = () => {
    showToast({
      title: t('COMMON.CHANGES_SAVED_SUCCESSFULLY'),
      toastType: ToastTypes.INFORMATION,
      leftIcon: <IPayIcon icon={icons.DOCUMENT} size={24} color={colors.natural.natural0} />,
    });
  };
  const updateProfileImage = async () => {
    const apiResponse = await walletUpdate(
      {
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        profileImage: `${selectedImage}`,
      },
      walletInfo.walletNumber,
    );
    if (apiResponse) {
      dispatch(setWalletInfo({ profileImage: `${selectedImage}` }));
      renderUploadSuccessToast();
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
    if (walletInfo) {
      const userInfoData: any = {
        fullName: walletInfo.fullName,
        ...walletInfo.addressDetails,
        ...walletInfo.userContactInfo,
        ...walletInfo.accountBasicInfo,
        ...walletInfo.workDetails,
      };

      // Create the userDataArray in the desired format
      const transformedData = mapUserDataToDesiredFormat(userInfoData);
      setUserData(transformedData);
    }
  }, [walletInfo]);

  const kycBottomSheetRef = useRef<BottomSheetModal>(null);
  const nafathVerificationBottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    setKycVisible(true);
    kycBottomSheetRef.current?.present();
  };

  const onCloseNafathVerificationSheet = () => {
    nafathVerificationBottomSheetRef.current?.close();
  };

  const openNafathBottomSheet = () => {
    nafathVerificationBottomSheetRef.current?.present();
  };

  const defaultSnapPoint = SNAP_POINT.MEDIUM_LARGE;
  const smallSnapPoint = ['55%', '55%', isAndroidOS ? '99%' : '92%'];

  const [category, setCategory] = useState<string>(KycFormCategories.CUSTOMER_KNOWLEDGE);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(SNAP_POINT.MEDIUM_LARGE);

  const renderPersonalInfo = ({ item }) => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText style={styles.personalInfoCardTitleText} regular>
        {item.text}
      </IPayFootnoteText>
      <IPaySubHeadlineText
        regular
        style={styles.subHeadline}
        numberOfLines={item?.key === UserFieldKeys.NATIONAL_ADDRESS ? 1 : 2}
      >
        {item.details}
      </IPaySubHeadlineText>
    </IPayView>
  );

  const handlePress = () => {
    showActionSheet();
  };
  const isBasicTier = useTypedSelector(isBasicTierSelector);

  const cardData = [
    {
      key: CardKeys.IDENTITY_VERIFICATION,
      icon: <IPayImage style={styles.imageStyle} image={images.nafathLogo} />,
      text: t('COMMON.INDENTITY_VERIFICATION'),
      iconRight: isBasicTier ? icons.ARROW_RIGHT : undefined,
      button: {
        text: t('COMMON.VERIFY'),
        iconColor: colors.primary.primary500,
        disabled: false,
        onPress: () => openNafathBottomSheet(),
      },
    },
    {
      key: CardKeys.CUSTOMER_KNOWLEDGE_FORM,
      icon: <IPayIcon icon={icons.DOCUMENT} color={colors.primary.primary900} size={20} />,
      text: t('PROFILE.CUSTOMER_KNOWLEDGE_FORM'),
      button: {
        text:
          walletInfo.accountBasicInfoCompleted && walletInfo.nationalAddressComplete
            ? t('PROFILE.EDIT')
            : t('PROFILE.COMPLETE'),
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
      {item.key === CardKeys.IDENTITY_VERIFICATION && !isBasicTier ? (
        <IPayChip variant={States.SUCCESS} isShowIcon={false} textValue="COMMON.VERIFIED" />
      ) : (
        <IPayOutlineButton
          rightIcon={<IPayIcon icon={icons.ARROW_RIGHT} size={14} color={colors.primary.primary500} />}
          btnText={item.button.text}
          onPress={() => item.button.onPress()}
          disabled={item.button.disabled}
        />
      )}
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
    const payload = {
      walletNumber,
    };
    const apiResponse: any = await getWalletInfo(payload);
    if (apiResponse) {
      dispatch(setWalletInfo(apiResponse?.response));
    }
  };

  const updateWalletKYC = async (formData: IFormData) => {
    const payload: IWalletUpdatePayload = {
      incomeSource: formData.income_source.code,
      monthlyIncomeAmount: formData.monthly_income.code,
      workDetails: {
        occupation: formData.occupation.recTypeCode,
        industry: formData.employer_name,
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
    const walletUpdateResponse = await walletUpdate(payload, walletInfo.walletNumber as string);
    if (walletUpdateResponse.status.type === 'SUCCESS') {
      await getUpadatedWalletData(walletUpdateResponse?.response?.walletNumber as string);
      renderSuccessToast();
    }
  };

  const onSubmit = (formData: IFormData) => {
    setKycVisible(false);
    updateWalletKYC(formData);
  };

  const onCloseKycSheet = () => {
    if (category !== KycFormCategories.CUSTOMER_KNOWLEDGE) {
      setSnapPoint(defaultSnapPoint);
      setCategory(KycFormCategories.CUSTOMER_KNOWLEDGE);
      openBottomSheet();
    } else {
      setKycVisible(false);
    }
  };
  return (
    <>
      <IPaySafeAreaView style={styles.safeAreaView2}>
        <IPayHeader title="PROFILE.TITLE" backBtn applyFlex />
        <IPayView style={styles.imageContainer}>
          <IPayPressable>
            <IPayUserAvatar image={walletInfo.profileImage} />
            {renderOverlayIcon()}
          </IPayPressable>
        </IPayView>
        <IPayView>
          <IPayView style={styles.body1}>
            <IPayFootnoteText
              regular
              style={styles.containerHeadings}
              text="PROFILE.REGISTERATION_COMPLETION"
            ></IPayFootnoteText>
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
            <IPayFootnoteText regular style={styles.containerHeadings} text="COMMON.PERSONAL_INFO"></IPayFootnoteText>
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
      <IPayPortalBottomSheet
        animate={false}
        noGradient
        heading={t([`PROFILE.${category}`, 'PROFILE.TITLE'])}
        customSnapPoint={snapPoint}
        onCloseBottomSheet={onCloseKycSheet}
        ref={kycBottomSheetRef}
        isVisible={kycVisible}
        simpleBar
        cancelBnt
        bold
        isPanningGesture={isSmallSheet}
      >
        <IPayCustomerKnowledge category={category} onChangeCategory={handleChangeCategory} onSubmit={onSubmit} />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        heading="COMMON.INDENTITY_VERIFICATION"
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
