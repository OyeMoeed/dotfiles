import { IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { FC } from 'react';
import { HeaderProps } from './ipay-header.interface';
import headerStyles from './ipay-header.styles';
import BackComponent from './ipayHeaderComponents/back.component';
import CustomComponent from './ipayHeaderComponents/custom.component';
import Delink from './ipayHeaderComponents/delink.component';
import LanguageHeader from './ipayHeaderComponents/language-header.component';

const IPayHeader: FC<HeaderProps> = ({
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
