import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule } from "@angular/material";
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from "../shared/shared.module";

import { MainComponent } from './main/main.component';
import { FilmsComponent } from './films/films.component';
import { TabsComponent } from './main/tabs/tabs.component';
import { FilmItemComponent } from './films/film-item/film-item.component';
import { PersonItemComponent } from './films/person-item/person-item.component';
import {HttpClientModule} from "@angular/common/http";

import {FilmService} from "../services/film.service";
import {PersonService} from "../services/person.service";
import {ImageService} from "../services/image.service";
import { SearchComponent } from './films/search/search.component';
import {FavoriteService} from "../services/favorite.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    MainComponent,
    FilmsComponent,
    TabsComponent,
    FilmItemComponent,
    PersonItemComponent,
    SearchComponent
  ],
  providers: [ FilmService, FavoriteService, PersonService, ImageService ]
})
export class FilmCatalogModule { }
