import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  datas: Object[];
}

export interface Weather {
  weather: {};
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  configUrl = '../../assets/json/countries.json';
  weatherUrl = '';
  private apiKey = '1adba28447de40c8004a056d074af976';

  constructor(private httpClient: HttpClient) { }

  getPaysFromJSON() {
      return this.httpClient.get<Config>(this.configUrl);
  }

  getWeatherFromApi(city: string, codeIso: string) {
      this.weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "," + codeIso + "&units=metric&APPID=" + this.apiKey;
      return this.httpClient.get<Weather>(this.weatherUrl);
  }
}
