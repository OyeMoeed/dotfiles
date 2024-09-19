import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';

import { IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayList } from '@app/components/molecules';
import { IPayListDescriptionProps } from './card-options.interface';
import cardOptionsStyles from './card-options.style';

const IPayCardOptionsIPayListDescription: React.FC<IPayListDescriptionProps> = ({
  leftIcon,
  rightIcon,
  title,
  subTitle,
  detailText,
  onPress,
}: IPayListDescriptionProps) => {
  const { colors } = useTheme();
  const styles = cardOptionsStyles(colors);

  return (
    <IPayList
      onPress={onPress}
      isShowLeftIcon
      isShowSubTitle
      isShowIcon
      leftIcon={<IPayIcon icon={leftIcon} size={24} color={colors.natural.natural1000} />}
      icon={
        <IPayView style={styles.changeTextContainer}>
          {detailText && <IPaySubHeadlineText regular text={detailText} color={colors.primary.primary500} />}
          <IPayIcon icon={rightIcon} size={18} color={colors.primary.primary500} />
        </IPayView>
      }
      title={title}
      subTitle={subTitle}
      onPressIcon={onPress}
    />
  );
};

export default IPayCardOptionsIPayListDescription;
