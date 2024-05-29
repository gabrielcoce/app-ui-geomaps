import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const BASE_URL = environment.API_PLACES;
@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private readonly http = inject(HttpClient);
  constructor() {}

  getData<T>(
    url: string,
    options: {
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
    }
  ) {
    url = BASE_URL + url;
    return this.http.get<T>(url, {
      params: {
        limit: 5,
        language: 'es',
        country: 'gt',
        access_token: environment.API_KEY,
        ...options.params,
      },
    });
  }
}
