import React, { ReactNode } from 'react';

/**
 * Defines the props interface for the IPayCustomSheetProps component.
 * These props are used to customize the behavior and appearance of the sheet.
 */
export interface IPayCustomSheetProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;

  /**
   * children for the component.
   */
  children: React.JSX.Element;

  /**
   * dynamic height of the balance box calculated by layout.
   */
  boxHeight?: number;
  /**
   * top space that custom sheet need to be maintain
   */
  topScale?: number;
  /**
   * to add gradient top handler
   */
  gradientHandler?: boolean;
  /**
   * to add simple top handler with icon
   */
  simpleHandler?: boolean;
  /**
   * to add customized handler other than available options
   */
  customHandler?: ReactNode;
  /**
   * close trigger for the sheet
   */
  closeTrigger?: boolean;
}
