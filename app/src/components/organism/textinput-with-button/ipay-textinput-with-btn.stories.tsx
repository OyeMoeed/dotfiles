import { store } from '@app/store/store';
import { SCALE_1, SCALE_10, SCALE_14, SCALE_16, SCALE_4, SCALE_6, SCALE_60 } from '@app/styles/spacing.styles';
import { IPayView } from '@components/atoms';
import { IPayTextInputWithSubmitBtn } from '@components/organism';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

const IPayTextInputWithBtnMeta: Meta<typeof IPayTextInputWithSubmitBtn> = {
  title: 'components/IPayTextInputWithSubmitBtn',
  component: IPayTextInputWithSubmitBtn,
  argTypes: {
    onPressBtn: { action: 'Text entered' }
  },
  args: {
    inputTextHeading: 'Enter your name',
    placeholder: 'Enter Data',
    containerStyles: {
      width: '90%',
      borderRadius: SCALE_6,
      borderWidth: SCALE_1,
      padding: SCALE_6
    },
    btnStyle: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center'
      // paddingVertical: SCALE_6,
    },
    btnTextStyles: {
      color: colors.white,
      fontSize: SCALE_14,
      textAlign: 'center'
    },
    inputTextContainerStyles: {
      height: SCALE_60,
      marginBottom: SCALE_10,
      justifyContent: 'center'
    },
    inputTextHeadingStyles: {
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
      <Provider store={store}>
        <IPayView style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Story />
        </IPayView>
      </Provider>
    )
  ]
};

export default IPayTextInputWithBtnMeta;

export const Basic: StoryObj<typeof IPayTextInputWithBtnMeta> = {};

export const RNTextInputWithSmallerSubmitBtn: StoryObj<typeof IPayTextInputWithSubmitBtn> = {
  args: {
    inputTextHeading: 'Enter your name',
    placeholder: 'Enter Data',
    containerStyles: {
      width: '90%',
      borderRadius: SCALE_6,
      borderWidth: SCALE_1,
      padding: SCALE_6
    },
    btnStyle: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      alignSelf: 'center'
      // paddingVertical: SCALE_6,
    },
    btnTextStyles: {
      color: colors.white,
      fontSize: SCALE_14,
      textAlign: 'center'
    },
    inputTextContainerStyles: {
      height: SCALE_60,
      marginBottom: SCALE_10,
      justifyContent: 'center'
    },
    inputTextHeadingStyles: {
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
  }
};
