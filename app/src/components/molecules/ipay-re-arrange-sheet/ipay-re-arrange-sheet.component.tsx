import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { scale } from 'react-native-size-matters';
import { setItems } from '../../../store/slices/rearrangement-slice';
import styles from './ipay-re-arrange-sheet.style';

const IPayRearrangeSheet: React.FC = ({ testID }: { testID?: string }): JSX.Element => {
  const dispatch = useTypedDispatch();
  const items = useTypedSelector((state) => state.rearrangement.items);
  const { colors } = useTheme();

  const renderItem = ({ item, drag, isActive }: RenderItemParams<number>) => {
    return (
      <IPayPressable
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rearrangeContStyle, isActive && { backgroundColor: colors.natural.natural700 }]}
      >
        <>
          <IPayFootnoteText>{item}</IPayFootnoteText>
          <IPayIcon icon={icons.rearrange} size={scale(scale(18))} color={colors.primary.primary500} />
        </>
      </IPayPressable>
    );
  };

  return (
    <IPayView testID={testID} style={styles.listContainer}>
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
