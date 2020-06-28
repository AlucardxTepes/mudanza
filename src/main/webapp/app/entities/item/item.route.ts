import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from './item.service';
import { ItemComponent } from './item.component';
import { ItemDetailComponent } from './item-detail.component';
import { ItemUpdateComponent } from './item-update.component';
import { ItemWithPictures } from 'app/shared/model/item-with-pictures.model';

@Injectable({ providedIn: 'root' })
export class ItemResolve implements Resolve<ItemWithPictures> {
  constructor(private service: ItemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ItemWithPictures> {
    const id = route.params['id'];
    if (id) {
      return this.service.findWithPictures(id).pipe(map((itemWithPictures: HttpResponse<ItemWithPictures>) => itemWithPictures.body));
    }
    return of(new ItemWithPictures());
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
      // authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Items'
    }
  },
  {
    path: ':id/view',
    component: ItemDetailComponent,
    resolve: {
      itemWithPictures: ItemResolve
    },
    data: {
      // authorities: ['ROLE_USER'],
      pageTitle: 'Items'
    }
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
      itemWithPictures: ItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Items'
    },
    canActivate: [UserRouteAccessService]
  }
];
