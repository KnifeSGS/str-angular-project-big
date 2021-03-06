import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/model/category';
import { Product, ProductAttributes } from 'app/model/product';
import { CategoryService } from 'app/services/category.service';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,) { }

  // This is needed to get Category data for the form. //

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  // Needed to prevent the user from repeatedly clicking the Save button. //

  clicked: boolean = false;

  // For displaying understandable attributes names. //

  attributes = new ProductAttributes();

  // Editing: getting the product ID which should be edited //

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.productService.get(params.id))
  );

  // Runs when updated/created product is submitted. //

  onUpdate(form: NgForm, product: Product): void {
    // Prevents repeated clicking.//
    this.clicked = true;
    // Animates button. //
    this.animateSaveIcon();
    // Calls create or update method, depending on user choice.//
    if (product.id === 0) {
      this.productService.create(product);
    } else {
      this.productService.update(product).subscribe(
        ev => this.router.navigate(['product-list'])
      );
    }
  }

  // Takes care of button animation at save. //

  animateSaveIcon(): void {
    let saveIcon = document.getElementById("saveicon");
    saveIcon.classList.remove("fa-save");
    saveIcon.classList.add("fa-spinner", "fa-pulse");
  }
}
