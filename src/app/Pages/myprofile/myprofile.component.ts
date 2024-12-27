import { Component, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {}
}
