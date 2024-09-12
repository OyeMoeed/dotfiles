import { alertType, alertVariant } from '@app/utilities/enums.util';
import React from 'react';

/**
 * Defines the props interface for the IpayAlert component.
 * These props are used to customize the behavior and appearance of the alert.
 */
export interface IPayAlertProps {
  testID?: string;
  // The title displayed at the top of the alert
  title: string;

  // The main message content displayed in the body of the alert
  message: string;

  // The variant of the alert, influencing its visual style and behavior
  variant?: alertVariant;

  // An optional icon element to be displayed alongside the title or message
  icon?: React.ReactNode;

  // Controls the visibility of the alert; true to show, false to hide
  visible?: boolean;

  // Callback function invoked when the user closes the alert
  onClose?: () => void;

  // Specifies the type of the alert, affecting its layout and functionality
  type?: alertType;

  // Configuration for the primary action button, typically the main interaction
  primaryAction?: { text: string; onPress: () => void };

  // Configuration for the secondary action button, providing an alternative choice
  secondaryAction?: { text: string; onPress: () => void };

  // Configuration for the tertiary action button, offering another option
  tertiaryAction?: { text: string; onPress: () => void };

  // Determines whether touching outside the alert closes it (true) or not (false)
  closeOnTouchOutside?: boolean;

  // Specifies the animation type when the alert is shown or hidden (fade, none, slide)
  animationType?: 'fade' | 'none' | 'slide';

  // Indicates whether to display the icon within the alert or not
  showIcon?: boolean;

  leftIcon?: React.JSX.Element;
}
