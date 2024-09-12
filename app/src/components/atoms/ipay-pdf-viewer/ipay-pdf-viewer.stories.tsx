// IPayPdfViewer.stories.tsx

import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { Meta, Story } from '@storybook/react';
import IPayPdfViewer from './ipay-pdf-viewer.component';
import { IPayPdfViewerProps } from './ipay-pdf-viewer.interface';

const styles = createStyleSheet({
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
