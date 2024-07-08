import icons from '@app/assets/icons';
import { IPayButton, IPayHeader, IPayList, IPayPageDescriptionText } from '@app/components/molecules/index';
import IPayToast from '@app/components/molecules/ipay-toast/ipay-toast.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import { IPayIcon, IPayView } from '@components/atoms';
import React from 'react';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import topupIbanStyles from './topup-iban.style';

const TopUpIBAN = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = topupIbanStyles(colors);
  const [showToast, setShowToast] = React.useState<number>(0);
  const username = 'Adam Ahmed'; // this value will be replaced while adding API
  const iban = 'SA8876676690798685'; // this value will be replaced while adding API

  const onPressShare = () => {
    const shareOptions = {
      subject: 'Wa',
      title: 'AlinmaPay',
      message: 'IBAN Number',
      url: 'AlinmaPay',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '9199999999',
      filename: 'test',
    };
    Share.open(shareOptions); // these share options would be updated later
  };

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    setShowToast(step);
    setTimeout(() => setShowToast(0), 3000);
  };

  const renderToast = () =>
    showToast > 0 && (
      <IPayToast
        title={showToast === 1 ? localizationText.HOME.NAME_COPIED : localizationText.HOME.IBAN_NUMBER}
        textStyle={{ color: colors.natural.natural0 }}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.copy_success} size={moderateScale(18)} color={colors.natural.natural0} />}
        containerStyle={styles.toastContainer}
      />
    );

  return (
    <IPaySafeAreaView style={styles.mainWrapper} linearGradientColors={colors.gradientTertiary}>
      <IPayHeader testID="header" title={localizationText.COMMON.TOP_UP} backBtn applyFlex />
      <IPayView testID="iban-view" style={styles.container}>
        <IPayList
          title={localizationText.TOP_UP.BANK_TRANSFER_TO_MY_WALLET}
          leftIcon={<IPayIcon icon={icons.bank} size={moderateScale(18)} color={colors.primary.primary900} />}
          isShowLeftIcon
          containerStyle={styles.containerStyle}
          textStyle={styles.textStyle}
        />
        <IPayPageDescriptionText
          heading={localizationText.use_iban_number}
          text={localizationText.TOP_UP.TO_ADD_BALANCE_DESCRIPTION}
          style={styles.pageDescriptionStyle}
          alignTextLeft
          subHeadingStyle={styles.subHeadingTextStyle}
        />
        <IPayList
          testID="name-list"
          onPressIcon={() => handleClickOnCopy(1, username)}
          title={localizationText.COMMON.NAME}
          isShowSubTitle
          subTitle={username}
          isShowIcon
          isShowDetail
          detailText={showToast === 1 ? localizationText.TOP_UP.COPIED : localizationText.TOP_UP.COPY}
          icon={<IPayIcon icon={icons.copy} size={moderateScale(18)} color={colors.primary.primary500} />}
          detailTextStyle={styles.rightTextStyle}
          containerStyle={styles.listItemWrapper}
          subTextStyle={styles.subTextStyle}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2, iban.toString())}
          title={localizationText.COMMON.IBAN}
          isShowSubTitle
          subTitle={iban}
          isShowIcon
          isShowDetail
          detailText={showToast === 2 ? localizationText.TOP_UP.COPIED : localizationText.TOP_UP.COPY}
          icon={<IPayIcon icon={icons.copy} size={moderateScale(18)} color={colors.primary.primary500} />}
          detailTextStyle={styles.rightTextStyle}
          containerStyle={styles.listItemWrapper}
          subTextStyle={styles.subTextStyle}
        />
        <IPayList
          title={localizationText.TOP_UP.TRANSFER_DURATION_DESCRIPTION}
          leftIcon={
            <IPayIcon icon={icons.clock_natural_duotone} size={moderateScale(22)} color={colors.primary.primary900} />
          }
          isShowLeftIcon
          textStyle={styles.textStyle}
          containerStyle={styles.informStyle}
          commonContainerStyle={styles.commonStyle}
        />
        <IPayButton
          btnStyle={styles.shareBtn}
          btnType="primary"
          testID="share"
          btnText={localizationText.TOP_UP.REF_NUMBER}
          large
          leftIcon={<IPayIcon icon={icons.share} size={moderateScale(22)} color={colors.natural.natural0} />}
          onPress={onPressShare}
        />
        {renderToast()}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default TopUpIBAN;
