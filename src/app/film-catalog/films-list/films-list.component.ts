import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import {Film} from '../film';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  /* Array of films */
  private films: Film[];

  /* Filtered Array of films */
  private filteredFilms: Film[];

  /* Count of currently displayed films */
  private filmsOnPage: number = 3;

  /* MatSelect. current selected option*/
  selected: string;

  /* MatSelect. Selection options */
  sorting = [
    {value: 'default', viewValue: 'По умолчанию'},
    {value: 'asc', viewValue: 'По алфавиту: A-Z'},
    {value: 'desc', viewValue: 'По алфавиту: Z-A'}
  ];
  
  constructor(private filmsService: FilmService) {}

  /* Sorting by film.property with order [asc,dsc,default] */
  doSort(order:string){
    (order === 'default' || order === '') ?
      (this.films.sort(this.compareValues('id', order)) , this.selected = '') :
      this.films.sort(this.compareValues('name', order));
  }

  /*  Unique comparison function for sorting */
  compareValues (key, order='asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) { return 0; }
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) { comparison = 1; }
      else if (varA < varB) { comparison = -1; }
      return ((order === 'desc') ? (comparison * -1) : comparison);
    };
  }

  /* Get count of favorites films */
  favorCnt(){
    return this.filmsService.getFavorites().length;
  }

  /* Check if favorite by id */
  isFavorite(id){
    return this.filmsService.isFavorite(id);
  }

  /* set|remove from array of favorites */
  filmFavorToggle(e){
    e.favorite ? this.filmsService.setFavor(e.id) :
      this.filmsService.removeFavor(e.id);
  }

  /* save filtered films  */
  filter(query?: string) {
    this.filteredFilms = (query) ?
      this.films.filter(film => film.name.toLowerCase().includes(query.toLowerCase())) : this.films;
  }

  loadFilms(cnt: number=3){
    this.filmsOnPage += cnt;
  }

  /* Getter for App Films */
  get Films(){
    return this.filteredFilms.slice(0, this.filmsOnPage)
  }
  
  ngOnInit() {
    /* load all films from service */
    this.films = this.filteredFilms = this.filmsService.getAll();
  }
}