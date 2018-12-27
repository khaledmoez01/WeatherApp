import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (private router : Router) {

  }

  // canActivate retournera une observale de boolean, une promise de boolean ou une boolean
  // dans notre cas, ca sera une promise
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        // voir explication de onAuthStateChanged dans header.component.ts
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              // c'est bon, on laisse passer l'utilisateur. Cad qu'il a le droit de passer sur cette route
              resolve(true);
            } else {
              // on va à localhost:4200/auth/signin
              this.router.navigate(['/auth', 'signin']);
              resolve(false);  // l'utilisateur n'a pas le droit d'accéder à cette route
            }
          }
        );
      }
    );

  }
}
