import {memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import {type Category} from './Types';

type TabsProps = {
  categories: Category[];
  onCategoryPress: (tabId: string) => void;
  selectedCategoryId: string;
};

const Categories = ({
  categories,
  onCategoryPress,
  selectedCategoryId,
}: TabsProps) => {
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      {categories.map(({id, name}) => (
        <TouchableOpacity
          onPress={() => {
            onCategoryPress(id);
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'yellow',
            borderWidth: 10,
            borderColor: selectedCategoryId !== id ? 'yellow' : 'green',
          }}
          key={id}>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Categories);
