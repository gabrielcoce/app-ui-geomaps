import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import gt from 'dayjs/locale/es';
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale(gt);

Mapboxgl.accessToken = environment.API_KEY;

if (!navigator.geolocation) {
  console.error('Navegador no soporta la geolocalizacion');
}
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
