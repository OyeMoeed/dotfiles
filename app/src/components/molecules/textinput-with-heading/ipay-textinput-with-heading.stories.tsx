import colors from '@app/styles/colors.styles';
import { SCALE_1, SCALE_10, SCALE_14, SCALE_16, SCALE_4, SCALE_60 } from '@app/styles/spacing.styles';
import { IPayView } from '@components/atoms';
import { IPayTextInputWithHeading } from '@components/molecules';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const IPayTextInputWithHeadingMeta: Meta<typeof IPayTextInputWithHeading> = {
  title: 'components/input feilds/IPayTextInputWithHeading',
  component: IPayTextInputWithHeading,
  argTypes: {
    onChangeTextCallback: { action: 'Text entered' }
  },
  args: {
    heading: 'Enter Name',
    containerStyle: {
      height: SCALE_60,
      width: '90%',
      // marginHorizontal: SCALE_10,
      justifyContent: 'center'
    },
    headingStyles: {
      color: colors.black,
      fontSize: SCALE_14
    },
    inputTextStyles: {
      flex: 1,
      borderWidth: SCALE_1,
      borderRadius: SCALE_4,
      color: colors.black,
      fontSize: SCALE_16,
      paddingHorizontal: SCALE_10,
      paddingVertical: SCALE_4,
      borderColor: colors.black
    }
  },
  decorators: [
    (Story) => (
      <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </IPayView>
    )
  ]
};

export default IPayTextInputWithHeadingMeta;

export const Basic: StoryObj<typeof IPayTextInputWithHeadingMeta> = {};

export const SmallerTextInput: StoryObj<typeof IPayTextInputWithHeading> = {
  args: {
    heading: 'Enter Age',
    containerStyle: {
      height: SCALE_60,
      width: '50%',
      // marginHorizontal: SCALE_10,
      justifyContent: 'center'
    },
    headingStyles: {
      color: colors.black,
      fontSize: SCALE_14
    },
    inputTextStyles: {
      flex: 1,
      borderWidth: SCALE_1,
      borderRadius: SCALE_4,
      color: colors.black,
      fontSize: SCALE_14,
      paddingHorizontal: SCALE_10,
      paddingVertical: SCALE_4,
      borderColor: colors.black
    }
  }
};
