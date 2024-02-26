import React, {memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import Categories from './Categories';
import {categories} from './constants';
import {usePicker} from './hooks';
import MessageOverlay from './MessageOverlay';
import Tags from './Tags';

const Picker = () => {
  const {
    onSaveButtonPress,
    onSelectableTagPress,
    onSelectedTagPress,
    onCategoryPress,
    overlayMessageConfig,
    selectableTagsForCategory,
    selectedCategoryId,
    selectedTagsForCategory,
  } = usePicker();

  const saveButtonDisabled = selectedTagsForCategory.length === 0;

  return (
    <View style={{marginTop: 50}}>
      {overlayMessageConfig && <MessageOverlay {...overlayMessageConfig} />}
      <Tags
        disableSelectLevel
        tags={selectedTagsForCategory}
        onTagPress={onSelectedTagPress}
      />
      <Categories
        onCategoryPress={onCategoryPress}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
      />
      <Tags
        tags={selectableTagsForCategory}
        onTagPress={onSelectableTagPress}
      />
      <TouchableOpacity
        disabled={saveButtonDisabled}
        onPress={onSaveButtonPress}
        style={{
          padding: 20,
          borderWidth: 1,
          borderColor: saveButtonDisabled ? 'red' : 'green',
        }}>
        <Text>Save tags</Text>
      </TouchableOpacity>
    </View>
  );
};
export default memo(Picker);
