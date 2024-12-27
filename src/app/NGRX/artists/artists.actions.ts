import { createAction, props } from '@ngrx/store';
import { Artists } from 'src/app/models/artists';

export const getArtists = createAction(
  '[artists] get artists',
  props<{ value: string }>()
);

export const getArtistsSuccess = createAction(
  '[artists] get artists Success',
  props<{artists: Artists}>()
);
