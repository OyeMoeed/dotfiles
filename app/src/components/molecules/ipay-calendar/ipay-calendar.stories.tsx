import { View } from 'react-native';
import { DateData } from 'react-native-calendars';
import IPayCalendar from './ipay-calendar.component';

export default {
  title: 'IPayCalendar',
  component: IPayCalendar,
};

const Template = (args) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <IPayCalendar {...args} />
  </View>
);

export const Default = Template.bind({});
Default.args = {
  onDateSelected: (date: DateData) => console.log('Selected Date:', date),
};
