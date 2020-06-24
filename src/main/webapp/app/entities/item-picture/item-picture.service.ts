import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemPicture } from 'app/shared/model/item-picture.model';

type EntityResponseType = HttpResponse<IItemPicture>;
type EntityArrayResponseType = HttpResponse<IItemPicture[]>;

@Injectable({ providedIn: 'root' })
export class ItemPictureService {
  public resourceUrl = SERVER_API_URL + 'api/item-pictures';

  constructor(protected http: HttpClient) {}

  create(itemPicture: IItemPicture): Observable<EntityResponseType> {
    return this.http.post<IItemPicture>(this.resourceUrl, itemPicture, { observe: 'response' });
  }

  update(itemPicture: IItemPicture): Observable<EntityResponseType> {
    return this.http.put<IItemPicture>(this.resourceUrl, itemPicture, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemPicture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemPicture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
