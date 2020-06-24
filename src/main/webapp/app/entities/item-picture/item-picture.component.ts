import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemPicture } from 'app/shared/model/item-picture.model';
import { ItemPictureService } from './item-picture.service';
import { ItemPictureDeleteDialogComponent } from './item-picture-delete-dialog.component';

@Component({
  selector: 'jhi-item-picture',
  templateUrl: './item-picture.component.html'
})
export class ItemPictureComponent implements OnInit, OnDestroy {
  itemPictures: IItemPicture[];
  eventSubscriber: Subscription;

  constructor(
    protected itemPictureService: ItemPictureService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.itemPictureService.query().subscribe((res: HttpResponse<IItemPicture[]>) => {
      this.itemPictures = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInItemPictures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemPicture) {
    return item.id;
  }

  registerChangeInItemPictures() {
    this.eventSubscriber = this.eventManager.subscribe('itemPictureListModification', () => this.loadAll());
  }

  delete(itemPicture: IItemPicture) {
    const modalRef = this.modalService.open(ItemPictureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemPicture = itemPicture;
  }
}
