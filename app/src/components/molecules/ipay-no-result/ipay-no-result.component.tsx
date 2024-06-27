// StepIndicator.tsx
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayNoResultProps } from './ipay-no-result.interface';
import noResultStyles from './ipay-no-result.style';

/**
 * A component to display empty results.
 * @param {IPayNoResultProps} props - The props for the IPayDatePickerProps component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {string} props.message - Message to display other than default.
 * @param {string} [props.icon] - To update icon name
 * @param {string} [props.iconColor] - To update icon color
 * @param {string} [props.textColor] - To update text color
 * @param {boolean} [props.showIcon] - To display icon alongside message
 * @param {boolean} [props.showEmptyBox] - To display empty box image alongside message
 * @param {boolean} [props.displayInRow] - To display message and icon in a row
 * @param {object} [props.containerStyle] - Additional styles for main container.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayNoResult: React.FC<IPayNoResultProps> = ({
  testID,
  message,
  icon,
  iconColor,
  textColor,
  showIcon,
  showEmptyBox,
  displayInRow,
  containerStyle,
}) => {
  const { colors } = useTheme();
  const styles = noResultStyles();
  const localizationText = useLocalization();

  return (
    <IPayView testID={testID} style={[styles.container, displayInRow && styles.displayInRowStyle, containerStyle]}>
      {showEmptyBox && (
        <IPayImage
          testID={testID}
          image={images.noRecordBox}
          style={[styles.emptyRecordImage, displayInRow && styles.displayInRowImageStyle]}
        />
      )}
      {showIcon && (
        <IPayView testID={`${testID}-icon`} style={styles.iconWrapper}>
          <IPayIcon icon={icon || icons.clock_1} size={20} color={iconColor || colors.natural.natural500} />
        </IPayView>
      )}
      <IPayCaption1Text testID={testID} color={textColor || colors.primary.primary800} style={styles.messageStyle}>
        {message || localizationText.no_result_available}
      </IPayCaption1Text>
    </IPayView>
  );
};

export default IPayNoResult;
