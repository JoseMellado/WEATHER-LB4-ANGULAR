import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OpenweatherDataSource} from '../datasources';
import { Weather } from '../models';

export interface Weatherservice {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getWeather(id:number): Weather;
}

export class WeatherserviceProvider implements Provider<Weatherservice> {
  constructor(
    // openweather must match the name property in the datasource json file
    @inject('datasources.openweather')
    protected dataSource: OpenweatherDataSource = new OpenweatherDataSource(),
  ) {}

  value(): Promise<Weatherservice> {
    return getService(this.dataSource);
  }
}
