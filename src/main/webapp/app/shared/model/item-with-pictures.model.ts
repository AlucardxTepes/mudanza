import { IItem } from 'app/shared/model/item.model';

export interface IItemWithPictures {
  item?: IItem;
  pictures?: string[];
}

export class ItemWithPictures implements IItemWithPictures {
  constructor(item?: IItem, public pictures?: string[]) {}
}
