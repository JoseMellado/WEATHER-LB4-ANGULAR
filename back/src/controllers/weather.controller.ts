// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/context";
import { repository } from "@loopback/repository";
import { get } from "@loopback/rest";
import { writeHeapSnapshot } from "v8";
import { ApiError } from "../models";
import { ApiErrorRepository, CityRepository, WeatherRepository } from "../repositories";
import { Weatherservice } from "../services";

// import {inject} from '@loopback/core';


export class WeatherController {
  constructor( 
    @inject('services.Weatherservice') private weatherservice: Weatherservice,
    @repository(CityRepository) private cityRepository: CityRepository,
    @repository(ApiErrorRepository) private apiErrorRepository: ApiErrorRepository,
    @repository(WeatherRepository) private weatherRepository: WeatherRepository) {}

    private cities_ids: number[] = [3871336, 2657896, 2193733, 2147714, 2643743, 4197000]

    async getCityWeather(city_id: number) {
      //Simulate 10% of api errors and repeat
      if(Math.random() < 0.1){
        return 'How unfortunate! The API Request Failed'
      } 
      else{
        //get city weather from api
        let weather = this.weatherservice.getWeather(city_id);
        //store it
        await this.weatherRepository.set(city_id.toString(), weather);
        //and return data
        return weather;
      }
      
    }  

  @get('/weather', {
    responses: {
      '200': 'PING_RESPONSE',
    },
  })
  async getWeathers(){
    let weathers = []
    for(let city_id of this.cities_ids){
      let weather = await this.getCityWeather(city_id);
      while(weather == 'How unfortunate! The API Request Failed'){
        let error = new ApiError({error: 'How unfortunate! The API Request Failed'});
        this.apiErrorRepository.set(Date.now().toString(), error);
        weather = await this.getCityWeather(city_id);
      }
      weathers.push(weather);
    }
    return weathers;
  }

}
