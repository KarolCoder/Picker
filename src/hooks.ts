import {useCallback, useEffect, useRef, useState} from 'react';

import {categories} from './constants';
import {
  type SelectedTag,
  type Category,
  type SavedTag,
  type Tag,
} from './Types';
import {getTagsForTab, saveTagsRest} from './utils';
import {MessageOverlayProps} from './MessageOverlay';

export const usePicker = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[stepIndex],
  );
  const [selectableTagsForCategory, setSelectableTagsForCategory] = useState<
    Tag[]
  >([]);
  const [selectedTagsForCategory, setSelectedTagsForCategory] = useState<
    SelectedTag[]
  >([]);
  const [overlayMessageConfig, setOverlayMessageConfig] =
    useState<MessageOverlayProps>();
  const selectedTagsWhenOpeningCategory = useRef<SelectedTag[]>();

  const allSelectedTagsForCategories = useRef<Map<string, SelectedTag[]>>(
    new Map(),
  );

  useEffect(() => {
    const fetchTagsForTab = async () => {
      const tags = await getTagsForTab(selectedCategory.id);
      const selectedTags =
        allSelectedTagsForCategories.current.get(selectedCategory.id) || [];
      const selectableTags = tags.filter(tag => {
        if (selectedTags.length === 0) {
          return true;
        }
        return !selectedTags.find(selectedTag => selectedTag.id === tag.id);
      });
      selectedTagsWhenOpeningCategory.current = selectedTags;
      setSelectedTagsForCategory(selectedTags);
      setSelectableTagsForCategory(selectableTags);
    };
    fetchTagsForTab();
  }, [selectedCategory]);

  const updateStep = useCallback((index: number) => {
    setStepIndex(index);
    setSelectedCategory(categories[index]);
  }, []);

  const onSaveButtonPress = useCallback(() => {
    if (allSelectedTagsForCategories.current.size === 0) {
      return;
    }
    const allTags: SavedTag[] = [];
    for (const tags of allSelectedTagsForCategories.current.values()) {
      allTags.push(...tags.map(tag => ({id: tag.id, level: tag.level})));
    }
    saveTagsRest(allTags);
    if (stepIndex < categories.length - 1) {
      updateStep(stepIndex + 1);
    }
  }, [stepIndex, updateStep]);

  const onSelectedTagPress = useCallback(
    (tag: Tag) => {
      setSelectableTagsForCategory(tags => {
        return [...tags, tag];
      });
      const updatedSelectedTagsForCategory = selectedTagsForCategory.filter(
        activeTag => activeTag.id !== tag.id,
      );
      allSelectedTagsForCategories.current.set(
        selectedCategory.id,
        updatedSelectedTagsForCategory,
      );
      setSelectedTagsForCategory(updatedSelectedTagsForCategory);
    },
    [selectedCategory.id, selectedTagsForCategory],
  );

  const onSelectableTagPress = useCallback(
    (tag: Tag, level: number) => {
      const updatedSelectedTagsForCategory = [
        ...selectedTagsForCategory,
        {...tag, level},
      ];
      allSelectedTagsForCategories.current.set(
        selectedCategory.id,
        updatedSelectedTagsForCategory,
      );
      setSelectedTagsForCategory(updatedSelectedTagsForCategory);
      setSelectableTagsForCategory(tags =>
        tags.filter(activeTag => activeTag.id !== tag.id),
      );
    },
    [selectedCategory.id, selectedTagsForCategory],
  );

  const clearMessageOverlay = useCallback(() => {
    setOverlayMessageConfig(undefined);
  }, []);

  const onCategoryPress = useCallback(
    (id: string) => {
      if (id === selectedCategory.id) {
        return;
      }
      const newTabIndex = categories.findIndex(tab => tab.id === id);
      if (selectedTagsWhenOpeningCategory.current !== selectedTagsForCategory) {
        setOverlayMessageConfig({
          message: 'Ziom zapisz najpierw tagi',
          positiveText: 'Zapisz i przejdz dalej',
          onPositivePress: () => {
            onSaveButtonPress();
            clearMessageOverlay();
          },
          onNegativePress: clearMessageOverlay,
        });
        return;
      }
      if (newTabIndex >= 0 && newTabIndex < stepIndex) {
        updateStep(newTabIndex);
        return;
      }
      if (selectedTagsForCategory.length === 0) {
        setOverlayMessageConfig({
          message: `Najpiew wypełnij ${selectedCategory.name}`,
          onNegativePress: clearMessageOverlay,
        });
        return;
      }
      updateStep(newTabIndex);
    },
    [
      clearMessageOverlay,
      onSaveButtonPress,
      selectedCategory.id,
      selectedCategory.name,
      selectedTagsForCategory,
      stepIndex,
      updateStep,
    ],
  );

  return {
    selectedTagsForCategory,
    overlayMessageConfig,
    clearMessageOverlay,
    onSelectedTagPress,
    onCategoryPress,
    selectedCategoryId: selectedCategory.id,
    selectableTagsForCategory,
    onSelectableTagPress,
    onSaveButtonPress,
  };
};
