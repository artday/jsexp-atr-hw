import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ImageService extends DataService{

  private baseUrl: string = 'https://image.tmdb.org/t/p';
  private blankImg = 'https://www.camisetasdahora.com/loja/acrux/desktop/img/layout/simulador_background.gif';

  poster = {
    xs: "w92", sm: "w154", sl: "w185", md: "w342", lg: "w500", xl: "w780", origin: "original"
  };

  profile = {
    xs: "w45", sl: "w185", lg: "h632", origin: "original"
  };

  constructor(http: HttpClient) {
    super('', 'https://api.themoviedb.org/3', http);
  }

  indexImgUrl( type: string, size: string = 'sl', img: string){
    return (type && this[type] && img)?
      `${this.baseUrl}/${this[type][size]}${img}` :
      this.blankImg;
  }

}
