import {AfterViewInit, Component,OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {FilmService} from "../../services/film.service";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, AfterViewInit {

  /* you can't  use ngAfterViewInit with template binding  */
  ngAfterViewInit(): void {
    // this.preload = false;
  }

  preload = true;

  /* Raw Data from endpoint */
  private _data;

  /* data.results */
  public results = [];

  /* additional endpoint API params.  object {key:'value',}*/
  private params = {};

  /* filtered results array */
  private filteredResult = [];

  /*  selected service by mat-select  */
  selectedService = 'films';

  /* mat-select options for services */
  services=[
    {value: 'films', label: 'Фильмы', service: this.filmService, searchProperty: 'title'},
    {value: 'actors', label: 'Актеры', service: this.personService, searchProperty: 'name'},
  ];

  constructor(private filmService: FilmService, private personService: PersonService) { }

  /* Reset values on changing service */
  changeService(){
    this._data = this.results = [];
    this.params['page'] = this.page+1;
    this.filter('');
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
  getData(){
    this.currentService.getAll(this.params).subscribe(data => {
      this._data = data;
      this.filteredResult = this.results = this.results.concat(data['results']);
      this.preload = false;
    });
  }

  /* get data from next page */
  getNextPage(){
    this.params['page'] = this.page+1;
    this.getData();
  }

  /* current page property of results */
  get page(){
    return this._data.page;
  }

  /* save filtered data to filteredResult */
  filter(query) {
    this.filteredResult = (query) ?
      this.results.filter(
        item => item[this.searchProperty].toLowerCase().includes(query.toLowerCase())) : this.results;
  }

  /* getter for filtered data  */
  get filtered(){
    return this.filteredResult;
  }

  ngOnInit() {
    this.getData();
  }
}
