import { Component, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clientID = '42212e1a5b85482494ecbbc3ca8579eb';
  authURL = 'https://accounts.spotify.com/api/token';
  clientSecret = '207bab8ddca1403a80eff236e0141291';
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {
    window.sessionStorage.setItem(
      'token',
      window.location.hash.substring(14, 221)
    );
  }

  getMyDetails() {
    this.spotifyService.getUserDetails().subscribe((res: any) => {
      console.log(res);
    });
  }
}
