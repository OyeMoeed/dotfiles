import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import usePermissions from '@app/hooks/permissions.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayQRCodeScannerComponent from './ipay-qrcode-scanner.component';

import { render } from '@testing-library/react-native';
import { permissionsStatus } from '@app/enums/permissions-status.enum';

// Mock the hooks
jest.mock('@app/hooks/permissions.hook');
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock QRCodeScanner if it has any specific behavior
jest.mock('react-native-qrcode-scanner', () => {
  return jest.fn().mockImplementation(({ onRead, testID }) => {
    return (
      <div data-testid={testID} onClick={() => onRead({ data: 'test-data' })}>
        QRCodeScanner
      </div>
    );
  });
});

describe('IPayQRCodeScannerComponent', () => {
  const onReadMock = jest.fn();
  const localizationMock = {
    go_back: 'Go Back',
    allow_access: 'Allow Access',
    permission_denied: 'Permission Denied',
    enable_camera_permission: 'Please enable camera permission',
  };
  const themeMock = {
    colors: {
      primary: {
        primary500: '#000',
      },
      natural: {
        natural100: '#fff',
      },
      error: {
        error500: '#f00',
      },
      backgrounds: {
        backdrop: '',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalization as jest.Mock).mockReturnValue(localizationMock);
    (useTheme as jest.Mock).mockReturnValue(themeMock);
  });

  it('renders loader when permission status is unknown', () => {
    (usePermissions as jest.Mock).mockReturnValue({ permissionStatus: permissionsStatus.UNKNOWN });

    const { getByTestId } = render(<IPayQRCodeScannerComponent testID="qrcode-component" onRead={onReadMock} />);

    expect(getByTestId('qrcode-component-base-view')).toBeTruthy();
  });

  it('renders QR code scanner when permission is granted', () => {
    (usePermissions as jest.Mock).mockReturnValue({ permissionStatus: permissionsStatus.GRANTED });

    const { getByTestId } = render(<IPayQRCodeScannerComponent testID="qrcode-scanner-view" onRead={onReadMock} />);

    expect(getByTestId('qrcode-scanner-view-base-view')).toBeTruthy();
  });

  it('renders permission denied alert when permission is denied', () => {
    (usePermissions as jest.Mock).mockReturnValue({ permissionStatus: permissionsStatus.DENIED });

    const { getByText } = render(<IPayQRCodeScannerComponent testID="qrcode-scanner" onRead={onReadMock} />);

    expect(getByText(localizationMock.permission_denied)).toBeTruthy();
    expect(getByText(localizationMock.enable_camera_permission)).toBeTruthy();
    expect(getByText(localizationMock.allow_access)).toBeTruthy();
    expect(getByText(localizationMock.go_back)).toBeTruthy();
  });
});
