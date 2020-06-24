import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemPicture } from 'app/shared/model/item-picture.model';
import { ItemPictureService } from './item-picture.service';

@Component({
  templateUrl: './item-picture-delete-dialog.component.html'
})
export class ItemPictureDeleteDialogComponent {
  itemPicture: IItemPicture;

  constructor(
    protected itemPictureService: ItemPictureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemPictureService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'itemPictureListModification',
        content: 'Deleted an itemPicture'
      });
      this.activeModal.dismiss(true);
    });
  }
}
