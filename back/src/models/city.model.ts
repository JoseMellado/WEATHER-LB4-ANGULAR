import {Entity, model, property} from '@loopback/repository';

@model()
export class City extends Entity {

  @property({
    type: 'number',
    required: true,
  })
  lon: number;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;

  @property({
    type: 'number',
    required: true,
  })
  city_id: number;

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
