import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];
  constructor() {}

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) return;

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
  createMarkersFromPlace(places: Feature[], userLocation: [number, number]) {
    this.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    places.forEach((place) => {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text}</h6> <span>${place.place_name}</span>`
      );
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map!);

      newMarkers.push(newMarker);
    });
    this.markers = newMarkers;
    if (places.length === 0) return;
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);
    this.map?.fitBounds(bounds, { padding: 200 });
  }
}
