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
  children: JSX.Element;

  /**
   * dynamic height of the balance box calculated by layout.
   */
  boxHeight?: number;
}
