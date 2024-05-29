import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchResultsComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  private subscription!: Subscription;
  private readonly _placeSvc = inject(PlacesService);

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        if (!res) return;
        console.log(res);
        this._placeSvc.getPlacesByQuery(res);
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
