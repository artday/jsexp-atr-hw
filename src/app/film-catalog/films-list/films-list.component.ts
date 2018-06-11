import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import {Film} from "../film";

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  private films;

  sorting = [
    {value: 'default', viewValue: 'По умолчанию'},
    {value: 'asc', viewValue: 'По алфавиту: A-Z'},
    {value: 'desc', viewValue: 'По алфавиту: Z-A'}
  ];
  
  constructor(private filmsService: FilmService) {}

  doSort(order){
    (order === 'default') ?
      this.films.sort(this.compareValues('id', order)) :
      this.films.sort(this.compareValues('name', order));
  }

  /*
   *  Unique comparison function for sorting
   */
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
  
  ngOnInit() {
    this.films = this.filmsService.getAll();
  }
  
}