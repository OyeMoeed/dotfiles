import React, { FC } from 'react';
import { RNPressable, RNSubHeadlineText } from '@app/components/atoms';
import { DelinkSvg } from '@app/assets/svgs/svg';
import styles from './../ipay-header.styles';
import { t } from 'i18next';
interface DelinkProps {
    onPress?: () => void;
}

const Delink: FC<DelinkProps> = ({ onPress }) => {
    return (
        <RNPressable onPress={onPress} style={styles.iconContainer}>
            <>
                <DelinkSvg />
                <RNSubHeadlineText text={t('delink')} regular style={styles.back} />
            </>
        </RNPressable>
    );
};

export default Delink;
