import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MudanzaSharedModule } from 'app/shared/shared.module';
import { ItemBuyerComponent } from './item-buyer.component';
import { ItemBuyerDetailComponent } from './item-buyer-detail.component';
import { ItemBuyerUpdateComponent } from './item-buyer-update.component';
import { ItemBuyerDeleteDialogComponent } from './item-buyer-delete-dialog.component';
import { itemBuyerRoute } from './item-buyer.route';

@NgModule({
  imports: [MudanzaSharedModule, RouterModule.forChild(itemBuyerRoute)],
  declarations: [ItemBuyerComponent, ItemBuyerDetailComponent, ItemBuyerUpdateComponent, ItemBuyerDeleteDialogComponent],
  entryComponents: [ItemBuyerDeleteDialogComponent]
})
export class MudanzaItemBuyerModule {}
