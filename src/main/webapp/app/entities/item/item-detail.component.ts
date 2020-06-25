import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';
import { IMAGES_PATH } from 'app/app.constants';

@Component({
  selector: 'jhi-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['item-update.component.scss']
})
export class ItemDetailComponent implements OnInit {
  itemWithPictures: IItemWithPictures;
  images = new Set();

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemWithPictures }) => {
      this.itemWithPictures = itemWithPictures;
      this.updateImages(itemWithPictures);
    });
  }

  previousState() {
    window.history.back();
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
            this.images.add(imageFile);
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
