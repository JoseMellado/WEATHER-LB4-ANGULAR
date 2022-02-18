import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {Weather} from '../models';

export class WeatherRepository extends DefaultKeyValueRepository<
  Weather
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(Weather, dataSource);
  }
}
