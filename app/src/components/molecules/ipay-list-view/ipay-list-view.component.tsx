import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayList } from '@components/molecules';
import React from 'react';
import { IPayListViewProps } from './ipay-list-view.interface';
import listViewStyles from './ipay-list-view.style';

const IPayListView: React.FC<IPayListViewProps> = ({ testID, list, cardStyles, selectedListItem, onPressListItem }) => {
  const { colors } = useTheme();
  const styles = listViewStyles(colors);
  const selectedIcon = (text: string) => (selectedListItem && selectedListItem === text) || false;
  const iconComponent = (text: string) =>
    selectedListItem && selectedListItem === text ? (
      <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
    ) : undefined;

  return (
    <IPayView testID={`${testID}-list-view`} style={[styles.container, styles]}>
      <IPayFlatlist
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <IPayList
            style={cardStyles}
            textStyle={styles.titleStyle}
            title={item.text}
            isShowIcon={selectedIcon(item.text)}
            icon={iconComponent(item.text)}
            onPress={() => {
              onPressListItem(item.text);
            }}
          />
        )}
        style={styles.listContainer}
      />
    </IPayView>
  );
};

export default IPayListView;
