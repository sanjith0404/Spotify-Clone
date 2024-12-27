import { createReducer, on } from '@ngrx/store';
import {
  getUserDetails,
  getUserDetailsSuccess,
  getUserDetailsFailure,
} from './userDetails.actions';
import { UserDetails } from 'src/app/models/user-details';

export const initialState: UserDetails = {
  display_name: '',
  external_urls: '',
  followers: '',
  href: '',
  id: '',
  images: [],
  userType: '',
  uri: '',
};

export const UserDetailsReducer = createReducer(
  initialState,
  on(getUserDetails, (state) => {
    return state;
  }),
  on(getUserDetailsSuccess, (state, { userDetails }) => ({
    ...state,
    display_name: userDetails.display_name,
    external_urls: userDetails.external_urls,
    followers: userDetails.followers,
    href: userDetails.href,
    id: userDetails.id,
    images: userDetails.images,
    userType: userDetails.userType,
    uri: userDetails.uri,
  })),
  on(getUserDetailsFailure, (state, { error }) => {
    console.log(error);
    return state;
  })
);
