import { TestBed } from '@angular/core/testing';

import { InstructionsInterceptor } from './instructions.interceptor';

describe('InstructionsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InstructionsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InstructionsInterceptor = TestBed.inject(InstructionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
