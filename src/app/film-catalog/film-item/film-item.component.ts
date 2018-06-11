import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../film';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input('data') film: Film;

  constructor() { }

  ngOnInit() {
  }

  /* Getters for film properties */
  get id() { return this.film.id; }
  get name() { return this.film.name; }
  get year() { return this.film.year; }
  get imgUrl() {return this.film.imgUrl; }
  get description() { return this.film.description; }
}
