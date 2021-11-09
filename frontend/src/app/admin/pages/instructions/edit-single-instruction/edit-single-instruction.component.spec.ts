import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleInstructionComponent } from './edit-single-instruction.component';

describe('EditSingleInstructionComponent', () => {
  let component: EditSingleInstructionComponent;
  let fixture: ComponentFixture<EditSingleInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleInstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
