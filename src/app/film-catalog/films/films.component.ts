import {AfterViewInit, Component,OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {FilmService} from "../../services/film.service";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{
  page;
  totalPages;
  totalResults;
  preload = true;

  /* data.results */
  results = [] ;

  /* additional endpoint API params.  object {key:'value',}*/
  private params = {};

  /*  selected service by mat-select  */
  selectedService = 'films';

  /* mat-select options for services */
  services=[
    {value: 'films', label: 'Фильмы', service: this.filmService, searchProperty: 'title'},
    {value: 'actors', label: 'Актеры', service: this.personService, searchProperty: 'name'},
  ];

  constructor( private filmService: FilmService, private personService: PersonService) { }

  /* Reset values on changing service */
  changeService(){
    this.params['page'] = 1;
    this.params['query'] = '';
    this.results = [];
    this.currentService.reset();
    this.getData();
  }

  /* get mat-select params array for currently selected service  */
  private get currentServiceParams(){
    return this.services.find(obj => obj.value === this.selectedService);
  }

  /* get current service from mat-select params array */
  private get currentService(){
    return <DataService>this.currentServiceParams['service'];
  }

  /* get field name of name/title property for filtering */
  private get searchProperty(){
    return this.currentServiceParams['searchProperty'];
  }

  /* get data from endpoint response */
  getData(search?:boolean){
    this.preload = true;
    this.currentService.getAll(this.params, search).subscribe(_data => {
      this.saveData(_data);
    });
  }

  private saveData(data){
    this.page = data['page'];
    this.totalPages = data['total_pages'];
    this.totalResults = data['total_results'];
    this.results = this.results.concat(data['results']);
    this.preload = false;
  }

  /* get data from next page */
  getNextPage(){
    this.params['page'] = this.page+1;
    this.getData();
  }

  /* save filtered data to filteredResult */
  filter(query) {
    this.results = []; this.params['page'] = 1;
    this.params['query'] = query.toLowerCase();
    query? this.getData(true): this.getData(false);
  }

  log(){
    console.log(this.filmService.favorites);
  }

  ngOnInit() {
    this.preload = true;
    this.getData();
  }
}
