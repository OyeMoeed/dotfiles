import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ContactItem, IPayActivationCallProps } from './ipay-activation-call.interface';
import activationCallStyles from './ipay-activation-call.styles';

const IPayActivationCall: React.FC<IPayActivationCallProps> = ({ testID, contactList }) => {
  const { colors } = useTheme();
  const styles = activationCallStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}-activation-call`} style={styles.container}>
      {contactList?.map((item: ContactItem) => (
        <IPayList
          key={item.title}
          title={item.title}
          isShowSubTitle
          subTitle={item.phone_number}
          containerStyle={styles.listContainer}
          isShowIcon
          icon={
            <IPayPressable style={styles.iconWrapper}>
              <IPayIcon icon={icons.call_calling} size={18} color={colors.natural.natural0} />
            </IPayPressable>
          }
        />
      ))}
    </IPayView>
  );
};

export default IPayActivationCall;
