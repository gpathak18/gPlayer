import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { AppComponent } from './body/app.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MatTabsModule,MatGridListModule,MatInputModule,MdTableModule } from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FooterComponent } from './footer/footer.component';
//import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent,FooterComponent]
})
export class AppModule { }
