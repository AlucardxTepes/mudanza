import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IItem, Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {
  isSaving: boolean;
  faTimes = faTimes;

  editForm = this.fb.group({
    id: [],
    price: [],
    name: [],
    quantity: []
  });
  private imageFiles: File[];

  constructor(protected itemService: ItemService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ item }) => {
      this.updateForm(item);
    });
  }

  updateForm(item: IItem) {
    this.editForm.patchValue({
      id: item.id,
      price: item.price,
      name: item.name,
      quantity: item.quantity
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const item = this.createFromForm();
    if (item.id !== undefined) {
      this.subscribeToSaveResponse(this.itemService.update(item));
    } else {
      this.subscribeToSaveResponse(this.itemService.create(item));
    }
  }

  private createFromForm(): IItem {
    return {
      ...new Item(),
      id: this.editForm.get(['id']).value,
      price: this.editForm.get(['price']).value,
      name: this.editForm.get(['name']).value,
      quantity: this.editForm.get(['quantity']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  onImageFileChanged(event) {
    this.imageFiles = Array.from(event.target.files);
    console.log(this.imageFiles);
    this.imageFiles.forEach(file => this.getImagePreview(file));
    console.log(`fileChange:`);
    console.log(this.imageFiles);
  }

  getImagePreview(image: any) {
    const reader = new FileReader();
    reader.onload = _ => {
      image.imgURL = reader.result;
      image.previewLoaded = true;
      image.readableSize = this.readableBytes(image.size);
    };
    reader.readAsDataURL(image);
  }

  readableBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  deleteThumbImage(image: any) {
    console.log(`Delete IMAGE: `);
    console.log(image);
  }
}
