import React, { FC } from 'react';
import { RNPressable, RNSubHeadlineText } from '@app/components/atoms';
import { BackArrow } from '@app/assets/svgs/svg';
import styles from './../ipay-header.styles';
import { t } from 'i18next';
interface BackComponentProps {
    onPress?: () => void;
    backIconOnly?: boolean;
}

const BackComponent: FC<BackComponentProps> = ({ onPress, backIconOnly }) => {
    return (
        <RNPressable onPress={onPress} style={styles.iconContainer}>
            <>
                <BackArrow />
                {!backIconOnly && <RNSubHeadlineText text={t('back')} regular style={styles.back} />}
            </>
        </RNPressable>
    );
};

export default BackComponent;
