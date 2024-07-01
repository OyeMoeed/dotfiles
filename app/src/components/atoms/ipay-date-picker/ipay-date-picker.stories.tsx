import { store } from '@app/store/store';
import { IPayDatePicker, IPayView } from '@components/atoms';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Provider } from 'react-redux';

export default {
  title: 'components/datepicker/IPayDatePicker',
  component: IPayDatePicker,
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedDate, setSelectedDate] = useState('');

  // Handle input change
  const handleChange = (value: string) => {
    setSelectedDate(value);
  };

  return (
    <Provider store={store}>
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <IPayDatePicker {...args} value={selectedDate} onDateChange={handleChange} />
      </IPayView>
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  testID: 'default-datepicker',
  mode: 'date',
};
