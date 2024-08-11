import React from 'react';

import useTheme from '@app/styles/hooks/theme.hook';

import { IPayList } from '@app/components/molecules';
import { IPayIcon } from '@app/components/atoms';
import { IPayListToggleProps } from './card-options.interface';

const IPayCardOptionsIPayListToggle: React.FC<IPayListToggleProps> = ({
  leftIcon,
  title,
  onToggleChange,
  toggleState,
}: IPayListToggleProps) => {
  const { colors } = useTheme();

  return (
    <IPayList
      isShowLeftIcon
      leftIcon={<IPayIcon icon={leftIcon} size={24} color={colors.natural.natural1000} />}
      title={title}
      isShowIPayToggleButton
      onToggleChange={onToggleChange}
      toggleState={toggleState}
    />
  );
};

export default IPayCardOptionsIPayListToggle;