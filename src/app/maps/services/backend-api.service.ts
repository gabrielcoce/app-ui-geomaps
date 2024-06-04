import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRSignin, ISignin } from '../../auth/interfaces/auth.interface';
import { IPlaces, IPlaceType } from '../interfaces/places.interface';
const BASE_URL = environment.API_PLACES;
const API_AUTH = environment.API_BACK + '/auth';
const API_TIPO_PLACES = environment.API_BACK + '/tipo-negocio';
const API_PLACES = environment.API_BACK + '/negocio';
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

  signin(data: ISignin) {
    const url = API_AUTH + '/signin';
    return this.http.post<IRSignin>(url, data);
  }

  allPlaces() {
    const url = API_TIPO_PLACES + '/all';
    return this.http.get<IPlaces[]>(url);
  }
  placesById(id: number) {
    const url = `${API_PLACES}/tipo-negocio/${id}`;
    return this.http.get<IPlaceType[]>(url);
  }
}
