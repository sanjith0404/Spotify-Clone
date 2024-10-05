import { Component, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  searchInput: string = '';

  ngOnInit(): void {}
  constructor(private spotifyService: SpotifyAPIService) {}

  searchResults() {
    this.spotifyService
      .getSearchResults(this.searchInput)
      .subscribe((res: any) => {});
  }
}
