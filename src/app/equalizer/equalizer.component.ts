import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = true;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  
  private _tickInterval = 1;

  constructor(public dialModalRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any, private thisDomElm: ElementRef) { }

  ngOnInit() {
    this.changePosition()
  }

  changePosition() {
    this.dialModalRef.updatePosition({ top: '200px', left: '50px' });
  }

}
