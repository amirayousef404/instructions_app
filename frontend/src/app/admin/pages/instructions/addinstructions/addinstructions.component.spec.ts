import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinstructionsComponent } from './addinstructions.component';

describe('AddinstructionsComponent', () => {
  let component: AddinstructionsComponent;
  let fixture: ComponentFixture<AddinstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
