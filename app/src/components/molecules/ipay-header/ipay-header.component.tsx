import { IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import BackComponent from './ipay-header-components/back.component';
import CustomComponent from './ipay-header-components/custom.component';
import Delink from './ipay-header-components/delink.component';
import LanguageHeader from './ipay-header-components/language-header.component';
import { HeaderProps } from './ipay-header.interface';
import headerStyles from './ipay-header.styles';
import IPayLanguageSelectorButton from './IPayLanguageSelectorButton';

const IPayHeader: React.FC<HeaderProps> = ({
  testID,
  title,
  onBackPress,
  leftComponent,
  rightComponent,
  languageHeader,
  backHeader,
  titleStyle,
  isRight,
  isLeft,
  onPressLeft,
  onPressRight,
  leftText,
  rightText,
  isDelink,
  onPress,
  backIconOnly = false,
  backBtn,
  languageBtn,
  centerIcon,
  applyFlex,
}) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);

  const onPressBackBtn = () => {
    goBack();
  };
  return (
    <IPayView testID={`${testID}-ipay-header`} style={styles.headerContainer}>
      <IPayView style={[styles.iconContainer, applyFlex && styles.flexOne]}>
        {leftComponent || (
          <>
            {backBtn && <BackComponent onPress={onPressBackBtn} backIconOnly={backIconOnly} />}
            {isLeft && <CustomComponent text={leftText} onPress={onPressLeft} />}
            {isDelink && <Delink onPress={onPress} />}
          </>
        )}
      </IPayView>
      <IPayView style={[styles.flexStyles, applyFlex && styles.flexTwo]}>
        {centerIcon && centerIcon}
        {title && <IPaySubHeadlineText text={title} style={[styles.title, titleStyle]} />}
      </IPayView>
      <IPayView style={[styles.rightStyles, applyFlex && styles.flexOne]}>
        {rightComponent || (
          <>
            {languageBtn && <IPayLanguageSelectorButton />}
            {languageHeader && <LanguageHeader />}
            {isRight && <CustomComponent text={rightText} onPress={onPressRight} isRight={isRight} />}
          </>
        )}
      </IPayView>
    </IPayView>
  );
};
export default React.memo(IPayHeader);
