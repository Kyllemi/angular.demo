import { TestBed } from '@angular/core/testing';
import { ProductStatsComponent } from './product-stats.component';

describe('ProductStatsComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStatsComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(ProductStatsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});