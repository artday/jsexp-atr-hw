import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule, MatToolbarModule, MatInputModule} from "@angular/material";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";

import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
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
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [
    MainComponent, 
    FilmsListComponent,
    DetailsComponent,
    TabsComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
