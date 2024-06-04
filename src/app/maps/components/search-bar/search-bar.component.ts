import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    SearchResultsComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  private subscription!: Subscription;
  private readonly _placeSvc = inject(PlacesService);

  ngOnInit(): void {
    this._placeSvc.getAllPlaces();
    // this.subscription = this.searchControl.valueChanges
    //   .pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe((res) => {
    //     if (!res) return;
    //     this._placeSvc.getPlacesByQuery(res);
    //   });
    this.subscription = this.searchControl.valueChanges.subscribe((res) => {
      if (!res) return;
      //console.log(res);
      this._placeSvc.getPlacesById(res);
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get places() {
    return this._placeSvc.negocios;
  }
}
