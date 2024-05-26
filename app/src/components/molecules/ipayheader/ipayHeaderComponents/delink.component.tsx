import React, { FC } from 'react';
import { IPayPressable, IPaySubHeadlineText } from '@app/components/atoms';
import { DelinkSvg } from '@app/assets/svgs';
import headerStyles from './../ipay-header.styles';
import { t } from 'i18next';
import useTheme from '@app/styles/hooks/theme.hook';
interface DelinkProps {
    onPress?: () => void;
}

const Delink: FC<DelinkProps> = ({ onPress }) => {
    const { colors } = useTheme();
    const styles = headerStyles(colors);
    return (
        <IPayPressable onPress={onPress} style={styles.iconContainer}>

            <DelinkSvg />
            <IPaySubHeadlineText text={t('delink')} regular style={styles.back} />
        </IPayPressable>
    );
};

export default Delink;
