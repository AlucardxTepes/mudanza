import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemBuyer } from 'app/shared/model/item-buyer.model';

type EntityResponseType = HttpResponse<IItemBuyer>;
type EntityArrayResponseType = HttpResponse<IItemBuyer[]>;

@Injectable({ providedIn: 'root' })
export class ItemBuyerService {
  public resourceUrl = SERVER_API_URL + 'api/item-buyers';

  constructor(protected http: HttpClient) {}

  create(itemBuyer: IItemBuyer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemBuyer);
    return this.http
      .post<IItemBuyer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(itemBuyer: IItemBuyer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemBuyer);
    return this.http
      .put<IItemBuyer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IItemBuyer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IItemBuyer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(itemBuyer: IItemBuyer): IItemBuyer {
    const copy: IItemBuyer = Object.assign({}, itemBuyer, {
      timestamp: itemBuyer.timestamp != null && itemBuyer.timestamp.isValid() ? itemBuyer.timestamp.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((itemBuyer: IItemBuyer) => {
        itemBuyer.timestamp = itemBuyer.timestamp != null ? moment(itemBuyer.timestamp) : null;
      });
    }
    return res;
  }
}
