import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInstructionsUserComponent } from './show-instructions-user.component';

describe('ShowInstructionsUserComponent', () => {
  let component: ShowInstructionsUserComponent;
  let fixture: ComponentFixture<ShowInstructionsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInstructionsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInstructionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
