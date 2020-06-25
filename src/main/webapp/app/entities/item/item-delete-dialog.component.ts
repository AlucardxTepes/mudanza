import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';

@Component({
  templateUrl: './item-delete-dialog.component.html'
})
export class ItemDeleteDialogComponent {
  item: IItemWithPictures;

  constructor(protected itemService: ItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemListModification',
        content: 'Deleted an item'
      });
      this.activeModal.dismiss(true);
    });
  }
}
