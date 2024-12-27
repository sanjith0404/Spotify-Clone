import { createAction, props } from '@ngrx/store';
import { NewReleases } from 'src/app/models/new-releases';

export const getNewReleases = createAction('[new Releases] get new Releases');

export const getNewReleasesSuccess = createAction(
  '[new Release] get New Releases Success',
  props<{ newReleases: NewReleases }>()
);
