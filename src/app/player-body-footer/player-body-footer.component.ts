import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-player-body-footer',
  templateUrl: './player-body-footer.component.html',
  styleUrls: ['./player-body-footer.component.css']
})
export class PlayerBodyFooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(SigninComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

}

