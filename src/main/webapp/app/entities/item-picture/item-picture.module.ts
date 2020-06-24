import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MudanzaSharedModule } from 'app/shared/shared.module';
import { ItemPictureComponent } from './item-picture.component';
import { ItemPictureDetailComponent } from './item-picture-detail.component';
import { ItemPictureUpdateComponent } from './item-picture-update.component';
import { ItemPictureDeleteDialogComponent } from './item-picture-delete-dialog.component';
import { itemPictureRoute } from './item-picture.route';

@NgModule({
  imports: [MudanzaSharedModule, RouterModule.forChild(itemPictureRoute)],
  declarations: [ItemPictureComponent, ItemPictureDetailComponent, ItemPictureUpdateComponent, ItemPictureDeleteDialogComponent],
  entryComponents: [ItemPictureDeleteDialogComponent]
})
export class MudanzaItemPictureModule {}
