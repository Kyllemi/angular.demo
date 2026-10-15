import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});