import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {City} from '../models';

export class CityRepository extends DefaultKeyValueRepository<
  City
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(City, dataSource);
  }
}
