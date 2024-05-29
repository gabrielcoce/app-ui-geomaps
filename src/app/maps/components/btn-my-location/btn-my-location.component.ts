import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.scss',
})
export class BtnMyLocationComponent {
  private readonly mapSvc = inject(MapService);
  private readonly placeSvc = inject(PlacesService);

  goToMyLocation() {
    if (!this.placeSvc.isUserLocationReady) return;
    if (!this.mapSvc.isMapReady) return;
    this.mapSvc.flyTo(this.placeSvc.userLocation!);
  }
}
