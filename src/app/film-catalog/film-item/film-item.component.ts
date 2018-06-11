import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Film} from '../film';

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent {
  @Input('data') film: Film;
  @Input() favorite;
  @Output() favorEmit = new EventEmitter();

  /*
   * toggle favorite value true|false;
   * emit to parent current item id & favorite value
   */
  favoriteToggle(){
    this.favorite = !this.favorite;
    this.favorEmit.emit({id: this.id, favorite: this.favorite});
  }

  /* Getters for film properties */
  get id() { return this.film.id; }
  get name() { return this.film.name; }
  get year() { return this.film.year; }
  get imgUrl() {return this.film.imgUrl; }
  get description() { return this.film.description; }
}
