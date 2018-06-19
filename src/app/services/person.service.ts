import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";

@Injectable()
export class PersonService extends DataService{
  params = { language: 'ru-RU', sort_by: '', page: 1};

  constructor(http: HttpClient) {
    super('https://api.themoviedb.org/3/person/popular', http);
  }
}
