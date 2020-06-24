import { IItemBuyer } from 'app/shared/model/item-buyer.model';

export interface IItem {
  id?: number;
  price?: number;
  name?: string;
  quantity?: number;
  buyerLists?: IItemBuyer[];
  pictures?: string[];
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public price?: number,
    public name?: string,
    public quantity?: number,
    public buyerLists?: IItemBuyer[],
    public pictures?: string[]
  ) {}
}
