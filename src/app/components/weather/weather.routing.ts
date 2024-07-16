import { Route } from "@angular/router";
import { WeatherCityComponent } from "./weather-city/weather-city.component";

export const WEATHER_ROUTES: Route[] = [
  {
    path: ':city',
    component: WeatherCityComponent
  }
]
