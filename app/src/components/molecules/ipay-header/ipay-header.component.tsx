import { IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import BackComponent from './ipay-header-components/back.component';
import CustomComponent from './ipay-header-components/custom.component';
import Delink from './ipay-header-components/delink.component';
import LanguageHeader from './ipay-header-components/language-header.component';
import { HeaderProps } from './ipay-header.interface';
import headerStyles from './ipay-header.styles';

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
}) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <IPayView testID={`${testID}-ipay-header`} style={styles.headerContainer}>
      <IPayView style={styles.iconContainer}>
        {leftComponent || (
          <>
            {backHeader && <BackComponent onPress={onBackPress} backIconOnly={backIconOnly} />}
            {isLeft && <CustomComponent text={leftText} onPress={onPressLeft} />}
            {isDelink && <Delink onPress={onPress} />}
          </>
        )}
      </IPayView>
      <IPayView style={styles.flexStyles}>
        <IPaySubHeadlineText text={title} style={[styles.title, titleStyle]} />
      </IPayView>
      <IPayView style={styles.rightStyles}>
        {rightComponent || (
          <>
            {languageHeader && <LanguageHeader />}
            {isRight && <CustomComponent text={rightText} onPress={onPressRight} isRight={isRight} />}
          </>
        )}
      </IPayView>
    </IPayView>
  );
};
export default React.memo(IPayHeader);
