import { Component, OnInit } from '@angular/core';
import {FilmService} from "../film.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  films;
  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.films = this.filmService.getAll();
  }
}
