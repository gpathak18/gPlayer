import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
// import { AppComponent } from './body/app.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule,MatListModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MatTabsModule,MatGridListModule,MatInputModule,MdTableModule } from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FooterComponent } from './footer/footer.component';
import { CellHoverDirective } from './player-body/cell-hover.directive';
import { MainComponent } from './main/main.component';
import { PlayerComponent } from './player/player.component';
import { PlayerBodyComponent } from './player-body/player-body.component';
//import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CellHoverDirective,
    MainComponent,
    PlayerComponent,
    PlayerBodyComponent
    ],
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
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
