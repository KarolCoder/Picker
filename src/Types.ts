export type Category = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  selectLevelEnabled: boolean;
};

export type Level = {level: number};

export type SavedTag = Pick<Tag, 'id'> & Level;

export type SelectedTag = Tag & Level;
