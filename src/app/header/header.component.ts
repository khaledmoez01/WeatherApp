import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // dans onAuthStateChanged, à chaque changement d'état, la fonction que vous passez en argument 
    // est exécutée
    firebase.auth().onAuthStateChanged(
      (user) => {
        // si l'utilisateur est authentifié, il y aura un objet "user" retourné par le serveur
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
