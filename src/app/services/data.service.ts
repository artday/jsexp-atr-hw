import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class DataService {
  private api_key: string = '1a89d2f019d4d60b99a47c314115852b';
  private searchUrl = 'https://api.themoviedb.org/3/search/'+this.mediaType;
  search = false;
  params = {};

  /* Media Types: movie|person*/
  constructor(private mediaType, private url, private http: HttpClient) { }

  private getParams(){
    if(!this.params) return '';
    let str = '';
    for(let p in this.params){ str +=  this.params[p]? `&${p}=${this.params[p]}` : ''; }
    return str;
  }

  private setParams(params:object){
    Object.keys(params).forEach(key=> this.params[key] = params[key]);
  }

  reset(){
    this.search = false;
  }

  getAll(params?:object, search?:boolean): Observable<any> {
    if(typeof search !== "undefined") { this.search = search; }
    if (params) {this.setParams(params);}
    let ApiUrl = this.search ? this.searchUrl : this.url;
    let urlStr =`${ApiUrl}?api_key=${this.api_key}`;
    let paramStr = this.params? this.getParams() : '';
    return this.http.get(urlStr+paramStr);
  }
}
