import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from './environments/environment.development';
import { WeatherApiResponse } from '../src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  latitude = signal<number>(51.107883);
  longtide = signal<number>(17.038538);
  frequency = signal<string>('temperature_2m_max')
  timezone = signal<string>('auto')

  weather = httpResource<WeatherApiResponse>(() => {
    const params = new HttpParams()
      .append('latitude', this.latitude())
      .append('longitude', this.longtide())
      .append('daily', this.frequency())
      .append('timezone', this.timezone());

    return {
      url: environment.apiUrl,
      method: 'GET',
      params: params
    };
  });

  weatherData = computed(() => {
    const data = this.weather.value();

    if (data && data.daily) {
      return { daily: data.daily };
    }

    return null;
  });





}
