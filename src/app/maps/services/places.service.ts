import { inject, Injectable } from '@angular/core';
import {
  Feature,
  IPlaces,
  IPlaceType,
  PlacesResponse,
} from '../interfaces/places.interface';
import { BackendApiService, MapService } from '.';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];
  negocios: IPlaces[] = [];
  place: IPlaceType[] = [];
  private readonly _apiSvc = inject(BackendApiService);
  private readonly _mapSvc = inject(MapService);
  constructor() {
    this.getUserLocation();
  }

  get isUserLocationReady() {
    return !!this.userLocation;
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          console.error(err);
          reject(err);
        }
      );
    });
  }

  getPlacesByQuery(query: string) {
    this.isLoadingPlaces = true;
    this._apiSvc
      .getData<PlacesResponse>(`/${query}.json`, {
        params: { proximity: this.userLocation!.join(',') },
      })
      .subscribe({
        next: (res) => {
          this.isLoadingPlaces = false;
          this.places = res.features;
          this._mapSvc.createMarkersFromPlace(this.places, this.userLocation!);
        },
      });
  }

  getPlacesById(id: number) {
    this.isLoadingPlaces = true;
    this._apiSvc.placesById(id).subscribe({
      next: (res) => {
        this.isLoadingPlaces = false;
        this.place = res.sort((a, b) => {
          if (a.nombre < b.nombre) {
            return -1;
          }
          if (a.nombre > b.nombre) {
            return 1;
          }
          return 0;
        });
        this._mapSvc.createMarkersFromNegocio(this.place, this.userLocation!);
      },
    });
  }
  getAllPlaces() {
    this.isLoadingPlaces = true;
    this._apiSvc.allPlaces().subscribe({
      next: (res) => {
        this.isLoadingPlaces = false;
        this.negocios = res;
      },
    });
  }
}
