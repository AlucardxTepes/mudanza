import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemBuyer } from 'app/shared/model/item-buyer.model';

@Component({
  selector: 'jhi-item-buyer-detail',
  templateUrl: './item-buyer-detail.component.html'
})
export class ItemBuyerDetailComponent implements OnInit {
  itemBuyer: IItemBuyer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemBuyer }) => {
      this.itemBuyer = itemBuyer;
    });
  }

  previousState() {
    window.history.back();
  }
}
