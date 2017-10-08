import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBodyFooterComponent } from './player-body-footer.component';

describe('PlayerBodyFooterComponent', () => {
  let component: PlayerBodyFooterComponent;
  let fixture: ComponentFixture<PlayerBodyFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBodyFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBodyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
