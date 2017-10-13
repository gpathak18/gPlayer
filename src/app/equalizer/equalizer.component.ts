import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {

  constructor(public dialModalRef: MdDialogRef<any>) { }

  ngOnInit() {
  }

  changePosition() {
    this.dialModalRef.updatePosition({ top: '50px', left: '50px' });
  }

}
