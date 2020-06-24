import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemPicture } from 'app/shared/model/item-picture.model';

@Component({
  selector: 'jhi-item-picture-detail',
  templateUrl: './item-picture-detail.component.html'
})
export class ItemPictureDetailComponent implements OnInit {
  itemPicture: IItemPicture;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemPicture }) => {
      this.itemPicture = itemPicture;
    });
  }

  previousState() {
    window.history.back();
  }
}
