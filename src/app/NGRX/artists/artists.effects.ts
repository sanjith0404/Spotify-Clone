import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, exhaustMap, EMPTY } from 'rxjs';
import { getArtists, getArtistsSuccess } from './artists.actions';
import { Injectable } from '@angular/core';
import { SpotifyAPIService } from 'src/app/Services/Spotify/spotify-api.service';

@Injectable()
export class ArtistEffects {
  constructor(
    private actions$: Actions,
    private spotifyApiService: SpotifyAPIService
  ) {}

  userDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArtists),
      exhaustMap((action) => {
        return this.spotifyApiService.getUsersTopArtists(action.value).pipe(
          map((data) => {
            return getArtistsSuccess({ artists: data });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
