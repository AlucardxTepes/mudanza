import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IItemBuyer, ItemBuyer } from 'app/shared/model/item-buyer.model';
import { ItemBuyerService } from './item-buyer.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-item-buyer-update',
  templateUrl: './item-buyer-update.component.html'
})
export class ItemBuyerUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItem[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    email: [],
    quantity: [null, [Validators.required, Validators.min(1)]],
    timestamp: [],
    paid: [],
    item: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemBuyerService: ItemBuyerService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemBuyer }) => {
      this.updateForm(itemBuyer);
    });
    this.itemService
      .query()
      .subscribe((res: HttpResponse<IItem[]>) => (this.items = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemBuyer: IItemBuyer) {
    this.editForm.patchValue({
      id: itemBuyer.id,
      name: itemBuyer.name,
      phone: itemBuyer.phone,
      email: itemBuyer.email,
      quantity: itemBuyer.quantity,
      timestamp: itemBuyer.timestamp != null ? itemBuyer.timestamp.format(DATE_TIME_FORMAT) : null,
      paid: itemBuyer.paid,
      item: itemBuyer.item
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemBuyer = this.createFromForm();
    if (itemBuyer.id !== undefined) {
      this.subscribeToSaveResponse(this.itemBuyerService.update(itemBuyer));
    } else {
      this.subscribeToSaveResponse(this.itemBuyerService.create(itemBuyer));
    }
  }

  private createFromForm(): IItemBuyer {
    return {
      ...new ItemBuyer(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      phone: this.editForm.get(['phone']).value,
      email: this.editForm.get(['email']).value,
      quantity: this.editForm.get(['quantity']).value,
      timestamp:
        this.editForm.get(['timestamp']).value != null ? moment(this.editForm.get(['timestamp']).value, DATE_TIME_FORMAT) : undefined,
      paid: this.editForm.get(['paid']).value,
      item: this.editForm.get(['item']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemBuyer>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackItemById(index: number, item: IItem) {
    return item.id;
  }
}
