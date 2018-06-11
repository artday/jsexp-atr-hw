import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import {Film} from "../film";

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  private films;
  
  constructor(private filmsService: FilmService) {}
  
  ngOnInit() {
    this.films = this.filmsService.getAll();
  }
  
}