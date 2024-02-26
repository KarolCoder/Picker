import {tabsTags} from './constants';
import {type SavedTag, type Tag} from './Types';

let savedTags: SavedTag[] = [];

export const getTagsForTab = (tabId: string): Promise<Tag[]> => {
  return Promise.resolve(tabsTags[tabId]);
};

export const getSavedTags = (): Promise<SavedTag[]> => {
  return Promise.resolve(savedTags);
};

export const saveTagsRest = (tags: SavedTag[]): Promise<void> => {
  savedTags = tags;
  return Promise.resolve();
};
