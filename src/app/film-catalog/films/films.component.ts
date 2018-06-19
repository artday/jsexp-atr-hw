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

  ngAfterViewInit(): void {
    this.preload = false;
  }

  preload = true;
  private _data;
  public results = [];
  private params = {};

  private filteredResult = [];

  selectedService = 'films';
  services=[
    {value: 'films', label: 'Фильмы', service: this.filmService, searchProperty: 'title'},
    {value: 'actors', label: 'Актеры', service: this.personService, searchProperty: 'name'},
  ];

  constructor(private filmService: FilmService, private personService: PersonService) { }

  changeService(){
    this._data = this.results = [];
    this.params['page'] = this.page+1;
    this.filter('');
    this.getData();
  }

  private get currentServiceParams(){
    return this.services.find(obj => obj.value === this.selectedService);
  }

  private get currentService(){
    return <DataService>this.currentServiceParams['service'];
  }

  private get searchProperty(){
    return this.currentServiceParams['searchProperty'];
  }

  getData(){
    this.currentService.getAll(this.params).subscribe(data => {
      this._data = data;
      this.filteredResult = this.results = this.results.concat(data['results']);
    });
  }

  getNextPage(){
    this.params['page'] = this.page+1;
    this.getData();
  }

  get page(){
    return this._data.page;
  }

  filter(query) {
    this.filteredResult = (query) ?
      this.results.filter(
        item => item[this.searchProperty].toLowerCase().includes(query.toLowerCase())) : this.results;
  }

  get filtered(){
    return this.filteredResult;
  }

  ngOnInit() {
    this.getData();
  }
}
