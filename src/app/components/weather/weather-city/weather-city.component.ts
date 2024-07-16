import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './weather-city.component.html',
  styleUrl: './weather-city.component.sass',
})
export class WeatherCityComponent implements OnInit {
  cityCode: string = '';
  public cityName: string = '';

  private route = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);
  private toastService = inject(ToastrService);

  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature (F)',
        fill: false,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
    this.getParams();
    this.getWeather();
  }

  getParams() {
    this.route.params.subscribe((params) => {
      this.cityCode = params['city'];
      this.cityName = this.getCityNameFromCode(this.cityCode)
    });
  }

  private getCityNameFromCode(cityCode: string): string {
    switch (cityCode) {
      case 'LWX':
        return 'District of Columbia';
      case 'TOP':
        return 'Kansas';
      default:
        return '';
    }
  }

  getWeather() {
    this.weatherService.getWeather(this.cityCode).subscribe({
      next: (data) => {
        this.updateChart(data);
      },
      error: (err) => {
        this.toastService.error('Opps!', err);
      },
    });
  }

  updateChart(data: any) {
    const labels = data.properties.periods.map((period: any) => period.name);
    const temperatures = data.properties.periods.map(
      (period: any) => period.temperature
    );

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: temperatures,
          label: 'Temperature (F)',
          fill: true,
          borderColor: '#F06449',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        },
      ],
    };
  }


}
