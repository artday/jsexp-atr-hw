import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "./user.service";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {AppUser} from "../models/app-user";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(user => {
      if(user){ userService.save(user); }
    });
  }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if(user){
          return this.userService.get(user.uid).valueChanges().pipe(map(u => {
            u.uid = user.uid; return u;
          }));
        }
        return Observable.of(null);
      });
  }

}
