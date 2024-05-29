import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  selectedId: string = '';
  private readonly _placeSvc = inject(PlacesService);
  private readonly _mapSvc = inject(MapService);

  get isLoadingPlaces() {
    return this._placeSvc.isLoadingPlaces;
  }

  get places() {
    return this._placeSvc.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this._mapSvc.flyTo([lng, lat]);
  }
}
