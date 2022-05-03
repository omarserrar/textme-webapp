import { TestBed } from '@angular/core/testing';

import { AuthHTTPInterceptorInterceptor } from './auth-httpinterceptor.interceptor';

describe('AuthHTTPInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthHTTPInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthHTTPInterceptorInterceptor = TestBed.inject(AuthHTTPInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
