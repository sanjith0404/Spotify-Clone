import { createReducer, on } from '@ngrx/store';
import { getArtists, getArtistsSuccess } from './artists.actions';
import { Artists } from 'src/app/models/artists';

export const initialState: Artists = {
  items: [],
};

export const ArtistsReducer = createReducer(
  initialState,
  on(getArtists, (state) => {
    return state;
  }),

  on(getArtistsSuccess, (state, action) => {
    return {
      ...state,
      items: action.artists.items,
    };
  })
);
