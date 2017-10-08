import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyMainComponent } from './player-body-main.component';

describe('PlayerBodyMainComponent', () => {
  let component: PlayerBodyMainComponent;
  let fixture: ComponentFixture<PlayerBodyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
