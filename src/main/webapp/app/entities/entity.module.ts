import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.MudanzaItemModule)
      },
      {
        path: 'item-buyer',
        loadChildren: () => import('./item-buyer/item-buyer.module').then(m => m.MudanzaItemBuyerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MudanzaEntityModule {}
