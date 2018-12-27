import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherProject';
  constructor()
  {
      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB80IExgQGM_W4cTWqD7wWdWRA8O9rhQYc",
    authDomain: "weatherproject-92153.firebaseapp.com",
    databaseURL: "https://weatherproject-92153.firebaseio.com",
    projectId: "weatherproject-92153",
    storageBucket: "weatherproject-92153.appspot.com",
    messagingSenderId: "1013042818151"
  };
  firebase.initializeApp(config);

  }
}
