import icons from '@app/assets/icons';
import { IPayGradientText, IPayHeader, IPayOutlineButton } from '@app/components/molecules';
import { IPayBottomSheet } from '@app/components/organism';
import { kycFormCategories } from '@app/enums/customer-knowledge.enum';
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
  IPayView,
} from '@components/atoms';

import images from '@app/assets/images';
import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import { useTypedSelector } from '@app/store/store';
import { IPayCustomerKnowledge, IPayNafathVerification, IPaySafeAreaView } from '@components/templates';
import { useCallback, useEffect, useRef, useState } from 'react';
import profileStyles from './profile.style';
import useChangeImage from './proflie.changeimage.component';

const Profile: React.FC = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = profileStyles(colors);
  const { selectedImage, showActionSheet, IPayActionSheetComponent, IPayAlertComponent } = useChangeImage();
  const [userData, setUserData] = useState<object[]>(null);

  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);

  useEffect(() => {
    if (userInfo && walletInfo) {
      const userData = {
        fullName: userInfo.fullName,
        ...walletInfo.addressDetails,
        ...walletInfo.userContactInfo,
        ...walletInfo.accountBasicInfo,
        ...walletInfo.workDetails,
      };

      // Create the userDataArray in the desired format
      const transformedData = mapUserDataToDesiredFormat(userData);
      setUserData(transformedData);
    }
  }, [userInfo, walletInfo]);

  const mapUserDataToDesiredFormat = (userData) => [
    { key: 'name', text: 'Name', details: userData.fullName || 'N/A' },
    { key: 'mobile', text: 'Mobile Number', details: userData.mobileNumber || 'N/A' },
    { key: 'nationalAddress', text: 'National Address', details: formatAddress(userData) },
  ];

  const formatAddress = (userData) => {
    const { street, city, townCountry } = userData;
    return `${street || ''}, ${city || ''}, ${townCountry || ''}`.trim().replace(/,\s*,/g, ',');
  };

  const kycBottomSheetRef = useRef(null);
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

  const [category, setCategory] = useState<string>(kycFormCategories.CUSTOMER_KNOWLEDGE);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '94%' : '90%']);

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
        text: localizationText.PROFILE.COMPLETE,
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
        <IPayIcon icon={icons.ADD_PHOTO} size={18} />
      </IPayView>
    </IPayPressable>
  );
  const isSmallSheet = category === kycFormCategories.INCOME_SOURCE || category === kycFormCategories.MONTHLY_INCOME;
  const handleChangeCategory = (value: string) => {
    const isSmallSheet = value === kycFormCategories.INCOME_SOURCE || value === kycFormCategories.MONTHLY_INCOME;
    setSnapPoint(
      isSmallSheet
        ? ['1%', isAndroidOS ? '50%' : '60%', isAndroidOS ? '94%' : '90%']
        : ['1%', isAndroidOS ? '94%' : '90%'],
    );
    setCategory(value);
  };
  const onSubmit = () => {
    kycBottomSheetRef.current?.close();
  };
  const onCloseKycSheet = () => {
    if (category !== kycFormCategories.CUSTOMER_KNOWLEDGE) {
      setSnapPoint(['1%', isAndroidOS ? '94%' : '90%']);
      setCategory(kycFormCategories.CUSTOMER_KNOWLEDGE);
    } else {
      kycBottomSheetRef.current?.close();
    }
  };

  // const getInitialLetterOfName = () => (userInfo?.firstName ? userInfo?.firstName[0] : '');

  const getInitialLetterOfName = useCallback(
    (name: string) => {
      const words = name.split(' ');
      return words[0][0] + words[1][0];
    },
    [userInfo.fullName],
  );

  return (
    <>
      <IPaySafeAreaView style={styles.SafeAreaView2}>
        <IPayHeader title={localizationText.PROFILE.TITLE} backBtn applyFlex />
        <IPayView style={styles.imageContainer}>
          <IPayPressable>
            {selectedImage ? (
              <IPayImage image={{ uri: selectedImage }} style={styles.image} />
            ) : (
              // <IPayImage image={images.profile} style={styles.image} />
              <IPayView style={[styles.image, styles.initialsContainer]}>
                <IPayGradientText
                  yScale={22}
                  fontSize={typography.FONT_VARIANTS.TITLE_LARGE.FONT_SIZE}
                  text={getInitialLetterOfName(userInfo?.fullName)}
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
              {localizationText.personalInfo}
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
        heading={localizationText[category]}
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
        customSnapPoint={['1%', isAndroidOS ? '94%' : '90%']}
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
