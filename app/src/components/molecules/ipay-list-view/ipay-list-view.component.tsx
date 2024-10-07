import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayList } from '@components/molecules';
import React from 'react';
import { IPayListViewProps } from './ipay-list-view.interface';
import listViewStyles from './ipay-list-view.style';

const IPayListView: React.FC<IPayListViewProps> = ({
  testID,
  list,
  selectedListItem,
  onPressListItem,
  isCompleteItem,
  cardStyles,
  listStyles,
}) => {
  const { colors } = useTheme();
  const styles = listViewStyles();
  const selectedIcon = (text: string) => selectedListItem === text || false;
  const iconComponent = (text: string) =>
    selectedListItem === text ? (
      <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
    ) : undefined;

  return (
    <IPayView testID={`${testID}-list-view`} style={[styles.container, styles]}>
      <IPayFlatlist
        data={list}
        keyExtractor={(item, index) => `${item.id.toString()}-${testID}-${index}`}
        renderItem={({ item }) => (
          <IPayList
            style={cardStyles}
            textStyle={styles.titleStyle}
            title={item.text}
            isShowIcon={selectedIcon(item.text)}
            icon={iconComponent(item.text)}
            isShowLeftIcon={item.image}
            leftIcon={item.image && <IPayImage image={item.image} style={styles.listImg} />}
            onPress={() => {
              onPressListItem(isCompleteItem ? item : item);
            }}
          />
        )}
        style={[styles.listContainer, listStyles]}
      />
    </IPayView>
  );
};

export default IPayListView;
