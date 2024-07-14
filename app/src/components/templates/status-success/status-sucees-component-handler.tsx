import { StatusSuccessVariants } from '@app/utilities/enums.util';
import React from 'react';
import { StatusSuccessComponentHandlerProps } from './status-handler.interface';
import StatusSuccessQuaternaryVariant from './status-succes-quaternary-variant-component/status-succes-quaternary-variant.component';
import StatusSuccessPrimaryVariant from './status-success-primary-variant-component/status-success-primary-variant.component';
import StatusSuccessSecondaryVariant from './status-success-secondary-variant-component/status-success-secondary-variant.component';
import StatusSuccessTertiaryVariant from './status-success-tertiary-variant-component/status-success-tertiary-variant.component';

const StatusSuccessComponentHandler: React.FC<StatusSuccessComponentHandlerProps> = ({
  statusVariant,
  variantProps,
}): React.ReactNode => {
  switch (statusVariant) {
    case StatusSuccessVariants.PRIMARY:
      return <StatusSuccessPrimaryVariant variantProps={variantProps} />;
    case StatusSuccessVariants.SECONDARY:
      return <StatusSuccessSecondaryVariant variantProps={variantProps} />;
    case StatusSuccessVariants.TERTIARY:
      return <StatusSuccessTertiaryVariant variantProps={variantProps} />;
    case StatusSuccessVariants.Quaternary:
      return <StatusSuccessQuaternaryVariant variantProps={variantProps} />;
    default:
      return <></>;
  }
};

export default StatusSuccessComponentHandler;
