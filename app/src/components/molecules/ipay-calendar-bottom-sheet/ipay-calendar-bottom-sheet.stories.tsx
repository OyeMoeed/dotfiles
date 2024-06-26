import { IPayView } from '@app/components/atoms';
import IPayCalendarBottomSheet from './ipay-calendar-bottom-sheet.component';

export default {
  title: 'components/IPayCalendarBottomSheet',
  component: IPayCalendarBottomSheet,
};

const Template = (args) => (
  <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <IPayCalendarBottomSheet {...args} />
  </IPayView>
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomHeading = Template.bind({});
WithCustomHeading.args = {
  heading: 'Custom Heading',
};
