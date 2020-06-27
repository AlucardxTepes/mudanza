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
import { FileUploadService } from 'app/entities/fileUpload.service';
import { IMAGES_PATH } from 'app/app.constants';
import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';

@Component({
  selector: 'jhi-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['item-update.component.scss']
})
export class ItemUpdateComponent implements OnInit {
  isSaving: boolean;
  faTimes = faTimes;
  imagesToUpload = new Set();

  editForm = this.fb.group({
    id: [],
    price: [],
    name: [],
    quantity: [],
    currency: [null, [Validators.required]],
    description: []
  });
  private imageFiles: File[];

  constructor(
    protected itemService: ItemService,
    protected fileUploadService: FileUploadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemWithPictures }) => {
      if (itemWithPictures && itemWithPictures.item) {
        this.updateForm(itemWithPictures);
        this.updateImages(itemWithPictures);
      }
    });
  }

  updateForm(itemWithPictures: IItemWithPictures) {
    console.log('IWP');
    console.log(itemWithPictures);
    const item = itemWithPictures.item;
    this.editForm.patchValue({
      id: item.id,
      price: item.price,
      name: item.name,
      quantity: item.quantity,
      currency: item.currency,
      description: item.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const item = this.createFromForm();
    console.log('==== SAVE ===');
    console.log(item);
    if (item.id !== null) {
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
      quantity: this.editForm.get(['quantity']).value,
      currency: this.editForm.get(['currency']).value,
      description: this.editForm.get(['description']).value
    };
  }

  /**
   * 1.POST item to the backend
   * 2.Proceed to uploading the item's images if there are any
   * @param result
   */
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
    result.subscribe(httpResponse => {
      if (this.imagesToUpload.size > 0) {
        this.subscribeToUploadImageResponse(this.fileUploadService.upload(this.imagesToUpload, httpResponse.body.id));
      } else {
        this.onSaveSuccess();
      }
    });
  }

  protected subscribeToUploadImageResponse(result: Observable<HttpResponse<String>>) {
    result.subscribe(() => this.onSaveSuccess());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    console.log('OnSaveSuccess');
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
    console.log('OnSaveError');
  }

  /**
   * Loads new images to be posted to API
   * @param event the file blob containing the image
   */
  onImageFileChanged(event) {
    this.imageFiles = Array.from(event.target.files);
    console.log(this.imageFiles);
    this.imageFiles.forEach(file => {
      this.getImagePreview(file);
      this.imagesToUpload.add(file);
    });
    console.log(`fileChange:`);
    console.log(this.imageFiles);
    console.log(`images in set: ${this.imagesToUpload.size}`);
    console.log(this.imagesToUpload);
  }

  /**
   * Reads image from blob and sets its path to a 'imgURL' field on the image file
   * @param image
   */
  getImagePreview(image: any) {
    const reader = new FileReader();
    reader.onload = _ => {
      image.imgURL = reader.result;
      image.previewLoaded = true;
      image.readableSize = this.readableBytes(image.size);
    };
    reader.readAsDataURL(image);
  }

  /**
   * Converts bytes to readable string format
   * @param bytes
   */
  readableBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  /**
   * Removes image from imagesToUpload Set using image's imageURL field
   * @param image
   */
  deleteThumbImage(image: any) {
    console.log(`Delete IMAGE: `);
    console.log(image);
    this.imagesToUpload.delete(image);
    console.log(`Image set size after delete: ${this.imagesToUpload.size}`);
  }

  private updateImages(itemWithPictures: IItemWithPictures) {
    console.log(`updateImages`);
    if (itemWithPictures.pictures) {
      itemWithPictures.pictures.forEach(filename => {
        const imageFullPath = `${location.origin}/${IMAGES_PATH}/${itemWithPictures.item.id}/${filename}`;
        console.log(imageFullPath);
        fetch(imageFullPath)
          .then(res => res.blob()) // Gets the response and returns it as a blob
          .then(blob => {
            const imageFile = this.blobToFile(blob, filename);
            (imageFile as any).imgURL = imageFullPath;
            (imageFile as any).previewLoaded = true;
            this.imagesToUpload.add(imageFile);
          });
      });
    }
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return theBlob as File;
  };
}
