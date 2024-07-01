import { IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import IPayButton from '../ipay-button/ipay-button.component';
import { useShareableImage } from './ipay-shareable-imageview.hook';
import IPayShareableImageViewProps from './ipay-shareable-imageview.interface';
import shareableViewStyles from './ipay-shareable-imageview.style';

const IPayShareableImageView: React.FC<IPayShareableImageViewProps> = ({ children, otherView, testID }) => {
  const { viewShotRef, shareImage } = useShareableImage();
  const { colors } = useTheme();
  const styles = shareableViewStyles(colors);

  // Recursive function to attach the onPress to the share button
  const attachShareHandler = (element: React.ReactNode): React.ReactNode => {
    // If the element is a valid React element
    if (React.isValidElement(element)) {
      // Check if the element is the share button
      if (element.type === IPayButton && element.props.shareable) {
        // Attach the shareImage function to the onPress property
        return React.cloneElement(element, {
          onPress: () => {
            shareImage(),
              setTimeout(() => {
                element.props.onPress();
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
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
        {children}
      </ViewShot>
      {attachShareHandler(otherView)}
    </IPayView>
  );
};

export default IPayShareableImageView;
