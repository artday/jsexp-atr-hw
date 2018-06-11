import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedModule} from "../shared/shared.module";

import { MainComponent } from './main/main.component';
import { FilmsComponent } from './films/films.component';
import { DetailsComponent } from './details/details.component';
import { TabsComponent } from './tabs/tabs.component';
import { FilmItemComponent } from './film-item/film-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    SharedModule
  ],
  declarations: [
    MainComponent, 
    FilmsComponent, 
    DetailsComponent,
    TabsComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
