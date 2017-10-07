import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyComponent } from './player-body.component';

describe('PlayerBodyComponent', () => {
  let component: PlayerBodyComponent;
  let fixture: ComponentFixture<PlayerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
