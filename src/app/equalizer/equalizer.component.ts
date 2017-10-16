import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {

  minLength = 0;
  presetControl: FormControl = new FormControl();
  filteredPresets: any;
  selectedPreset: string = 'Flat'
  presets = [
    'Acoustic',
    'Bass Booster',
    'Bass Reducer',
    'Classical',
    'Dance',
    'Deep',
    'Electronic',
    'Flat',
    'Hip-Hop',
    'Jazz',
    'Latin',
    'Loudness',
    'Lounge',
    'Piano',
    'Pop',
    'R&B',
    'Rock',
    'Small Speakers',
    'Spoken Word',
    'Treble Booster',
    'Treble Reducer',
    'Vocal Booster'
  ];

  private presetEqSettings = {
    Acoustic: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    BassBooster: [3, 3, 4, 2, 4, 7, 8, 2, 1, 4],
    BassReducer: [3, 2, 4, 1, 6, 7, 6, 2, 1, 4],
    Classical: [3, 6, 4, 2, 6, 2, 8, 2, 1, 4],
    Dance: [3, 6, 4, 2, 6, 7, 8, 2, 1, 5],
    Deep: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Electronic: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Flat: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    HipHop: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Jazz: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Latin: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Loudness: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Lounge: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Piano: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Pop: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Randb: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    Rock: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    SmallSpeakers: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    SpokenWord: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    TrebleBooster: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    TrebleReducer: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4],
    VocalBooster: [3, 6, 4, 2, 6, 7, 8, 2, 1, 4]
  }
  private eqSliders = [
    {
      f: 32,
      type: 'lowshelf',
      value: 0
    }, {
      f: 64,
      type: 'peaking',
      value: 0
    }, {
      f: 125,
      type: 'peaking',
      value: 0
    }, {
      f: 250,
      type: 'peaking',
      value: 0
    }, {
      f: 500,
      type: 'peaking',
      value: 0
    }, {
      f: '1K',
      type: 'peaking',
      value: 0
    }, {
      f: '2K',
      type: 'peaking',
      value: 0
    }, {
      f: '4K',
      type: 'peaking',
      value: 0
    }, {
      f: '8K',
      type: 'peaking',
      value: 0
    }, {
      f: '16K',
      type: 'highshelf',
      value: 0
    }
  ];

  private autoTicks = false;
  private disabled = false;
  private invert = false;
  private max = 40;
  private min = -40;
  private showTicks = false;
  private step = 1;
  private thumbLabel = true;
  private vertical = true;


  constructor(public dialModalRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public filters: any, private thisDomElm: ElementRef) {
    this.filteredPresets = this.presetControl.valueChanges.startWith(null).map(name => this.filterPresets(name));
  }

  filterPresets(val: string) {
    if (val && val.length >= this.minLength) {
      return this.presets.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
    } else {
      return this.presets;
    }
  }

  setEqSliderValue() {
    this.eqSliders[0].value = this.filters.filters[0].gain.value;
    this.eqSliders[1].value = this.filters.filters[1].gain.value;
    this.eqSliders[2].value = this.filters.filters[2].gain.value
    this.eqSliders[3].value = this.filters.filters[3].gain.value
    this.eqSliders[4].value = this.filters.filters[4].gain.value
    this.eqSliders[5].value = this.filters.filters[5].gain.value
    this.eqSliders[6].value = this.filters.filters[6].gain.value
    this.eqSliders[7].value = this.filters.filters[7].gain.value
    this.eqSliders[8].value = this.filters.filters[8].gain.value
    this.eqSliders[9].value = this.filters.filters[9].gain.value
  }

  setEqPreset(selectedPreset) {
    let presetSetting;
    if (selectedPreset === 'BassBoost') {
      presetSetting = this.presetEqSettings.Acoustic;
    } else if (selectedPreset === 'Acoustic') {
      presetSetting = this.presetEqSettings.Acoustic;
    } else if (selectedPreset === 'Music') {
      presetSetting = this.presetEqSettings.BassBooster;
    } else if (selectedPreset === 'Movies') {
      presetSetting = this.presetEqSettings.BassReducer;
    } else if (selectedPreset === 'Relax') {
      presetSetting = this.presetEqSettings.Classical;
    } else if (selectedPreset === 'Random') {
      presetSetting = this.presetEqSettings.Dance;
    } else {
      presetSetting = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    this.eqSliders[0].value = this.filters.filters[0].gain.value = Number(presetSetting[0])
    this.eqSliders[1].value = this.filters.filters[1].gain.value = Number(presetSetting[1])
    this.eqSliders[2].value = this.filters.filters[2].gain.value = Number(presetSetting[2])
    this.eqSliders[3].value = this.filters.filters[3].gain.value = Number(presetSetting[3])
    this.eqSliders[4].value = this.filters.filters[4].gain.value = Number(presetSetting[4])
    this.eqSliders[5].value = this.filters.filters[5].gain.value = Number(presetSetting[5])
    this.eqSliders[6].value = this.filters.filters[6].gain.value = -Number(presetSetting[6])
    this.eqSliders[7].value = this.filters.filters[7].gain.value = Number(presetSetting[7])
    this.eqSliders[8].value = this.filters.filters[8].gain.value = Number(presetSetting[8])
    this.eqSliders[9].value = this.filters.filters[9].gain.value = Number(presetSetting[9])
  }




  updateEqBand($event) {

    let id = $event.source._elementRef.nativeElement.id;

    switch (id) {
      case '32':
        this.filters.filters[0].gain.value = $event.value
        break;
      case '64':
        this.filters.filters[1].gain.value = $event.value
        break;
      case '125':
        this.filters.filters[2].gain.value = $event.value
        break;
      case '250':
        this.filters.filters[3].gain.value = $event.value
        break;
      case '500':
        this.filters.filters[4].gain.value = $event.value
        break;
      case '1K':
        this.filters.filters[5].gain.value = $event.value
        break;
      case '2K':
        this.filters.filters[6].gain.value = $event.value
        break;
      case '4K':
        this.filters.filters[7].gain.value = $event.value
        break;
      case '8K':
        this.filters.filters[8].gain.value = $event.value
        break;
      case '16K':
        this.filters.filters[9].gain.value = $event.value
        break;
      default:

    }
    console.log(id)

  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  private _tickInterval = 1;


  ngOnInit() {
    this.setEqSliderValue();
    this.changePosition()
  }

  changePosition() {
    this.dialModalRef.updatePosition({ top: '150px', left: '50px' });
  }

}
