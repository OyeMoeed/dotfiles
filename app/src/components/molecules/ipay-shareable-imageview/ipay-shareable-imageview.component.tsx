import { IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import { useShareableImage } from './ipay-shareable-imageview.hook';
import IPayShareableImageViewProps from './ipay-shareable-imageview.interface';
import shareableViewStyles from './ipay-shareable-imageview.style';

const IPayShareableImageView: React.FC<IPayShareableImageViewProps> = ({ children, otherView, testID }) => {
  const { viewShotRef, shareImage } = useShareableImage();
  const { colors } = useTheme();
  const styles = shareableViewStyles(colors);
  const localizationText = useLocalization();
  // Recursive function to attach the onPress to the share button
  const attachShareHandler = (element: React.ReactNode): React.ReactNode => {
    // If the element is a valid React element
    if (React.isValidElement(element)) {
      const isShareButton = element.props.btnText === localizationText.share;

      if (isShareButton) {
        return React.cloneElement(element, {
          onPress: () => {
            shareImage();
            setTimeout(() => {
              element?.props?.onPress && element.props.onPress();
            }, 300);
          },
        });
      }

      // If the element has children, apply the function recursively to each child
      if (element.props.children) {
        // Recursively apply to each child
        const modifiedChildren = React.Children.map(element.props.children, attachShareHandler);

        return React.cloneElement(element, { children: modifiedChildren });
      }
    }
    // Return the element if no modification is needed
    return element;
  };

  return (
    <IPayView testID={`${testID}-shareableView`} style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        {children}
      </ViewShot>
      {attachShareHandler(otherView)}
    </IPayView>
  );
};

export default IPayShareableImageView;
