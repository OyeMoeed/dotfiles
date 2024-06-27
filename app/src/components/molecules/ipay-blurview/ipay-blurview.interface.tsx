// Define the allowed values for the blur type
type BlurType = 'light' | 'dark';

/**
 * Interface for the properties that the IPayBlurView component accepts.
 */
interface IPayBlurViewProps {
  testID?: string;

  /**
   * The type of blur effect to apply.
   * This is an optional prop that defines the intensity and appearance of the blur.
   * Acceptable values are 'light' and 'dark', which correspond to different levels and styles of blurring.
   * If not provided, the default value will be applied within the component.
   */
  blurType?: BlurType;

  /**
   * The amount of blur to apply.
   * This is an optional prop that controls how strong the blur effect will be.
   * The higher the value, the more pronounced the blur.
   * If not provided, a default value (usually specified in the component) will be used.
   */
  blurAmount?: number;

  /**
   * The fallback color to use when reduced transparency is enabled.
   * This optional prop specifies a color that the view will fall back to if the blur effect cannot be applied due to system settings or other constraints.
   * This ensures the view remains visible and provides a consistent user experience.
   */
  reducedTransparencyFallbackColor?: string;
}

export default IPayBlurViewProps;
