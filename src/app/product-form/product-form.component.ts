import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  template: `
    <h2>{{ id ? 'Редагування товару' : 'Новий товар' }}</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="field">
        <label for="title">Назва</label>
        <input id="title" formControlName="title" placeholder="Введіть назву товару" />
        @if (form.controls.title.touched && form.controls.title.invalid) {
          <small style="color:red">Назва обов'язкова</small>
        }
      </div>

      <div class="field">
        <label for="price">Ціна ($)</label>
        <input id="price" formControlName="price" type="number" placeholder="Введіть ціну" />
        @if (form.controls.price.touched && form.controls.price.invalid) {
          <small style="color:red">Ціна має бути від 1</small>
        }
      </div>

      <div class="field">
        <label for="category">Категорія</label>
        <select id="category" formControlName="category">
          <option value="" disabled>Оберіть категорію</option>
          @for (c of categories; track c) {
            <option [value]="c">{{ c }}</option>
          }
        </select>
        @if (form.controls.category.touched && form.controls.category.invalid) {
          <small style="color:red">Оберіть категорію</small>
        }
      </div>

      <button type="submit" [disabled]="form.invalid">Save</button>
    </form>
  `,
  styles: `
    .field { margin-bottom: 14px; }
    label { display: block; font-weight: bold; margin-bottom: 4px; }
    input, select { width: 100%; max-width: 320px; box-sizing: border-box; }
    small { display: block; }
  `,
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: number | null = null;

  categories = [
    "men's clothing",
    "women's clothing",
    'jewelery',
    'electronics',
  ];

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.service.get(this.id).subscribe(p => this.form.patchValue(p));
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const request = this.id
      ? this.service.update(this.id, value)
      : this.service.create(value);
    request.subscribe(() => this.router.navigate(['/products']));
  }
}