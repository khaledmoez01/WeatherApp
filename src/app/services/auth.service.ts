import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  constructor() { }

  // c'est une mathoe Wrapper: 
  //creation d'un utilisateur, on utilise une promise car la méthode est asynchrone
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {        
        // le .then signifie  si la connexion fonctionne, on execute resolve() sinon reject(error)
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  //meme code et meme logique que createNewUser sauf qu'on utilise signInWithEmailAndPassword
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {        
        // le .then signifie  si la connexion fonctionne, on execute resolve() sinon reject(error)
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
