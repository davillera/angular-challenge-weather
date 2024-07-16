import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getWeather(cityCode: string) {
    return this.http.get(
      `${environment.API_URL}gridpoints/${cityCode}/31,80/forecast`
    );
  }
}
