
import React, { FC } from 'react';
import { RNPressable, RNSubHeadlineText } from '@app/components/atoms';
import styles from './../ipay-header.styles';

interface CustomRightProps {
    text?: string;
    onPress?: () => void;
    isRight?: boolean;
}

const CustomComponent: FC<CustomRightProps> = ({ text, onPress, isRight }) => {
    return (
        <RNPressable onPress={onPress} style={isRight ? styles.rightStyles : {}}>
            <RNSubHeadlineText text={text} regular style={styles.back} />
        </RNPressable>
    );
};

export default CustomComponent;

