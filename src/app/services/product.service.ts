import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router,) { }

    // Basic variables for HTTP requests. //

  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  serverUrl: string = `http://localhost:3000/product`;

  // CRUD methods for product-related HTTP requests.//

  get(id: number): Observable<Product> {
    return Number(id) === 0 ? of(new Product()) : this.http.get<Product>(`${this.serverUrl}/${Number(id)}`);
  }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Product[]>(this.serverUrl).subscribe(
      products => this.list$.next(products)
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.serverUrl}/${product.id}`,
      product
    ).pipe(
      tap(() => {
        this.toastr.info(`Product #${product.id}</br>${product.name}</br>has been updated.`, 'UPDATED');
      })
    );
  }

  create(product: Product): void {
    this.http.post<Product>(
      `${this.serverUrl}`,
      product
    ).subscribe(
      () => this.router.navigate(['product-list'])
    );
    this.toastr.success(`A new product</br>${product.name}</br>has been created.`, 'NEW PRODUCT');
  }

  remove(product: Product): void {
    this.http.delete<Product>(
      `${this.serverUrl}/${product.id}`
    ).subscribe(
      () => this.redirectTo('//product-list')
    );
    this.toastr.error(`Product #${product.id}</br>${product.name}</br>has been deleted.`, 'DELETED');
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}

// Base class for storing the sort order (ascending or descending) of columns. //

export class ColumnSortOrder {
  id = "ascending";
  name = "none";
  type = "none";
  catID: string = "none";
  description: string = "none";
  price: string = "none";
  stock: string = "none";
  featured: string = "none";
  active: string = "none";
}