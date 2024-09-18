import icons from '@app/assets/icons';
import { IPayButton, IPayHeader, IPayList, IPayPageDescriptionText } from '@app/components/molecules/index';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants, ToastTypes } from '@app/utilities/enums.util';
import { IPayIcon, IPayView } from '@components/atoms';
import React from 'react';
import Share from 'react-native-share';
import { moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import topupIbanStyles from './topup-iban.style';

const TopUpIBAN = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = topupIbanStyles(colors);
  const { showToast } = useToastContext();
  const [toast, setShowToast] = React.useState<number>(0);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const username = walletInfo?.fullName;
  const iban = walletInfo?.viban;

  const getShareableMessage = () => {
    const appTitle = 'AlinmaPay';
    const nameLabel = t('COMMON.NAME');
    const ibanLabel = t('COMMON.IBAN');

    return `${appTitle}\n${nameLabel} : ${username}\n${ibanLabel} : ${iban}`;
  };

  const onPressShare = () => {
    const shareOptions = {
      subject: 'Wa',
      title: 'AlinmaPay',
      message: getShareableMessage(),
      social: Share.Social.WHATSAPP,
      filename: 'IBAN',
    };
    Share.open(shareOptions); // these share options would be updated later
  };

  const renderToast = (toastTitleType: number) => {
    showToast({
      toastType: ToastTypes.SUCCESS,
      title: toastTitleType === 1 ? 'HOME.NAME_COPIED' : 'HOME.IBAN_NUMBER',
      containerStyle: styles.toastContainer,
      leftIcon: <IPayIcon icon={icons.copy_success} size={moderateScale(18)} color={colors.natural.natural0} />,
    });
  };

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
    setShowToast(step);
    renderToast(step);
    setTimeout(() => setShowToast(0), 3000);
  };

  return (
    <IPaySafeAreaView style={styles.mainWrapper}>
      <IPayHeader testID="header" title="COMMON.TOP_UP" backBtn applyFlex />
      <IPayView testID="iban-view" style={styles.container}>
        <IPayList
          title="TOP_UP.BANK_TRANSFER_TO_MY_WALLET"
          leftIcon={<IPayIcon icon={icons.bank} size={moderateScale(18)} color={colors.primary.primary900} />}
          isShowLeftIcon
          containerStyle={styles.containerStyle}
          textStyle={styles.textStyle}
        />
        <IPayPageDescriptionText
          heading="TOP_UP.USE_IBAN_NUMBER"
          text="TOP_UP.TO_ADD_BALANCE_DESCRIPTION"
          style={styles.pageDescriptionStyle}
          alignTextLeft
          subHeadingStyle={styles.subHeadingTextStyle}
        />
        <IPayList
          testID="name-list"
          onPressIcon={() => handleClickOnCopy(1, username)}
          title="COMMON.NAME"
          isShowSubTitle
          textStyle={styles.textStyle}
          subTitle={username}
          isShowIcon
          isShowDetail
          detailText={toast === 1 ? 'TOP_UP.COPIED' : 'TOP_UP.COPY'}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          subTextStyle={styles.rightTextStyle}
        />
        <IPayList
          onPressIcon={() => handleClickOnCopy(2, iban.toString())}
          title="COMMON.IBAN"
          isShowSubTitle
          textStyle={styles.textStyle}
          subTitle={iban}
          isShowIcon
          isShowDetail
          detailText={toast === 2 ? 'TOP_UP.COPIED' : 'TOP_UP.COPY'}
          icon={<IPayIcon icon={icons.copy} size={18} color={colors.primary.primary500} />}
          subTextStyle={styles.rightTextStyle}
        />
        <IPayList
          leftIconContainerStyles={styles.leftIconContainerStyles}
          title="TOP_UP.TRANSFER_DURATION_DESCRIPTION"
          leftIcon={<IPayIcon icon={icons.clock_natural_duotone} size={24} color={colors.primary.primary900} />}
          isShowLeftIcon
          containerStyle={styles.informStyle}
        />
        <IPayButton
          btnStyle={styles.shareBtn}
          btnType={buttonVariants.PRIMARY}
          testID="share"
          btnText="COMMON.SHARE"
          large
          leftIcon={<IPayIcon icon={icons.share} size={moderateScale(22)} color={colors.natural.natural0} />}
          onPress={onPressShare}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default TopUpIBAN;
