import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  forecasts = [
    {
      label: 'District of Columbia Forecast',
      cityCode: 'LWX',
      bgColor: 'custom-blue',
      hoverColor: 'custom-blue-dark',
    },
    {
      label: 'Kansas Forecast',
      cityCode: 'TOP',
      bgColor: 'custom-green',
      hoverColor: 'custom-green-dark',
    },
  ];

  private router = inject(Router);

  navigateToForecast(city: string) {
    this.router.navigate(['/weather', city]);
  }
}
