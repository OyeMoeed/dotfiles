import icon from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';

import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import { ChangeLangPayloadProps } from '@app/network/services/core/change-language/change-language.interface';
import changeLanguage from '@app/network/services/core/change-language/change-language.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { LanguageCode } from '@app/utilities/enums.util';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { JSX, forwardRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { setValueToAsyncStorage } from '@app/utilities';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import styles from './ipay-language-sheet.styles';
import { IPayLanguageSheetProps, SelectedChangedLanguageProps } from './ipay-language.interface';
import { languagesAll } from './languagesData';
import { useLanguageChange, useModalActions } from './useLanguageChange';

const IPayLanguageSheet = forwardRef<BottomSheetModal, IPayLanguageSheetProps>((_, ref) => {
  const { bottomSheetModalRef, handleClosePress } = useModalActions(ref);
  const { colors } = useTheme();
  const sheetStyles = styles(colors);
  const selectedLanguage = useTypedSelector((state) => state.languageReducer.selectedLanguage) || LanguageCode.EN;
  const isAuthorized = useTypedSelector((state) => state.auth.isAuthorized);

  const [openAlert, setOpenAlert] = useState(false);
  const [selectChangedLanguage, setSelectChangedLanguage] = useState<SelectedChangedLanguageProps>({
    code: selectedLanguage,
    isRTL: false,
    language: '',
  });

  const closeModule = () => {
    handleClosePress();
    setOpenAlert(false);
  };

  const handleLanguagePress = useLanguageChange(closeModule);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const changeMainLanguage = async () => {
    setOpenAlert(false);

    const { language, isRTL, code } = selectChangedLanguage;
    const deviceInfo = await getDeviceInfo();
    if (isAuthorized) {
      await setValueToAsyncStorage('skipLoginAfterLogin', 'true');
    }

    const payLoad: ChangeLangPayloadProps = {
      walletNumber,
      body: {
        userContactInfo: {
          preferedLanguage: code,
        },
        deviceInfo,
      },
    };

    await changeLanguage(payLoad);
    handleLanguagePress(language, isRTL, code);
  };

  return (
    <>
      <IPayBottomSheet
        heading="COMMON.LANGUAGE"
        enablePanDownToClose
        simpleBar
        cancelBnt
        customSnapPoint={['1%', isAndroidOS ? '65%' : '68%']}
        onCloseBottomSheet={handleClosePress}
        ref={bottomSheetModalRef}
        bold
      >
        <IPayView style={sheetStyles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <IPayView style={sheetStyles.renderLanguage}>
              {languagesAll.map((item, index) => (
                <IPayPressable
                  key={`${`${index}IPayPressable`}`}
                  style={sheetStyles.buttonBox}
                  onPress={() => {
                    if (item.code !== selectedLanguage) {
                      setOpenAlert(true);
                      setSelectChangedLanguage(item);

                      handleClosePress();
                    } else {
                      handleClosePress();
                    }
                  }}
                >
                  <IPayView style={sheetStyles.row}>
                    <IPayView style={sheetStyles.rowInner}>
                      <IpayFlagIcon country={item.code} />
                      <IPayFootnoteText
                        style={sheetStyles.languageTextStyle}
                        text={item.language}
                        shouldTranslate={false}
                      />
                    </IPayView>
                    {
                      (selectedLanguage === item.code && (
                        <IPayIcon icon={icon.tick_check_mark_default} />
                      )) as JSX.Element
                    }
                  </IPayView>
                </IPayPressable>
              ))}
            </IPayView>
          </ScrollView>
        </IPayView>
      </IPayBottomSheet>
      <IPayAlert
        visible={openAlert}
        title="SETTINGS.CHANGE_LANGUAGE"
        primaryAction={{
          text: 'COMMON.YES',
          onPress: changeMainLanguage,
        }}
        secondaryAction={{
          text: 'COMMON.NO',
          onPress: closeModule,
        }}
        message="SETTINGS.CHANGE_LANGUAGE_DESCRIPTION"
      />
    </>
  );
});

export default IPayLanguageSheet;
