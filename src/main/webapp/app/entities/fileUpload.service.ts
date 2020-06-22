import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItem } from 'app/shared/model/item.model';

type EntityResponseType = HttpResponse<String>;
type EntityArrayResponseType = HttpResponse<String[]>;

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  public resourceUrl = SERVER_API_URL + 'api/upload';

  constructor(protected http: HttpClient) {}

  upload(files: Set<File>, itemId: number): Observable<EntityResponseType> {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    // const httpParams = new HttpParams();
    formData.append('itemId', itemId.toString());

    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };
    // const req = new HttpRequest('POST', this.resourceUrl, formData, options);

    return this.http.post<String>(this.resourceUrl, formData, { observe: 'response' });
  }
}
