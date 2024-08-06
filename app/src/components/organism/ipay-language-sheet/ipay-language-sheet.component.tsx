import icon from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';

import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import changeLanguage from '@app/network/services/core/change-language/change-language.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { LanguageCode } from '@app/utilities/enums.util';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import styles from './ipay-language-sheet.styles';
import { IPayLanguageSheetProps } from './ipay-language.interface';
import { languagesAll } from './languagesData';
import { useLanguageChange, useModalActions } from './useLanguageChange';
import { ChangeLangPayloadProps } from '@app/network/services/core/change-language/change-language.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';

const IPayLanguageSheet: React.FC = forwardRef<BottomSheetModal, IPayLanguageSheetProps>(({ testID }, ref) => {
  const { bottomSheetModalRef, isOpen, handleClosePress } = useModalActions(ref);
  const { colors } = useTheme();
  const sheetStyles = styles(colors);
  const localizationText = useLocalization();
  const handleLanguagePress = useLanguageChange(handleClosePress);
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const [apiError, setAPIError] = useState<string>('');
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);

  const changeLangugae = async (language: string, isRTL: boolean, code: LanguageCode) => {
    try {
      const deviceInfo = await getDeviceInfo();

      const payLoad: ChangeLangPayloadProps = {
        walletNumber: walletNumber,
        body: {
          userContactInfo: {
            preferedLanguage: code,
          },
          deviceInfo: deviceInfo,
        },
      };
      const apiResponse: any = await changeLanguage(payLoad);

      if (apiResponse?.status?.type === "SUCCESS") {
        handleLanguagePress(language, isRTL, code);
      } else if (apiResponse?.apiResponseNotOk) {
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      } else {
        setAPIError(apiResponse?.error);
      }
    } catch (error: any) {
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const selectedLanguage = useTypedSelector((state) => state.languageReducer.selectedLanguage) || LanguageCode.EN;

  const RenderView = () => {
    return languagesAll.map((item, index) => (
      <IPayPressable
        key={index}
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
    ));
  };

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
            <RenderView />
          </IPayView>
        </ScrollView>
      </IPayView>
    </IPayBottomSheet>
  );
});

export default IPayLanguageSheet;
