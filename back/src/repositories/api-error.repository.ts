import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {ApiError} from '../models';

export class ApiErrorRepository extends DefaultKeyValueRepository<
  ApiError
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(ApiError, dataSource); 
  }
  
}
