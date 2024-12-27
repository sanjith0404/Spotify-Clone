import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as userDetailsActions from './userDetails.actions';
import { map, mergeMap, catchError, of } from 'rxjs';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Injectable()
export class UserDetailEffects {
  constructor(
    private actions$: Actions,
    private spotifyApiService: SpotifyAPIService
  ) {}

  userDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDetailsActions.getUserDetails),
      mergeMap(() =>
        this.spotifyApiService.getUserDetails().pipe(
          map((value) =>
            userDetailsActions.getUserDetailsSuccess({ userDetails: value })
          ),
          catchError((error) =>
            of(userDetailsActions.getUserDetailsFailure({ error }))
          )
        )
      )
    )
  );
}
