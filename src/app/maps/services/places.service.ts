import { inject, Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { BackendApiService, MapService } from '.';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];
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
}
