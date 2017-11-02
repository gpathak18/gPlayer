import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WaveSurfer } from 'wavesurfer.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainComponent } from './main/main.component';
import { PlayerComponent } from './player/player.component';
import { PlayerBodyHeaderComponent } from './player-body-header/player-body-header.component';
import { PlayerBodyFooterComponent } from './player-body-footer/player-body-footer.component';
import { PlayerBodyMainComponent } from './player-body-main/player-body-main.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EqualizerComponent } from './equalizer/equalizer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlayerBodyPlaylistsComponent } from './player-body-playlists/player-body-playlists.component';
import {
  MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,
  MatIconModule, MatTabsModule, MatGridListModule, MatInputModule, MatTableModule, MatDialogModule,
  MatProgressBarModule, MatSliderModule, MatAutocompleteModule, MatFormFieldModule, MatButtonToggleModule,
  MatSnackBarModule,
  MatExpansionModule
} from '@angular/material';
import { DragndropDirective } from './directives/dragndrop.directive';
import { CellHoverDirective } from './directives/cell-hover.directive';
import { PouchDbService } from './services/pouch-db.service';
import { DatastoreService } from './services/datastore.service';
import { PlayerService } from './services/player.service';
import { AutoplayService } from './services/autoplay.service';
import { PlaylistService } from './services/playlist.service';
import { FilehandlingService } from './services/filehandling.service';

const appRoutes: Routes = [
  { path: 'sign', component: SigninComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    CellHoverDirective,
    MainComponent,
    PlayerComponent,
    PlayerBodyHeaderComponent,
    PlayerBodyFooterComponent,
    PlayerBodyMainComponent,
    SigninComponent,
    ErrorComponent,
    EqualizerComponent,
    PlayerBodyPlaylistsComponent,
    DragndropDirective
   ],
  entryComponents: [SigninComponent, EqualizerComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // ,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  providers: [
    PouchDbService, 
    DatastoreService, 
    PlayerService, 
    PlaylistService, 
    AutoplayService,
    FilehandlingService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
