import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleInstructionComponent } from './show-single-instruction.component';

describe('ShowSingleInstructionComponent', () => {
  let component: ShowSingleInstructionComponent;
  let fixture: ComponentFixture<ShowSingleInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSingleInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSingleInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
