import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TrackModalComponent } from 'src/app/Modals/track-modal/track-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userDetails: any;
  newReleases: any;
  fragment = '';
  params: any;
  accessToken = '';

  newAlbums: any = [];
  topArtist: any = [];
  topType: any = 'artists';
  tiles: any = [
    { text: 'One', cols: 1, rows: 6, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  dialog = inject(MatDialog);
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {
    this.fragment = window.location.hash.split('#')[1];
    this.params = new URLSearchParams(this.fragment);
    this.accessToken = this.params.get('access_token');
    window.sessionStorage.setItem('token', this.accessToken);
    this.getMyDetails();
    this.getNewreleases();
    this.getUsersTopArtists('artists');
  }

  getMyDetails() {
    this.spotifyService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;

      this.getUsersPlaylist(this.userDetails?.id);
    });
  }
  reload() {
    window.location.reload();
  }

  getNewreleases() {
    this.spotifyService.getNewReleases().subscribe((res) => {
      this.newReleases = res;
    });
  }
  getToken() {
    this.spotifyService.getToken().subscribe((res: any) => {
      console.log(res);
    });
  }
  getUsersPlaylist(userName: string) {
    this.spotifyService.getUsersPlaylist(userName).subscribe((res: any) => {
      this.topArtist = res.items;
    });
  }
  openDialog(album: any) {
    let songs: any = [];
    this.spotifyService
      .getNewAlbumsReleases(album.href)
      .subscribe((res: any) => {
        songs = res.tracks.items;
        this.dialog.open(TrackModalComponent, {
          data: {
            songs: songs,
            albumName: album.name,
            albumImages: res.images,
            fullAlbum: res,
          },
        });
      });
  }

  getUsersTopArtists(value: any) {
    if (value == 'playlists') {
    } else {
      this.topType = value;
      this.spotifyService.getUsersTopArtists(value).subscribe((res: any) => {
        this.topArtist = res.items;
      });
    }
  }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }
}
