import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { ItemComponent } from './item.component';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';
import { IItem } from 'app/shared/model/item.model';

@Injectable({ providedIn: 'root' })
export class ItemResolve implements Resolve<IItem> {
  constructor(private service: ItemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((item: HttpResponse<Item>) => item.body));
    }
    return of(new Item());
  }
}

export const itemRoute: Routes = [
  {
    path: '',
    component: ItemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Items'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemDetailComponent,
    resolve: {
      item: ItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Items'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Items'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemUpdateComponent,
    resolve: {
      item: ItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Items'
    },
    canActivate: [UserRouteAccessService]
  }
];
