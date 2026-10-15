import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsListComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});