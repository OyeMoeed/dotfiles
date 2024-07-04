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
        title={showToast === 1 ? localizationText.name_copied : localizationText.IBAN_number}
        textStyle={{ color: colors.natural.natural0 }}
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.copy_success} size={moderateScale(18)} color={colors.natural.natural0} />}
        containerStyle={styles.toastContainer}
      />
    );

  return (
    <IPaySafeAreaView style={styles.mainWrapper} linearGradientColors={colors.gradientTertiary}>
      <IPayHeader testID="header" title={localizationText.top_up} backBtn applyFlex />
      <IPayView testID="iban-view" style={styles.container}>
        <IPayList
          title={localizationText.bank_transfer_to_my_wallet}
          leftIcon={<IPayIcon icon={icons.bank} size={moderateScale(18)} color={colors.primary.primary900} />}
          isShowLeftIcon
          containerStyle={styles.containerStyle}
          textStyle={styles.textStyle}
        />
        <IPayPageDescriptionText
          heading={localizationText.use_iban_number}
          text={localizationText.to_add_balance_description}
          style={styles.pageDescriptionStyle}
          alignTextLeft
        />
        <IPayList
          testID="name-list"
          onPressIcon={() => handleClickOnCopy(1, username)}
          title={localizationText.name}
          isShowSubTitle
          textStyle={styles.textStyle}
          subTitle={username}
          isShowIcon
          isShowDetail
          detailText={showToast === 1 ? localizationText.copied : localizationText.copy}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          subTextStyle={styles.rightTextStyle}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2, iban.toString())}
          title={localizationText.iban}
          isShowSubTitle
          textStyle={styles.textStyle}
          subTitle={iban}
          isShowIcon
          isShowDetail
          detailText={showToast === 2 ? localizationText.copied : localizationText.copy}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          subTextStyle={styles.rightTextStyle}
        />
        <IPayList
          leftIconContainerStyles={styles.leftIconContainerStyles}
          title={localizationText.transfer_duration_description}
          leftIcon={
            <IPayIcon icon={icons.clock_natural_duotone} size={24} color={colors.primary.primary900} />
          }
          isShowLeftIcon
          
          containerStyle={styles.informStyle}
        />
        <IPayButton
          btnStyle={styles.shareBtn}
          btnType="primary"
          testID="share"
          btnText={localizationText.share}
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
