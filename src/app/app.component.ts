import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapScreenComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mapas-app';
}
