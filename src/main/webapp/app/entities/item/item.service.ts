import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItem } from 'app/shared/model/item.model';
import { IItemWithPictures, ItemWithPictures } from 'app/shared/model/item-with-pictures.model';

type EntityResponseType = HttpResponse<IItem>;
type EntityArrayResponseType = HttpResponse<IItem[]>;
type EntityWithPicturesResponseType = HttpResponse<IItemWithPictures>;
type EntityWithPicturesArrayResponseType = HttpResponse<IItemWithPictures[]>;

@Injectable({ providedIn: 'root' })
export class ItemService {
  public resourceUrl = SERVER_API_URL + 'api/items';

  constructor(protected http: HttpClient) {}

  create(item: IItem): Observable<EntityResponseType> {
    return this.http.post<IItem>(this.resourceUrl, item, { observe: 'response' });
  }

  update(item: IItem): Observable<EntityResponseType> {
    return this.http.put<IItem>(this.resourceUrl, item, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findWithPictures(id: number): Observable<EntityWithPicturesResponseType> {
    return this.http.get<IItemWithPictures>(`api/itemWithPictures/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityWithPicturesArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemWithPictures[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
