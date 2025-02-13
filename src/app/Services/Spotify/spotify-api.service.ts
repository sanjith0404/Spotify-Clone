import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artists } from 'src/app/models/artists';
import { NewReleases } from 'src/app/models/new-releases';
import { UserDetails } from 'src/app/models/user-details';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAPIService {
  token = window.localStorage.getItem('token');
  clientID = '42212e1a5b85482494ecbbc3ca8579eb';
  authURL = 'https://accounts.spotify.com/api/token';
  clientSecret = '207bab8ddca1403a80eff236e0141291';
  authEndPoint = 'https://accounts.spotify.com/authorize';
  redirectURL = 'http://localhost:4200/home';
  responseType = 'token';
  code: any;
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

  getUserDetails(): Observable<UserDetails> {
    let searchURL = 'https://api.spotify.com/v1/me';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get<UserDetails>(searchURL, params);
  }

  getNewReleases(): Observable<NewReleases> {
    let searchURL = 'https://api.spotify.com/v1/browse/new-releases';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get<NewReleases>(`${searchURL}`, params);
  }

  getNewAlbumsReleases(urls: string) {
    let searchURL = urls;
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get(`${searchURL}`, params);
  }

  getToken() {
    let searchURL = 'https://accounts.spotify.com/api/token';
    let header = new HttpHeaders();
    let clientString = this.clientID + ':' + this.clientSecret;
    let b64 = btoa(clientString);

    header = header.append('Authorization', `Basic ${b64}`);
    header = header.append('content-type', 'application/x-www-form-urlencoded');
    let body = `grant_type=authorization_code&redirect_uri=${this.redirectURL}&code=${this.code}`;
    let params = {
      headers: header,
    };
    return this.http.post(`${searchURL}`, body, params);
  }

  getSong(url: string) {
    let searchURL = url;
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get(`${searchURL}`, params);
  }

  getCurrentDevice() {
    let searchURL = 'https://api.spotify.com/v1/me/player/devices';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get(`${searchURL}`, params);
  }

  playSong(uri: string, deviceId: string) {
    let url = 'https://api.spotify.com/v1/me/player/play';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    let uriPlay = { uris: [uri] };
    return this.http.put(url, uriPlay, params);
  }
  playAlbum(uri: string, deviceId: string) {
    let url = 'https://api.spotify.com/v1/me/player/play';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    let uriPlay = { context_uri: uri };
    return this.http.put(`${url}?device_id=${deviceId}`, uriPlay, params);
  }

  pausePlayBack(device: any) {
    let url = 'https://api.spotify.com/v1/me/player/pause';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.put(`${url}?device_id=${device}`, params);
  }
  getUsersTopArtists(value: any): Observable<Artists> {
    let searchURL = 'https://api.spotify.com/v1/me/top/';
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get<Artists>(`${searchURL}${value}?limit=8`, params);
  }
  getUsersPlaylist(userName: string) {
    let searchURL = `https://api.spotify.com/v1/users/${userName}/playlists`;
    let header = new HttpHeaders();
    header = header.append('Authorization', `Bearer  ${this.token}`);
    let params = { headers: header };
    return this.http.get(`${searchURL}?limit=8`, params);
  }
}
