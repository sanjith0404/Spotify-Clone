import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TrackModalComponent } from 'src/app/Modals/track-modal/track-modal.component';
import { Store, select } from '@ngrx/store';
import { UserDetails } from 'src/app/models/user-details';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Artists } from 'src/app/models/artists';
import { getArtists } from 'src/app/NGRX/artists/artists.actions';
import { getUserDetails } from 'src/app/NGRX/userDetails/userDetails.actions';
import { getNewReleases } from 'src/app/NGRX/newReleases/newReleases.actions';
import { NewReleases } from 'src/app/models/new-releases';

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
  constructor(
    private spotifyService: SpotifyAPIService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.fragment = window.location.href.split('?')[1];
    this.params = new URLSearchParams(this.fragment);
    this.accessToken = this.params.get('code');
    this.spotifyService.code = this.accessToken;
    this.getToken();
    this.getMyDetails();
    this.getNewreleases();
    this.getUsersTopArtists('artists');
  }

  getMyDetails() {
    this.store.dispatch(getUserDetails());
    this.store.select('userDetails').subscribe((userDetails: UserDetails) => {
      this.userDetails = userDetails;
    });
  }
  reload() {
    window.location.reload();
  }

  getNewreleases() {
    this.store.dispatch(getNewReleases());
    this.store.select('newReleases').subscribe((newReleases: NewReleases) => {
      this.newReleases = newReleases;
    });
  }
  getToken() {
    this.spotifyService.getToken().subscribe((res: any) => {
      window.localStorage.setItem('token', res.access_token);
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
      this.store.dispatch(getArtists({ value: value }));
      this.store.select('artists').subscribe((value: Artists) => {
        this.topArtist = value.items;
      });
    }
  }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }
}
