import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProductFormComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('form should be invalid when empty', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProductFormComponent);
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });
});