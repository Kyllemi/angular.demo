import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should list products', () => {
    service.list().subscribe(data => expect(data.length).toBe(2));
    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 1, title: 'A', category: 'x', price: 10 },
      { id: 2, title: 'B', category: 'x', price: 20 },
    ]);
  });
});