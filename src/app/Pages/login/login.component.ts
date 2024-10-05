import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  clientID = '42212e1a5b85482494ecbbc3ca8579eb';
  authURL = 'https://accounts.spotify.com/api/token';
  clientSecret = '207bab8ddca1403a80eff236e0141291';
  authEndPoint = 'https://accounts.spotify.com/authorize';
  redirectURL = 'http://localhost:4200/home';
  responseType = 'token';
  loginURL = `${this.authEndPoint}?client_id=${this.clientID}&redirect_uri=${this.redirectURL}&response_type=${this.responseType}`;

  ngOnInit(): void {}
}
