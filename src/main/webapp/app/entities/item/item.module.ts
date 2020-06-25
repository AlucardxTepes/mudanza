import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MudanzaSharedModule } from 'app/shared/shared.module';
import { ItemComponent } from './item.component';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';
import { ItemDeleteDialogComponent } from './item-delete-dialog.component';
import { itemRoute } from './item.route';
import { MatGridListModule, MatCardModule, MatButtonModule, MatRippleModule } from '@angular/material';

@NgModule({
  imports: [MudanzaSharedModule, RouterModule.forChild(itemRoute), MatGridListModule, MatCardModule, MatButtonModule, MatRippleModule],
  declarations: [ItemComponent, ItemDetailComponent, ItemUpdateComponent, ItemDeleteDialogComponent],
  entryComponents: [ItemDeleteDialogComponent]
})
export class MudanzaItemModule {}
