import { Moment } from 'moment';
import { IItem } from 'app/shared/model/item.model';

export interface IItemBuyer {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  quantity?: number;
  timestamp?: Moment;
  paid?: boolean;
  item?: IItem;
}

export class ItemBuyer implements IItemBuyer {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public email?: string,
    public quantity?: number,
    public timestamp?: Moment,
    public paid?: boolean,
    public item?: IItem
  ) {
    this.paid = this.paid || false;
  }
}
