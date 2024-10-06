import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userDetails: any;
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {
    window.sessionStorage.setItem(
      'token',
      window.location.hash.substring(14, 221)
    );
    this.getMyDetails();
  }

  getMyDetails() {
    this.spotifyService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    });
  }
  reload() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }
}
