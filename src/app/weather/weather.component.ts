import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators   } from '@angular/forms';

import { WeatherService, Config, Weather } from '../services/weather.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherModalForm: FormGroup;

  weatherDatas: Object[];
  cityWeather : {};
  daysOfTheWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  day;
  daysTimestamp = [];
  tableauDesIndex = [];

  constructor(private formBuilder: FormBuilder,
              private weatherService: WeatherService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
     this.initForm();
     this.loadScript('../../assets/js/weather.js');
     this.weatherService.getPaysFromJSON().subscribe(
       // reponse 1:response:
       (datas: Config) => { this.weatherDatas = datas['datas']; },
       // reponse 2: error
       (error) => { console.log('Erreur de chargement! ' + error);}

      );

  }

  initForm() {
    this.weatherModalForm = this.formBuilder.group({
      listVille: ['', Validators.required]
    });
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  onSubmitForm()
  {
     var citySelected = this.weatherDatas.filter(word => word['codeIso']===this.weatherModalForm.value['listVille'])[0];

     var codeIso = citySelected['codeIso'];
     // dans la variable city, on a remplacé tous les espaces par "%20" et tous les "'" par "%27"
     // voir https://www.w3schools.com/tags/ref_urlencode.asp pour les correspondances
     // on utilise /g pour remplacer toutes les occurences trouvées sinon on ne remplacerait que la première
     var city = citySelected['capital'].replace(/ /g, '%20').replace(/\'/g, '%27');
     this.spinner.show();
     this.weatherService.getWeatherFromApi(city, codeIso).subscribe(
         (datas: Weather) => {
           this.cityWeather = null;
           this.cityWeather = datas;
           this.calculDesIndex();
           this.day = (new Date(this.cityWeather['list'][0]['dt']*1000)).getDay();
           this.daysTimestamp = [];

           for(var k = 0; k < this.tableauDesIndex.length; k++)
           {
             this.daysTimestamp.push(new Date((new Date(this.cityWeather['list'][this.tableauDesIndex[k]]['dt']*1000))));
           }
          },
         (error) => { console.log(error);},
         () => {this.spinner.hide();}
     );

  }

  calculDesIndex()
  {
    this.tableauDesIndex = [];
    if (this.cityWeather['list'].length <= 10)
    {
        for (let i=0; i < this.cityWeather['list'].length && i < 6; i++)
            this.tableauDesIndex[i] = i;
    }
    else
    {
        this.tableauDesIndex[0] = 0;
        var pas = Math.trunc((this.cityWeather['list'].length -2)/4)
        for (let i=1; i <= 4; i++)
        {
            this.tableauDesIndex[i] = i*(pas-1);
        }
        this.tableauDesIndex[5] = this.cityWeather['list'].length-1;
    }
    

  }


}
