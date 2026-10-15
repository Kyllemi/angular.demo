import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

export interface Product {
  id?: number;
  title: string;
  category: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';


  private items: Product[] | null = null;
  private nextId = 1000;

  list(): Observable<Product[]> {
    if (this.items) {
      return of([...this.items]);
    }
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(data => (this.items = data))
    );
  }

  get(id: number): Observable<Product> {
    const found = this.items?.find(p => p.id === id);
    if (found) {
      return of(found);
    }
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(p: Product): Observable<Product> {
    const created: Product = { ...p, id: this.nextId++ };
    this.items = [created, ...(this.items ?? [])];
  
    this.http.post<Product>(this.apiUrl, p).subscribe();
    return of(created);
  }

  update(id: number, p: Product): Observable<Product> {
    const updated: Product = { ...p, id };
    this.items = (this.items ?? []).map(x => (x.id === id ? updated : x));
    this.http.put<Product>(`${this.apiUrl}/${id}`, p).subscribe();
    return of(updated);
  }

  delete(id: number): Observable<unknown> {
    this.items = (this.items ?? []).filter(x => x.id !== id);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe();
    return of(null);
  }
}