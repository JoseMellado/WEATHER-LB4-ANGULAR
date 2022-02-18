import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'openweather',
  connector: 'rest',
  "options": {
    "headers": {
        "accept": "application/json",
        "content-type": "application/json"
    }
 },
 "operations": [{
    "template": {
       "method": "GET",
       "url": "https://api.openweathermap.org/data/2.5/weather?id={id}&appid=ca3980d13df6d8d13d687e6c17200248"
    },
    "functions": {
       "getWeather": ["id"]
    }
 }]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OpenweatherDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'openweather';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.openweather', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
