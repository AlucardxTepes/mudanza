import { IItem } from 'app/shared/model/item.model';

export interface IItemPicture {
  id?: number;
  filename?: string;
  item?: IItem;
}

export class ItemPicture implements IItemPicture {
  constructor(public id?: number, public filename?: string, public item?: IItem) {}
}
