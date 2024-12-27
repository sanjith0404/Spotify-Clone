import { Artists } from './models/artists';
import { NewReleases } from './models/new-releases';
import { UserDetails } from './models/user-details';

export interface AppState {
  readonly userDetails: UserDetails;
  readonly artists: Artists;
  readonly newReleases: NewReleases;
}
