import { Component, OnInit } from '@angular/core';
import {FilmService} from "../../services/film.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  results = [];
  params = {};
  preload = true;
  page;
  totalPages;
  totalResults;

  constructor(private filmService: FilmService, private route: ActivatedRoute) { }

  getQuery(){
    return this.route.queryParams;
  }

  search() {
    this.reset();
    this.getQuery().subscribe(params => {
      if(params['q']){
        this.params['query'] = params['q'].toLowerCase();
        this.getData(true);
      } else this.results=[];
    });
    this.preload = false;
  }

  /* get data from endpoint response */
  getData(search?:boolean){
    this.preload = true;
    this.filmService.getAll(this.params, search).subscribe(_data => {
      this.saveData(_data);
    });
  }

  private saveData(data){
    this.page = data['page'];
    this.totalPages = data['total_pages'];
    this.totalResults = data['total_results'];
    this.results = this.results.concat(data['results']);
    this.preload = false;
  }

  /* Reset values on search */
  reset(){
    this.params['page'] = 1;
    this.params['query'] = '';
    this.results = [];
  }

  /* get data from next page */
  getNextPage(){
    this.params['page'] = this.page+1;
    this.getData();
  }

  ngOnInit() {
      this.preload = true;
      this.search();
  }

}
