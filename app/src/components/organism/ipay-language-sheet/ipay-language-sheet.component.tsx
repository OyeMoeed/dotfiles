import icon from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';

import IpayFlagIcon from '@app/components/molecules/ipay-flag-icon/ipay-flag-icon.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { LanguageState } from '@app/store/slices/language-sclice.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { LanguageCode } from '@app/utilities/enums.util';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import IPayBottomSheet from '../ipay-bottom-sheet/ipay-bottom-sheet.component';
import styles from './ipay-language-sheet.styles';
import { IPayLanguageSheetProps } from './ipay-language.interface';
import { languagesAll } from './languagesData';
import { useLanguageChange, useModalActions } from './useLanguageChange';

const IPayLanguageSheet: React.FC = forwardRef<BottomSheetModal, IPayLanguageSheetProps>(({ testID }, ref) => {
  const { bottomSheetModalRef, isOpen, handleClosePress } = useModalActions(ref);
  const { colors } = useTheme();
  const sheetStyles = styles(colors);
  const localizationText = useLocalization();
  const handleLanguagePress = useLanguageChange(handleClosePress);

  const selectedLanguage =
    useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
    LanguageCode.EN;

  const RenderView = () => {
    return languagesAll.map((item, index) => (
      <IPayPressable
        key={index}
        style={sheetStyles.buttonBox}
        onPress={() => {
          handleLanguagePress(item.language, item.isRTL, item.code);
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
      heading={localizationText.language}
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