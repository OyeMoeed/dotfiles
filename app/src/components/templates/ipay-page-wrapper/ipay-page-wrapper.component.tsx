import images from '@app/assets/images';
import { IPayImage } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import React from 'react';
import { IPayPageWrapperProps } from './ipay-page-wrapper.interface';
import pageWrapperStyles from './ipay-page-wrapper.style';

const IPayPageWrapper: React.FC<IPayPageWrapperProps> = ({ testID, style, children }: any) => {
  const styles = pageWrapperStyles();

  return (
    <IPaySafeAreaView style={[styles.container, style]} testID={`${testID}-page-wrapper`}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      {children}
    </IPaySafeAreaView>
  );
};

export default IPayPageWrapper;
