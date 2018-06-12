import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Film} from '../film';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent {
  @Input('data') film: Film;

  /* toggle favorite value true|false; */
  favoriteToggle(){
    this.film.favorite = !this.film.favorite;
  }

  /* Getters for film properties */
  get id() { return this.film.id; }
  get name() { return this.film.name; }
  get year() { return this.film.year; }
  get imgUrl() {return this.film.imgUrl; }
  get description() { return this.film.description; }
  get favorite() { return this.film.favorite; }
}
