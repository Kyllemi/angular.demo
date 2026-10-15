import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  template: `
    @if (loading()) { <p>Loading...</p> }
    @if (error()) { <p style="color:red">{{ error() }}</p> }
    @if (product(); as p) {
      <h3>{{ p.title }}</h3>
      <p>Категорія: {{ p.category }}</p>
      <p>Ціна: {{ p.price }}$</p>
      <a [routerLink]="['/products', p.id, 'edit']">Редагувати</a>
      <button (click)="remove()">Видалити</button>
    }
    <p><a routerLink="/products">← До списку</a></p>
  `,
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductsService);

  product = signal<Product | null>(null);
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.service.get(id).subscribe({
      next: data => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load');
        this.loading.set(false);
      },
    });
  }

  remove() {
    const id = this.product()?.id;
    if (id == null) return;
    this.service.delete(id).subscribe(() => this.router.navigate(['/products']));
  }
}