import React from 'react';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayView, IPayWebView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import addCardStyles from './add-card-style';

const AddCardScreen: React.FC = () => {
  const styles = addCardStyles();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.MENU.ADD_CARD} backBtn applyFlex />
      <IPayView style={styles.container}>
        {/* TODO: added dummy URL for now */}
        <IPayWebView source={{ uri: 'https://www.google.com' }} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default AddCardScreen;
