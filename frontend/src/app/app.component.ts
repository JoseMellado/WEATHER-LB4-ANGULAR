import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather Report';

  constructor(
    private websocketService: WebsocketService,
  ) { }

   weathers: any = [];
   city_cards: any = []

  ngOnInit(): void {
    /*this.websocketService.onNewMessage().subscribe( (weatherData:any) => {
      console.log(weatherData)
      this.weather = weatherData;
    });*/
    this.getWeather();
    //repeat call every 10 seconds
    setInterval(()=> {
      this.getWeather();

    },10000)
  }

  getWeather(){
    //get weather reports from api
    this.websocketService.getWeather().subscribe( response => {
      this.weathers = response;
      let cities = [];
      //decorate data
      for(let weather of this.weathers){
        let url ='https://openweathermap.org/img/w/'+ weather.weather[0].icon+'.png';
        cities.push({
          name: weather.name,
          img: url,
          date: (new Date((weather.dt+weather.timezone)*1000).toUTCString().substring(0,26)),
          temp: (weather.main.temp -273.15).toFixed(0),
          feels_like: (weather.main.feels_like -273.15).toFixed(0),
          temp_min: (weather.main.temp_min -273.15).toFixed(0),
          temp_max: (weather.main.temp_max -273.15).toFixed(0)
        })
      }
      if(cities !== null){
        this.city_cards = cities;
      }
    })
  }


}
