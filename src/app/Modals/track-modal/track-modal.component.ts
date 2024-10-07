import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.scss'],
})
export class TrackModalComponent implements OnInit {
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  data = inject(MAT_DIALOG_DATA);
  songs: any = this.data.songs;

  openSong(song: any) {
    let deviceId = '';
    let songUri = '';
    this.spotifyService.getSong(song.href).subscribe((res: any) => {
      songUri = res.uri;
      this.spotifyService.getCurrentDevice().subscribe((response: any) => {
        deviceId = response.devices[0].id;
        this.spotifyService.playSong(songUri, deviceId).subscribe();
      });
    });
  }
}
