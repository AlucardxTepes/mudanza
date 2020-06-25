import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemWithPictures } from 'app/shared/model/item-with-pictures.model';
import { IMAGES_PATH } from 'app/app.constants';
import { ItemBuyerService } from 'app/entities/item-buyer/item-buyer.service';
import { IItemBuyer, ItemBuyer } from 'app/shared/model/item-buyer.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['item-update.component.scss']
})
export class ItemDetailComponent implements OnInit {
  itemWithPictures: IItemWithPictures;
  images = new Set();
  itemBuyers = Array.of<ItemBuyer>();

  constructor(protected activatedRoute: ActivatedRoute, protected itemBuyerService: ItemBuyerService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemWithPictures }) => {
      this.itemWithPictures = itemWithPictures;
      this.updateImages(itemWithPictures);
      this.updateItemBuyers(itemWithPictures.item.id);
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

  private updateItemBuyers(itemId: number) {
    this.itemBuyerService.findByItemId(itemId).subscribe((res: HttpResponse<IItemBuyer[]>) => {
      this.itemBuyers = res.body;
    });
  }
}
