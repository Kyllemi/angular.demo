import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductsService } from '../products.service';
import { ProductStatsComponent } from '../product-stats/product-stats.component';


@Component({
  selector: 'app-products-list',
  imports: [RouterLink, ProductStatsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  private service = inject(ProductsService);

  products = signal<Product[]>([]);
  selectedCategory = signal('');
  page = signal(1);
  loading = signal(true);
  pageSize = 5;

  categories = computed(() => [...new Set(this.products().map(p => p.category))]);

  filtered = computed(() => {
    const cat = this.selectedCategory();
    return cat ? this.products().filter(p => p.category === cat) : this.products();
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  pageItems = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  ngOnInit() {
    this.service.list().subscribe(data => {
      this.products.set(data);
      this.loading.set(false);
    });
  }

  onCategoryChange(value: string) {
    this.selectedCategory.set(value);
    this.page.set(1);
  }
  prev() { this.page.update(p => p - 1); }
  next() { this.page.update(p => p + 1); }
}