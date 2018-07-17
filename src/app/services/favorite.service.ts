import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "./auth.service";
import {AppUser} from "../models/app-user";

@Injectable()
export class FavoriteService implements OnInit{
  bookMarks = null;
  favorites = null;
  appUser: AppUser;

  localApiUrl: string = 'http://localhost:3000';
  favoriteApiUrl: string = `${this.localApiUrl}/films/favorites`;
  markApiUrl: string = `${this.localApiUrl}/films/marks`;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private auth: AuthService){
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      // this.getFavorites(this.appUser.uid).subscribe(list =>  this.favorites = list.map(fav => fav.id));
      // this.getBookmarks(this.appUser.uid).subscribe(list =>  this.bookMarks = list.map(fav => fav.id));
    });
  }

  getFavor(filmIds: number[]): Observable<any> {
    return this.http.get(`${this.favoriteApiUrl}?filmIds=${filmIds.join(',')}`);
  }
  addFavor(id: number){
    return this.http.post(this.favoriteApiUrl,{filmId: id});
  }
  dellFavor(id: number){
    return this.http.delete(`${this.localApiUrl}/films/${id}/favorites`);
  }

  getMark(filmIds: number[]): Observable<any> {
    return this.http.get(`${this.markApiUrl}?filmIds=${filmIds.join(',')}`);
  }
  addMark(id: number){
    return this.http.post(this.markApiUrl,{filmId: id});
  }
  dellMark(id: number){
    return this.http.delete(`${this.localApiUrl}/films/${id}/marks`);
  }

  /* AngularFireDatabase */

  getFavorites(){
    return this.db.list('/users_data/'+ this.appUser.uid +'/favorites/films').valueChanges();

    // firebase.database().ref('users_data/'+ this.appUser.uid +'/favourites/films').where('id', '==', "333339")
    // return filmIds.map(filmId => this.db.list('/users_data/'+ this.appUser.uid +'/favourites/films/'));

    // return this.db.object( '/users_data/'+ this.appUser.uid +'/favourites/films');
  }
  getBookmarks(userId){
    return this.db.list('/users_data/'+ userId +'/bookmarks/films').valueChanges();

    // firebase.database().ref('users_data/'+ this.appUser.uid +'/favourites/films').where('id', '==', "333339")
    // return filmIds.map(filmId => this.db.list('/users_data/'+ this.appUser.uid +'/favourites/films/'));

    // return this.db.object( '/users_data/'+ this.appUser.uid +'/favourites/films');
  }

  addFavorite(filmId){
    return this.db.object('/users_data/'+ this.appUser.uid +'/favorites/films/'+filmId).update({
      id: filmId,
      favorite: true
    });
  }
  removeFavorite(filmId){
    return this.db.object('/users_data/'+ this.appUser.uid +'/favorites/films/'+filmId).remove();
  }
  addBookMark(filmId){
    return this.db.object('/users_data/'+ this.appUser.uid +'/bookmarks/films/'+ filmId).update({
      bookmark: true
    });
  }
  removeBookMark(filmId){
    return this.db.object('/users_data/'+ this.appUser.uid +'/bookmarks/films/'+ filmId).remove();
  }

  ngOnInit(): void {

  }
}
