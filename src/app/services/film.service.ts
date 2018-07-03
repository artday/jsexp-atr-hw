import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {FavoriteService} from "./favorite.service";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {Film} from "../models/film";

@Injectable()
export class FilmService extends DataService {

  params = { language: 'ru-RU', sort_by: '', page: 1, year: '' };

  constructor(http: HttpClient, private favService: FavoriteService) {
    super('movie', 'https://api.themoviedb.org/3/discover/movie', http);
  }

  mapData(ids, results, field){
    return results.map(film =>{
      film[field] = Boolean(ids.find( id => id === film.id));
      return film;
    })
  }

  getAll(params?:object, search?:boolean): Observable<any> {
    return super.getAll(params, search).pipe(map(data => {
      let filmIds = data['results'].map(f => f.id);
      this.favService.getFavor(filmIds)
        .subscribe( favList => { data['results'] = this.mapData(favList.map(fav=>fav._id), data['results'], 'favorite'); });
      this.favService.getMark(filmIds)
        .subscribe( markList => { data['results'] = this.mapData(markList.map(mark=>mark._id), data['results'], 'mark'); });
      return data;
    }));
  }
}