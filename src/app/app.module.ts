import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule, MatListModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule,
  MdIconModule, MatTabsModule, MatGridListModule, MatInputModule, MdTableModule, MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MainComponent } from './main/main.component';
import { PlayerComponent } from './player/player.component';
import { PlayerBodyHeaderComponent } from './player-body-header/player-body-header.component';
import { PlayerBodyFooterComponent } from './player-body-footer/player-body-footer.component';
import { PlayerBodyMainComponent } from './player-body-main/player-body-main.component';
import { CellHoverDirective } from './player-body-main/cell-hover.directive';
import { PouchDbService } from './pouch-db.service';
import { DatastoreService } from './datastore.service';
import { PlayerService } from './player.service';
import { SigninComponent } from './signin/signin.component';
//import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    CellHoverDirective,
    MainComponent,
    PlayerComponent,
    PlayerBodyHeaderComponent,
    PlayerBodyFooterComponent,
    PlayerBodyMainComponent,
    SigninComponent
  ],
  entryComponents: [SigninComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MatTabsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatInputModule,
    MdTableModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule
  ],
  providers: [PouchDbService, DatastoreService, PlayerService, PlayerComponent],
  bootstrap: [MainComponent]
})
export class AppModule { }
