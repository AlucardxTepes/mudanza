import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemPicture } from 'app/shared/model/item-picture.model';
import { ItemPictureService } from './item-picture.service';
import { ItemPictureComponent } from './item-picture.component';
import { ItemPictureDetailComponent } from './item-picture-detail.component';
import { ItemPictureUpdateComponent } from './item-picture-update.component';
import { IItemPicture } from 'app/shared/model/item-picture.model';

@Injectable({ providedIn: 'root' })
export class ItemPictureResolve implements Resolve<IItemPicture> {
  constructor(private service: ItemPictureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemPicture> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((itemPicture: HttpResponse<ItemPicture>) => itemPicture.body));
    }
    return of(new ItemPicture());
  }
}

export const itemPictureRoute: Routes = [
  {
    path: '',
    component: ItemPictureComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemPictures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemPictureDetailComponent,
    resolve: {
      itemPicture: ItemPictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemPictures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemPictureUpdateComponent,
    resolve: {
      itemPicture: ItemPictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemPictures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemPictureUpdateComponent,
    resolve: {
      itemPicture: ItemPictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ItemPictures'
    },
    canActivate: [UserRouteAccessService]
  }
];
