import icon from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';

import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { ChangeLangPayloadProps } from '@app/network/services/core/change-language/change-language.interface';
import changeLanguage from '@app/network/services/core/change-language/change-language.service';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { LanguageCode } from '@app/utilities/enums.util';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { JSX, forwardRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import styles from './ipay-language-sheet.styles';
import { IPayLanguageSheetProps } from './ipay-language.interface';
import { languagesAll } from './languagesData';
import { useLanguageChange, useModalActions } from './useLanguageChange';

const IPayLanguageSheet: React.FC = forwardRef<BottomSheetModal, IPayLanguageSheetProps>((_, ref) => {
  const { bottomSheetModalRef, handleClosePress } = useModalActions(ref);
  const { colors } = useTheme();
  const sheetStyles = styles(colors);
  const localizationText = useLocalization();
  const handleLanguagePress = useLanguageChange(handleClosePress);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const changeLangugae = async (language: string, isRTL: boolean, code: LanguageCode) => {
    const deviceInfo = await getDeviceInfo();

    const payLoad: ChangeLangPayloadProps = {
      walletNumber,
      body: {
        userContactInfo: {
          preferedLanguage: code,
        },
        deviceInfo,
      },
    };
    const apiResponse: any = await changeLanguage(payLoad);

    if (apiResponse) {
      handleLanguagePress(language, isRTL, code);
    }
  };

  const selectedLanguage = useTypedSelector((state) => state.languageReducer.selectedLanguage) || LanguageCode.EN;

  return (
    <IPayBottomSheet
      heading={localizationText.COMMON.LANGUAGE}
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
                  changeLangugae(item.language, item.isRTL, item.code);
                }}
              >
                <IPayView style={sheetStyles.row}>
                  <IPayView style={sheetStyles.rowInner}>
                    <IpayFlagIcon country={item.code} />
                    <IPayFootnoteText style={sheetStyles.languageTextStyle} text={item.language} />
                  </IPayView>
                  {(selectedLanguage === item.code && <IPayIcon icon={icon.tick_check_mark_default} />) as JSX.Element}
                </IPayView>
              </IPayPressable>
            ))}
          </IPayView>
        </ScrollView>
      </IPayView>
    </IPayBottomSheet>
  );
});

export default IPayLanguageSheet;
