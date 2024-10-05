import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAPIService {
  token = window.sessionStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getSearchResults(searchvalue: string) {
    let searchURL = 'https://api.spotify.com/v1/search';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', searchvalue);
    queryParams = queryParams.append('type', 'artist');
    let params = { headers: header, params: queryParams };

    return this.http.get(searchURL, params);
  }

  getUserDetails() {
    let searchURL = 'https://api.spotify.com/v1/me';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get(searchURL, params);
  }
}
