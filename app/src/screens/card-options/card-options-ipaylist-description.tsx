import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';

import { IPayList } from '@app/components/molecules';
import { IPayIcon } from '@app/components/atoms';
import { IPayListDescriptionProps } from './card-options.interface';

const CardOptionsIPayListDescription: React.FC<IPayListDescriptionProps> = ({
  leftIcon,
  rightIcon,
  title,
  subTitle,
  detailText,
  onPress,
}: IPayListDescriptionProps) => {
  const { colors } = useTheme();

  return (
    <IPayList
      onPress={onPress}
      isShowLeftIcon={true}
      isShowSubTitle={true}
      isShowIcon={true}
      leftIcon={<IPayIcon icon={leftIcon} size={24} color={colors.natural.natural1000} />}
      icon={<IPayIcon icon={rightIcon} size={18} color={colors.primary.primary500} />}
      title={title}
      subTitle={subTitle}
      detailText={detailText}
      onPressIcon={onPress}
    />
  );
};

export default CardOptionsIPayListDescription;
