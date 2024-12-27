import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { getNewReleases, getNewReleasesSuccess } from './newReleases.actions';
import { map, mergeMap, catchError, of } from 'rxjs';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Injectable()
export class NewReleasesEffects {
  constructor(
    private actions$: Actions,
    private spotifyApiService: SpotifyAPIService
  ) {}

  newReleases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getNewReleases),
      mergeMap(() =>
        this.spotifyApiService
          .getNewReleases()
          .pipe(map((value) => getNewReleasesSuccess({ newReleases: value })))
      )
    )
  );
}
