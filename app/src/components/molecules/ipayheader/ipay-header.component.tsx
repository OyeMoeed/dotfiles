
import React, { FC } from 'react';
import {  RNSubHeadlineText, RNView } from '@app/components/atoms';
import styles from './ipay-header.styles';
import BackComponent from './ipayHeaderComponents/back.component';
import CustomComponent from './ipayHeaderComponents/custom.component';
import Delink from './ipayHeaderComponents/delink.component';
import LanguageHeader from './ipayHeaderComponents/language-header.component';
import { HeaderProps } from './ipay-header.interface';

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
    backIconOnly = false
}) => {
    return (
        <RNView testID={`${testID}-ipay-header`} style={styles.headerContainer}>
            <RNView style={styles.iconContainer}>
                {leftComponent ? (
                    leftComponent
                ) : (
                    <>
                        {backHeader && <BackComponent onPress={onBackPress} backIconOnly={backIconOnly} />}
                        {isLeft && <CustomComponent text={leftText} onPress={onPressLeft} />}
                        {isDelink && <Delink onPress={onPress} />}
                    </>
                )}
            </RNView>
            <RNView style={styles.flexStyles}>
                <RNSubHeadlineText text={title} style={[styles.title, titleStyle]} />
            </RNView>
            <RNView style={styles.rightStyles}>
                {rightComponent || (
                    <>
                        {languageHeader && <LanguageHeader />}
                        {isRight && <CustomComponent text={rightText} onPress={onPressRight} isRight={isRight} />}
                    </>
                )}
            </RNView>
        </RNView>
    );
};
export default React.memo(IPayHeader);

