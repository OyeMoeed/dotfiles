import { IPayText } from '@app/components/atoms';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { render } from '@testing-library/react-native';
import React from 'react';
import IPayBottomSheet from './ipay-bottom-sheet.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      bottomsheetGradient: ['#000000', '#FFFFFF']
    }
  })
}));

// Mock the FullWindowOverlay component
jest.mock('./ipay-full-window-overlay', () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

describe('IPayBottomSheet', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    expect(getByText('Test Child')).toBeTruthy();
  });

  it('should call present method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.present();
    expect(ref.current.present).toBeDefined();
  });

  it('should call close method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.close();
    expect(ref.current.close).toBeDefined();
  });

  it('should call snapToIndex method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.snapToIndex(1);
    expect(ref.current.snapToIndex).toBeDefined();
  });

  it('should call snapToPosition method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.snapToPosition(200);
    expect(ref.current.snapToPosition).toBeDefined();
  });

  it('should call expand method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.expand();
    expect(ref.current.expand).toBeDefined();
  });

  it('should call collapse method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.collapse();
    expect(ref.current.collapse).toBeDefined();
  });

  it('should call forceClose method', () => {
    const ref = React.createRef<any>();
    const { getByTestId } = render(
      <BottomSheetModalProvider>
        <IPayBottomSheet ref={ref}>
          <IPayText>Test Child</IPayText>
        </IPayBottomSheet>
      </BottomSheetModalProvider>
    );

    ref.current.forceClose();
    expect(ref.current.forceClose).toBeDefined();
  });
});
