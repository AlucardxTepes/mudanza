import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItem } from 'app/shared/model/item.model';
import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';

@Component({
  selector: 'jhi-item-detail',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  itemWithPictures: IItemWithPictures;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemWithPictures }) => {
      this.itemWithPictures = itemWithPictures;
    });
  }

  previousState() {
    window.history.back();
  }
}
