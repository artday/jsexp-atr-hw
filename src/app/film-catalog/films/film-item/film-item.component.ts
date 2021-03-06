import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FavoriteService} from "../../../services/favorite.service";
import {ImageService} from "../../../services/image.service";
import {Film} from "../../../models/film";

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnChanges{
  imgType = 'poster';
  imgSize = 'md';
  @Input('data') film: Film;

  constructor(private imgService: ImageService, private favService: FavoriteService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.film.indexImg = this.imgService.indexImgUrl(this.imgType, this.imgSize, this.film['poster_path']);
  }

  /* toggle favorite value true|false; */
  favoriteToggle(){
    this.film.favorite ?
      this.favService.dellFavor(this.film.id)
        .subscribe(() => this.film.favorite = false):
      this.favService.addFavor(this.film.id)
        .subscribe(() => this.film.favorite = true);
  }

  /* toggle favorite value true|false; */
  markToggle(){
    this.film.mark ?
      this.favService.dellMark(this.film.id)
        .subscribe(() => this.film.mark = false):
      this.favService.addMark(this.film.id)
        .subscribe(() => this.film.mark = true);
  }

  get title(){ return this.film.title }
  get poster(){ return this.film.indexImg }
  get overview(){ return this.film.overview }
  get release_date(){ return this.film.release_date }
  get favorite(){ return this.film.favorite }
  get mark(){ return this.film.mark }

}