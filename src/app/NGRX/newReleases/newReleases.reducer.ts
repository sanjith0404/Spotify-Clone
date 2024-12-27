import { createReducer, on } from '@ngrx/store';
import { getNewReleases, getNewReleasesSuccess } from './newReleases.actions';
import { NewReleases } from 'src/app/models/new-releases';

export const initialState: NewReleases = {
  albums: {
    href: '',
    items: [],
  },
};

export const NewReleasesReducer = createReducer(
  initialState,
  on(getNewReleases, (state) => {
    return state;
  }),

  on(getNewReleasesSuccess, (state, action) => {
    return {
      ...state,
      albums: action.newReleases.albums,
    };
  })
);
