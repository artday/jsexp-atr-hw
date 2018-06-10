import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: '.films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  private films;
  
  constructor(private filmsService: FilmService) {}
  
  ngOnInit() {
    this.films = this.filmsService.getAll();
  }
  
}
