import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemBuyer } from 'app/shared/model/item-buyer.model';
import { ItemBuyerService } from './item-buyer.service';
import { ItemBuyerComponent } from './item-buyer.component';
import { ItemBuyerDetailComponent } from './item-buyer-detail.component';
import { ItemBuyerUpdateComponent } from './item-buyer-update.component';
import { IItemBuyer } from 'app/shared/model/item-buyer.model';

@Injectable({ providedIn: 'root' })
export class ItemBuyerResolve implements Resolve<IItemBuyer> {
  constructor(private service: ItemBuyerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemBuyer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((itemBuyer: HttpResponse<ItemBuyer>) => itemBuyer.body));
    }
    return of(new ItemBuyer());
  }
}

export const itemBuyerRoute: Routes = [
  {
    path: '',
    component: ItemBuyerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemBuyers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemBuyerDetailComponent,
    resolve: {
      itemBuyer: ItemBuyerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemBuyers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemBuyerUpdateComponent,
    resolve: {
      itemBuyer: ItemBuyerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemBuyers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemBuyerUpdateComponent,
    resolve: {
      itemBuyer: ItemBuyerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemBuyers'
    },
    canActivate: [UserRouteAccessService]
  }
];
