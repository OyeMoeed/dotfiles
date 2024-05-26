import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import { SCALE_100 } from '@app/styles/spacing.styles';
import { IPayPressable, IPayText, IPayView } from '@components/atoms';
import { IPaySafeAreaViewComp } from '@components/templates';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './profile.style';
import IPayTextInput from '@app/components/molecules/ipay-textinput/ipay-textinput.component';
import IPaySelectorInput from '@app/components/molecules/ipay-selector-input/ipay-selector-input.component';
import images from '@app/assets/images';
import { inputVariants } from '@app/utilities/enums.util';
import { User } from '@app/assets/svgs/svg';

const Profile = ({ navigation }: any): JSX.Element => {
  const { t, i18n } = useTranslation();
  const localizationText = useLocalization();

  const [text, setText] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const onChangeText = (txt: string): void => {
    setText(txt);
  };
  const onChangePhoneNumber = (txt: string): void => {
    setPhoneNumber(txt);
  };

  return (
    <IPaySafeAreaViewComp>
      <IPayView style={styles.outerWrapper}>
        <Icon name="finger-print-sharp" size={SCALE_100} color={colors.green} />
        <IPayView>
          <IPayPressable
            onPress={() => Alert.alert(t(localizationText.this_is_profile_screen))}
            style={styles.buttonStyle}
          >
            <IPayText style={styles.text}>
              {t(localizationText.this_is)}{' '}
              <IPayText style={styles.profileText}> {t(localizationText.profile)} </IPayText>{' '}
              {t(localizationText.screen)}
            </IPayText>
          </IPayPressable>
        </IPayView>


        <IPayView style={styles.outerComponent}>
        <IPaySelectorInput
          countryCode={t('countryCode')}
          placeholder={t('inputPlaceholder')}
          text={phoneNumber}
          onChangeText={onChangePhoneNumber}
          flagImage={images.countryFlag}
        />
        <IPaySelectorInput

          placeholder={t('inputPlaceholder')}
          text={phoneNumber}
          onChangeText={onChangePhoneNumber}
          variant={inputVariants.CURRENCY}
          assistiveText={t('assistiveText')}
        />

        <IPayTextInput onChangeText={onChangeText} text={text}
          onClearInput={() => setText('')}
          label={t('textLabel')}
          placeholder={t('inputPlaceholder')}
          assistiveText={t('assistiveText')}
        />
        <IPayTextInput onChangeText={onChangeText} text={text}
          label={t('textLabel')}
          showLeftIcon
          onClearInput={() => setText('')}
          isError={true}
          rightIcon={<User />}
          placeholder={t('inputPlaceholder')}
        />
        <IPayTextInput onChangeText={onChangeText} text={text}
          label={t('textLabel')}
          onClearInput={() => setText('')}
          editable={false}
          placeholder={t('inputPlaceholder')}
        />
      </IPayView>
      </IPayView>
      <IPayView style={styles.footerView}>
        <IPayText style={styles.footerText}>{t(localizationText.by_handi_tv)}</IPayText>
      </IPayView>
    </IPaySafeAreaViewComp>
  );
};

export default Profile;
