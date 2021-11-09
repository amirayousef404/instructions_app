import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallinstructionsComponent } from './showallinstructions.component';

describe('ShowallinstructionsComponent', () => {
  let component: ShowallinstructionsComponent;
  let fixture: ComponentFixture<ShowallinstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallinstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
