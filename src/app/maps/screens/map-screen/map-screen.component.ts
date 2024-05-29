import { AngularLogoComponent } from './../../components/angular-logo/angular-logo.component';
import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { BtnMyLocationComponent } from '../../components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [
    LoadingComponent,
    MapViewComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchBarComponent,
  ],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss',
})
export class MapScreenComponent {
  private readonly placeSvc = inject(PlacesService);

  get isUserLocationReady() {
    return this.placeSvc.isUserLocationReady;
  }
}
