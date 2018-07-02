import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnChanges{
  imgType = 'poster';
  imgSize = 'md';
  indexImg:string;
  @Input('data') film;

  constructor(protected imgService: ImageService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.indexImg = this.imgService.indexImgUrl(this.imgType, this.imgSize, this.film['poster_path']);
  }

  get title(){ return this.film.title }
  get overview(){ return this.film.overview }
  get release_date(){ return this.film.release_date }
}