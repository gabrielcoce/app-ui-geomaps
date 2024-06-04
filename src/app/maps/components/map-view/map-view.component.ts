import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements AfterViewInit {
  private readonly placeSvc = inject(PlacesService);
  private readonly mapSvc = inject(MapService);

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private userLocation = this.placeSvc.userLocation;

  ngAfterViewInit(): void {
    console.log('ubicacion', this.userLocation);
    if (!this.userLocation) return;
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup().setHTML(`<h3>Aqui estoy ubicado!</h3>`);

    new Marker({ color: 'red' })
      .setLngLat(this.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapSvc.setMap(map);
  }
}
