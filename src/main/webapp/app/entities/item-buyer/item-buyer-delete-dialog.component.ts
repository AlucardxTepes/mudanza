import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemBuyer } from 'app/shared/model/item-buyer.model';
import { ItemBuyerService } from './item-buyer.service';

@Component({
  templateUrl: './item-buyer-delete-dialog.component.html'
})
export class ItemBuyerDeleteDialogComponent {
  itemBuyer: IItemBuyer;

  constructor(protected itemBuyerService: ItemBuyerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemBuyerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemBuyerListModification',
        content: 'Deleted an itemBuyer'
      });
      this.activeModal.dismiss(true);
    });
  }
}
