import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";

@Injectable()
export class FilmService extends DataService {
  params = { language: 'ru-RU', sort_by: '', page: 1, year: '' };

  constructor(http: HttpClient) {
    super('https://api.themoviedb.org/3/discover/movie', http);
  }
}
