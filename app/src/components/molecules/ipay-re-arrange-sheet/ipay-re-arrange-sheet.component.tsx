import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { setItems } from '../../../store/slices/rearrangement-slice';
import genratedStyles from './ipay-re-arrange-sheet.style';

const IPayRearrangeSheet: React.FC = ({ testID }: { testID?: string }): JSX.Element => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const dispatch = useTypedDispatch();
  const items = useTypedSelector((state) => state.rearrangement.items);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<number>) => (
    <IPayPressable
      onLongPress={drag}
      disabled={isActive}
      style={[styles.rearrangeContStyle, isActive && { backgroundColor: colors.natural.natural700 }]}
    >
      <>
        <IPayFootnoteText style={styles.footnoteTextStyle}>{item}</IPayFootnoteText>
        <IPayIcon icon={icons.rearrange} size={18} color={colors.primary.primary500} />
      </>
    </IPayPressable>
  );

  return (
    <IPayView testID={testID} style={[styles.listContainer]}>
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
