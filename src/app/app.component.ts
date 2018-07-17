import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {AppUser} from "./models/app-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  appUser: AppUser;

  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home'}, 
    { path: '/films', label: 'Все фильмы', active: 'button-active', icon: 'list_alt'}
  ];

  constructor(private auth: AuthService){}

  logout(){
    this.auth.logout();
  }

  ngOnInit(): void {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
}
