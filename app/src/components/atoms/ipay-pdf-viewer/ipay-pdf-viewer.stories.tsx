// IPayPdfViewer.stories.tsx

import { Meta, Story } from '@storybook/react';
import { StyleSheet } from 'react-native';
import IPayPdfViewer from './ipay-pdf-viewer.component';
import { IPayPdfViewerProps } from './ipay-pdf-viewer.interface';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default {
  title: 'Components/pdf/IPayPdfViewer',
  component: IPayPdfViewer,
} as Meta;

const Template: Story = (args: IPayPdfViewerProps) => {
  return <IPayPdfViewer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  style: styles.container,
  testID: 'pdf-viewer-default',
  sourceURL: 'https://www.alinma.com/ADS/channels/retail/assets/docs/RegistrationTerms_ar.pdf',
};
