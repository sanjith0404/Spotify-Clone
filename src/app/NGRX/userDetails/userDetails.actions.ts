import { createAction, props } from '@ngrx/store';
import { UserDetails } from 'src/app/models/user-details';

export const getUserDetails = createAction('[userDetails] Get User Details');

export const getUserDetailsSuccess = createAction(
  '[userDetails] Success',
  props<{ userDetails: UserDetails }>()
);

export const getUserDetailsFailure = createAction(
  '[userDetails] Failure',
  props<{ error: any }>()
);
