import { P } from '@angular/cdk/keycodes';
import { Component, effect, input, ViewChild } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ActiveElement } from 'chart.js';

@Component({
  selector: 'app-weather-chart',
  imports: [BaseChartDirective],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.scss'
})
export class WeatherChartComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  data = input<WeatherData | null>();

  labels: string[] | undefined;

  datasets: number[] | undefined;

  constructor() {
    effect(() => {
      const d = this.data();
      const labels = d?.daily.time ?? [];
      const temps = d?.daily.temperature_2m_max ?? [];

      // // Option A: mutate then update
      // this.barChartData.labels = labels;
      // this.barChartData.datasets[0].data = temps;
      // this.chart?.update();

      this.barChartData = { labels, datasets: [{ data: temps, label: 'Temperatura' }] };
    });
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };


  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Temperatura' }],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }


}
