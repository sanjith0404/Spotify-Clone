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
  newAlbums: any = [];
  dialog = inject(MatDialog);
  constructor(private spotifyService: SpotifyAPIService) {}
  ngOnInit(): void {
    window.sessionStorage.setItem(
      'token',
      window.location.hash.substring(14, 230)
    );
    this.getMyDetails();
    this.getNewreleases();
  }

  getMyDetails() {
    this.spotifyService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
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
  openDialog(album: any) {
    let songs: any = [];
    this.spotifyService
      .getNewAlbumsReleases(album.href)
      .subscribe((res: any) => {
        console.log(res);
        songs = res.tracks.items;
        this.dialog.open(TrackModalComponent, {
          data: {
            songs: songs,
            albumName: album.name,
          },
        });
      });
  }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }
}
