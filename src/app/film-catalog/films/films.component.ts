import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import {Film} from "../film";

@Component({
  selector: '.films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  private films: Film[];
  
  constructor(private filmsService: FilmService) {}
  
  ngOnInit() {
    this.films = this.filmsService.getAll();
  }
  
}