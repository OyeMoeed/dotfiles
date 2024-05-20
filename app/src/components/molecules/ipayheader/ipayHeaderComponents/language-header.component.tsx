import React from 'react';
import { RNPressable, RNSubHeadlineText } from '@app/components/atoms';
import { Global } from '@app/assets/svgs/svg';
import { t } from 'i18next';
import styles from './../ipay-header.styles';

const LanguageHeader = () => {
    return (
        <RNPressable onPress={() => { }} style={styles.rightStyles}>
            <>
                <Global />
                <RNSubHeadlineText text={t('language')} regular style={styles.back} />
            </>
        </RNPressable>
    );
};

export default LanguageHeader;
