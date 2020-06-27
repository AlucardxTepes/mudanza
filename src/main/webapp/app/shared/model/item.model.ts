import { IItemBuyer } from 'app/shared/model/item-buyer.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';

export interface IItem {
  id?: number;
  price?: number;
  name?: string;
  quantity?: number;
  currency?: Currency;
  description?: string;
  buyerList?: IItemBuyer[];
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public price?: number,
    public name?: string,
    public quantity?: number,
    public currency?: Currency,
    public description?: string,
    public buyerList?: IItemBuyer[]
  ) {}
}
