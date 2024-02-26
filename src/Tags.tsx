import {memo, useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import SelectLevelModal from './SelectLevelModal';
import {type Tag} from './Types';

type TagsProps = {
  tags: Tag[];
  onTagPress: (tag: Tag, level: number) => void;
  disableSelectLevel?: boolean;
};

const Tags = ({
  tags,
  onTagPress: propsOnTagPress,
  disableSelectLevel,
}: TagsProps) => {
  const [tagSelected, setTagSelected] = useState<Tag>();

  const onTagPress = (selectLevelEnabled: boolean, tag: Tag) => {
    if (selectLevelEnabled && !disableSelectLevel) {
      setTagSelected(tag);
      return;
    }
    propsOnTagPress(tag, 0);
  };

  const onSelectLevelPress = useCallback(
    (level: number) => {
      if (tagSelected) {
        propsOnTagPress(tagSelected, level);
      }
      setTagSelected(undefined);
    },
    [propsOnTagPress, tagSelected],
  );

  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      {tags.map(tag => {
        const {id, name, selectLevelEnabled} = tag;
        return (
          <TouchableOpacity
            onPress={() => onTagPress(selectLevelEnabled, tag)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: 'white',
              borderWidth: 10,
              borderColor: 'blue',
            }}
            key={id}>
            <Text>{name}</Text>
          </TouchableOpacity>
        );
      })}
      <SelectLevelModal visible={!!tagSelected} onPress={onSelectLevelPress} />
    </View>
  );
};

export default memo(Tags);
