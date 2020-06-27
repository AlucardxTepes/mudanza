import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IItemPicture, ItemPicture } from 'app/shared/model/item-picture.model';
import { ItemPictureService } from './item-picture.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';
import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';

@Component({
  selector: 'jhi-item-picture-update',
  templateUrl: './item-picture-update.component.html'
})
export class ItemPictureUpdateComponent implements OnInit {
  isSaving: boolean;

  items: IItemWithPictures[];

  editForm = this.fb.group({
    id: [],
    filename: [null, [Validators.required]],
    item: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemPictureService: ItemPictureService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemPicture }) => {
      this.updateForm(itemPicture);
    });
    this.itemService
      .query()
      .subscribe(
        (res: HttpResponse<IItemWithPictures[]>) => (this.items = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(itemPicture: IItemPicture) {
    this.editForm.patchValue({
      id: itemPicture.id,
      filename: itemPicture.filename,
      item: itemPicture.item
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemPicture = this.createFromForm();
    if (itemPicture.id !== undefined) {
      this.subscribeToSaveResponse(this.itemPictureService.update(itemPicture));
    } else {
      this.subscribeToSaveResponse(this.itemPictureService.create(itemPicture));
    }
  }

  private createFromForm(): IItemPicture {
    return {
      ...new ItemPicture(),
      id: this.editForm.get(['id']).value,
      filename: this.editForm.get(['filename']).value,
      item: this.editForm.get(['item']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemPicture>>) {
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
