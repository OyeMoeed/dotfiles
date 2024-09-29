import icons from '@app/assets/icons';
import { IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { goBack } from '@app/navigation/navigation-service.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import BackComponent from './ipay-header-components/back.component';
import CustomComponent from './ipay-header-components/custom.component';
import Delink from './ipay-header-components/delink.component';
import IPayLanguageSelectorButton from './ipay-header-components/ipay-language-selector-button';
import LanguageHeader from './ipay-header-components/language-header.component';
import { IPayHeaderProps } from './ipay-header.interface';
import headerStyles from './ipay-header.styles';

const IPayHeader: React.FC<IPayHeaderProps> = ({
  testID,
  title,
  onBackPress,
  leftComponent,
  rightComponent,
  languageHeader,
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
  menu,
  contactUs,
  customRightComponent,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);

  const onPressBackBtn = () => {
    goBack();
  };
  return (
    <IPayView testID={`${testID}-ipay-header`} style={[styles.headerContainer, containerStyle]}>
      <IPayView style={[styles.iconContainer, applyFlex && styles.flexOne]}>
        {leftComponent || (
          <>
            {menu && languageBtn && <IPayLanguageSelectorButton />}
            {backBtn && <BackComponent onPress={onBackPress || onPressBackBtn} backIconOnly={backIconOnly} />}
            {isLeft && <CustomComponent text={leftText} onPress={onPressLeft} />}
            {isDelink && <Delink onPress={() => onPress?.()} />}
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
            {!menu && languageBtn && <IPayLanguageSelectorButton />}
            {languageHeader && <LanguageHeader />}
            {isRight && <CustomComponent text={rightText} onPress={onPressRight} isRight={isRight} />}
            {contactUs && (
              <IPayButton
                btnType={buttonVariants.LINK_BUTTON}
                onPress={onPress}
                btnText=""
                small
                rightIcon={<IPayIcon icon={icons.phone} size={24} color={colors.primary.primary500} />}
              />
            )}
            {customRightComponent && customRightComponent}
          </>
        )}
      </IPayView>
    </IPayView>
  );
};
export default React.memo(IPayHeader);
