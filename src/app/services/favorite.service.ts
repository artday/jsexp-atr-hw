import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FavoriteService {
  localApiUrl: string = 'http://localhost:3000';
  favoriteApiUrl: string = `${this.localApiUrl}/films/favorites`;

  constructor(private http: HttpClient){}

  getFavor(filmIds: number[]): Observable<any> {
    return this.http.get(`${this.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  }

  addFavor(id: number){
    return this.http.post(this.favoriteApiUrl,{filmId: id});
  }

  dellFavor(id: number){
    return this.http.delete(`${this.localApiUrl}/films/${id}/favorites`);
  }
}
