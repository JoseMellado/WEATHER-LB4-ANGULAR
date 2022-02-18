import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import { repository } from '@loopback/repository';
import { City } from '../models';
import { CityRepository } from '../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class CitiesCoordObserver implements LifeCycleObserver {

  constructor(
    /*@inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,*/
    @repository(CityRepository)
    private cityRepository: CityRepository,
  ) {}


  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    //Save cities coordinates.
    //Santiago.
    let santiago: City = new City(
      {
        lon: -70.6483,
        lat: -33.4569,
        city_id: 3871336
      }
    );
    await this.cityRepository.set('santiago', santiago);

    //Zurich.
    let zurich: City = new City(
      {
        lon: 8.55,
        lat: 47.3667,
        city_id: 2657896
      }
    );
    await this.cityRepository.set('zurich', zurich);

   //Auckland.
   let auckland: City = new City(
    {
      lon: 174.7667,
      lat: -36.8667,
      city_id: 2193733
    }
  );
  await this.cityRepository.set('auckland', auckland);

  //Sydney.
   let sydney: City = new City(
    {
      lon: 151.2073,
      lat: -33.8679,
      city_id: 2147714
    }
  );
  await this.cityRepository.set('sydney', sydney);

  //London.
  let london: City = new City(
    {
      lon: -0.1257,
      lat: -33.8679,
      city_id: 2643743
    }
  );
  await this.cityRepository.set('london', london);

   //Georgia.
   let georgia: City = new City(
    {
      lon: -83.5002,
      lat: 32.7504,
      city_id: 4197000
    }
  );
  await this.cityRepository.set('georgia', georgia);
  }
  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
