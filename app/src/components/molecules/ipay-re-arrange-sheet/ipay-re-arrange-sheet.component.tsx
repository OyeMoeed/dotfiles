import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { setItems } from '../../../store/slices/rearrangement-slice';
import { IPayRearrangeSheetProps } from './ipay-re-arrange-sheet.interface';
import genratedStyles from './ipay-re-arrange-sheet.style';

const IPayRearrangeSheet: React.FC<IPayRearrangeSheetProps> = ({ testID }): React.JSX.Element => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const dispatch = useTypedDispatch();
  const localizationText = useLocalization();
  const items = useTypedSelector((state) => state.rearrangement.items);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<number>) => (
    <IPayPressable
      onLongPress={drag}
      disabled={isActive}
      style={[styles.rearrangeContStyle, isActive && styles.activeBg]}
    >
      <>
        <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.COMMON[item]}</IPayFootnoteText>
        <IPayIcon icon={icons.rearrange} size={18} color={colors.primary.primary500} />
      </>
    </IPayPressable>
  );

  return (
    <IPayView testID={`${testID}-rearrange-sheet`} style={styles.listContainer}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        onDragEnd={({ data }) => dispatch(setItems(data))}
      />
    </IPayView>
  );
};

export default IPayRearrangeSheet;
