import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemBuyer } from 'app/shared/model/item-buyer.model';
import { ItemBuyerService } from './item-buyer.service';
import { ItemBuyerDeleteDialogComponent } from './item-buyer-delete-dialog.component';

@Component({
  selector: 'jhi-item-buyer',
  templateUrl: './item-buyer.component.html'
})
export class ItemBuyerComponent implements OnInit, OnDestroy {
  itemBuyers: IItemBuyer[];
  eventSubscriber: Subscription;

  constructor(protected itemBuyerService: ItemBuyerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.itemBuyerService.query().subscribe((res: HttpResponse<IItemBuyer[]>) => {
      this.itemBuyers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInItemBuyers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemBuyer) {
    return item.id;
  }

  registerChangeInItemBuyers() {
    this.eventSubscriber = this.eventManager.subscribe('itemBuyerListModification', () => this.loadAll());
  }

  delete(itemBuyer: IItemBuyer) {
    const modalRef = this.modalService.open(ItemBuyerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemBuyer = itemBuyer;
  }
}
