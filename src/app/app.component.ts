import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	ngOnInit() {
		firebase.initializeApp({
			apiKey: "test", //replace with auth key!
			authDomain: "udemy-angular-tutorial-a98b1.firebaseapp.com"
		});
	}

}
