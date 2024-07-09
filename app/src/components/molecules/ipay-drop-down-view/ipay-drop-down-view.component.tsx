import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { ipayDropdownViewProps } from './ipay-drop-down-view.interface';
import dropdownViewStyles from './ipay-drop-down-view.style';

const IPayDropdownView: React.FC<ipayDropdownViewProps> = ({
  testID,
  style,
  headingText,
  subHeadlinText,
  onPressDropdown,
}) => {
  const { colors } = useTheme();
  const styles = dropdownViewStyles(colors);

  return (
    <IPayPressable style={[styles.container, style]} testID={`${testID}-dropdown-view`} onPress={onPressDropdown}>
      <IPayView>
        <IPayCaption1Text text={headingText} style={styles.headingText} />
        <IPaySubHeadlineText regular text={subHeadlinText || 'Riyad City'} color={colors.natural.natural900} />
      </IPayView>

      <IPayIcon icon={icons.arrow_circle_down} size={24} color={colors.primary.primary500} />
    </IPayPressable>
  );
};

export default IPayDropdownView;
