import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class DataService {
  private api_key: string = '1a89d2f019d4d60b99a47c314115852b';
  params = {};

  constructor(private url, private http: HttpClient) { }

  getParams(){
    if(!this.params) return '';
    let str = '';
    for(let p in this.params){
      str +=  this.params[p]? `&${p}=${this.params[p]}` : '';
    }
    return str;
  }

  private setParams(params:object){
    Object.keys(params).forEach(key=> this.params[key] = params[key]);
  }

  getAll(params?:object) {
    if (params) {this.setParams(params);}
    let urlStr = `${this.url}?api_key=${this.api_key}`;
    let paramStr = this.params? this.getParams() : '';
    return this.http.get(urlStr+paramStr);
  }
}
