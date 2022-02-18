import {Entity, model, property} from '@loopback/repository';

@model()
export class ApiError extends Entity {

  @property({
    type: 'string',
    required: true
  })
  error: string;

  constructor(data?: Partial<ApiError>) {
    super(data);
  }
}

export interface ApiErrorRelations {
  // describe navigational properties here
}

export type ApiErrorWithRelations = ApiError & ApiErrorRelations;
