import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import { FiltersType } from '@app/utilities';
import icons from '@app/assets/icons';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterAmountRangeProps } from './ipay-filter-amount-range.interface';

const IPayFilterAmountRange = ({
  title,
  control,
  fromLabel,
  toLabel,
  errors,
  required,
  amountError,
}: IPayFilterAmountRangeProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);

  return (
    <IPayView style={styles.amountCard}>
      <IPayView style={styles.rowInputHeading}>
        <IPayIcon icon={icons.amount} />
        <IPayCaption1Text text={title} style={styles.rowInputHeadingText} />
      </IPayView>

      <IPayView style={styles.rowInput}>
        <Controller
          control={control}
          rules={{ required }}
          render={({ field: { onChange, value = '' } }) => (
            <IPayAnimatedTextInput
              label={fromLabel}
              editable
              inputMode="numeric"
              value={value}
              suffix="COMMON.SAR"
              onChangeText={onChange}
              containerStyle={styles.amount}
              isError={!!errors?.amountFrom}
              assistiveText={errors?.amountFrom ? t('COMMON.REQUIRED_FIELD') : ''}
            />
          )}
          name={FiltersType.AMOUNT_FROM}
        />
        <Controller
          control={control}
          rules={{ required }}
          render={({ field: { onChange, value = '' } }) => (
            <IPayAnimatedTextInput
              label={toLabel}
              editable
              inputMode="numeric"
              value={value}
              suffix="COMMON.SAR"
              onChangeText={onChange}
              containerStyle={styles.amount}
              isError={!!amountError || !!errors?.amountTo}
              assistiveText={errors?.amountTo ? amountError || t('COMMON.REQUIRED_FIELD') : ''}
            />
          )}
          name={FiltersType.AMOUNT_TO}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayFilterAmountRange;
