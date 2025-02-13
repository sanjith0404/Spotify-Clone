import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { TopNavComponent } from './Components/top-nav/top-nav.component';
import { SongCardComponent } from './Components/song-card/song-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Angular Materials

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/login/login.component';
import { MyprofileComponent } from './Pages/myprofile/myprofile.component';
import { MatCardModule } from '@angular/material/card';
import { TrackModalComponent } from './Modals/track-modal/track-modal.component';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { AppState } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { UserDetailsReducer } from './NGRX/userDetails/userDetails.reducer';
import { ArtistEffects } from './NGRX/artists/artists.effects';
import { ArtistsReducer } from './NGRX/artists/artists.reducer';
import { UserDetailEffects } from './NGRX/userDetails/userDetails.effects';
import { NewReleasesReducer } from './NGRX/newReleases/newReleases.reducer';
import { NewReleasesEffects } from './NGRX/newReleases/newReleases.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    SongCardComponent,
    SideNavComponent,
    LoginComponent,
    MyprofileComponent,
    TrackModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSelectModule,
    StoreModule.forRoot<AppState>({
      userDetails: UserDetailsReducer,
      artists: ArtistsReducer,
      newReleases: NewReleasesReducer,
    }),
    EffectsModule.forRoot([
      UserDetailEffects,
      ArtistEffects,
      NewReleasesEffects,
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
