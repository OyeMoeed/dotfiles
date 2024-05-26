
import React, { FC } from 'react';
import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import headerStyles from './../ipay-header.styles';
import useTheme from '@app/styles/hooks/theme.hook';
interface CustomRightProps {
    text?: string;
    onPress?: () => void;
    isRight?: boolean;
}

const CustomComponent: FC<CustomRightProps> = ({ text, onPress, isRight }) => {
    const { colors } = useTheme();
    const styles = headerStyles(colors);
    return (
        <IPayPressable onPress={onPress} style={isRight ? styles.rightStyles : {}}>
            <IPaySubHeadlineText text={text} regular style={styles.back} />
        </IPayPressable>
    );
};

export default CustomComponent;

