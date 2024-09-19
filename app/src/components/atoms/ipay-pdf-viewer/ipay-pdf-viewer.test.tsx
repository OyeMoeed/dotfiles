import { render } from '@testing-library/react-native';
import IPayPdfViewer from './ipay-pdf-viewer.component';

jest.mock('react-native-pdf', () => 'Pdf');

describe('IPayPdfViewer', () => {
  const defaultProps = {
    testID: 'pdf-viewer',
    style: { backgroundColor: 'white' },
    sourceURL: 'http://example.com/test.pdf',
  };

  it('renders correctly with given props', () => {
    const { getByTestId } = render(<IPayPdfViewer {...defaultProps} />);
    const pdfComponent = getByTestId('pdf-viewer');

    expect(pdfComponent).toBeTruthy();
    expect(pdfComponent.props.source.uri).toBe(defaultProps.sourceURL);
    expect(pdfComponent.props.style).toContainEqual(defaultProps.style);
  });

  it('applies default styles from pdfViewerStyles', () => {
    const { getByTestId } = render(<IPayPdfViewer {...defaultProps} />);
    const pdfComponent = getByTestId('pdf-viewer');

    // Check that the style includes the default container style from pdfViewerStyles
    expect(pdfComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '100%', height: '100%' })]),
    );
  });

  it('passes additional props to the Pdf component', () => {
    const additionalProps = {
      horizontal: true,
    };

    const { getByTestId } = render(<IPayPdfViewer {...defaultProps} {...additionalProps} />);
    const pdfComponent = getByTestId('pdf-viewer');

    expect(pdfComponent.props.horizontal).toBe(true);
  });
});
