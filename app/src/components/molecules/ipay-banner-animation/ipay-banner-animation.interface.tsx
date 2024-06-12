/**
 * Props for the RNText component.
 */
export interface IPayBannerAnimationProps {
    /**
 * testID for the component to test the element.
 */
testID?: string;
/**
 * trigger function when Press up.
 */
onPressUp?: () => void;
/**
 * trigger function when Press down.
 */
onPressDown?: () => void;
/**
 * trigger function when Press .
 */
onVerify:()=> void;
}
