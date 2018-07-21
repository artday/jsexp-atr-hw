import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {FavoriteService} from "./favorite.service";
import { map } from 'rxjs/operators';
import {Observable, observable} from "rxjs/index";
import {AuthService} from "./auth.service";

@Injectable()
export class FilmService extends DataService {
  favorites = [];
  params = { language: 'ru-RU', sort_by: '', page: 1, year: '' };

  constructor(http: HttpClient, private favService: FavoriteService, private auth: AuthService) {
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
      // let filmIds = data['results'].map(f => f.id);

      this.favService.getFavorites()
        .subscribe(f=> {
          let favIds = f.map( f=> f['id'] );
          data['results'] = data['results'].map(film => {
            film.favorite = favIds.includes(film.id);
            return film;
          })
        });


      // data['results'] = data['results'].map(film => {
      //   // console.log([1,2,3].contains(1));
      //   film.favorite = this.favService.favorites.includes(film.id);
      //   // film.mark = this.favService.bookMarks.contains(film.id);
      //   return film;
      // });

      /*
      this.favService.getFavor(filmIds)
        .subscribe( favList => { data['results'] = this.mapData(favList.map(fav=>fav._id), data['results'], 'favorite'); });
      this.favService.getMark(filmIds)
        .subscribe( markList => { data['results'] = this.mapData(markList.map(mark=>mark._id), data['results'], 'mark'); });*/
      return data;
    }));
  }
}