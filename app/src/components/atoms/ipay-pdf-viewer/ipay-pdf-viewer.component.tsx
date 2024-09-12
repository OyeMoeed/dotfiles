import React from 'react';
import Pdf from 'react-native-pdf';
import { IPayPdfViewerProps } from './ipay-pdf-viewer.interface';
import pdfViewerStyles from './ipay-pdf-viewer.styles';

const IPayPdfViewer: React.FC<IPayPdfViewerProps> = ({ testID, style, sourceURL, ...props }) => {
  const styles = pdfViewerStyles();
  return (
    <Pdf
      trustAllCerts
      spacing={0}
      source={{ uri: sourceURL, cache: true }}
      style={[styles.container, style]}
      {...props}
    />
  );
};

export default IPayPdfViewer;
