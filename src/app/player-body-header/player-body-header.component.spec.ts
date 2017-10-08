import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyHeaderComponent } from './player-body-header.component';

describe('PlayerBodyHeaderComponent', () => {
  let component: PlayerBodyHeaderComponent;
  let fixture: ComponentFixture<PlayerBodyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
