import {type Category, type Tag} from './Types';

export const categories: Category[] = [
  {id: '1', name: '1'},
  {id: '2', name: '2'},
  {id: '3', name: '3'},
];

export const tags: Tag[] = [
  {id: '1', name: '1', selectLevelEnabled: true},
  {id: '2', name: '2', selectLevelEnabled: false},
  {id: '3', name: '3', selectLevelEnabled: true},
  {id: '4', name: '4', selectLevelEnabled: true},
  {id: '5', name: '5', selectLevelEnabled: false},
  {id: '6', name: '6', selectLevelEnabled: true},
  {id: '7', name: '7', selectLevelEnabled: true},
  {id: '8', name: '8', selectLevelEnabled: false},
  {id: '9', name: '9', selectLevelEnabled: true},
];

export const tabsTags: Record<string, Tag[]> = {
  1: [tags[0], tags[1], tags[2]],
  2: [tags[3], tags[4], tags[5]],
  3: [tags[6], tags[7], tags[8]],
};
