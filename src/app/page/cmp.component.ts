import {EntryCollection} from 'contentful';

export interface CmpComponent {
  pageCollection: EntryCollection<any>;
  componentId: string;
}
