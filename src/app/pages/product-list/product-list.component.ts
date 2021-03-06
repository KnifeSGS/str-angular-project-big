import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, CategoryAttributes } from 'app/model/category';
import { Product, ProductAttributes, ProductSummaryData } from 'app/model/product';
import { CategoryService } from 'app/services/category.service';
import { ColumnSortOrder, ProductService } from 'app/services/product.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.productService.getAll();
    this.updatingValues();
  }

  // For getting JSON data. //

  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  // Stores whether to display data or loading animation.//
  updating: boolean = true

  // Gets summary line data.

  updatingValues() {
    this.productList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
        this.getData(item);
      }
    })
  }

  productList: Product[] = [];
  productSummaryData = new ProductSummaryData();

  getData(products: Product[]): void {
    this.productList = products;
    for (let i = 0; i < this.productList.length; i++) {
      this.productSummaryData.totalProducts++
      this.productSummaryData.totalItems = this.productSummaryData.totalItems + this.productList[i].stock
      this.productSummaryData.totalValue = this.productSummaryData.totalValue + (this.productList[i].price * this.productList[i].stock)
      let category = Number(this.productList[i].catID) - 1
      this.productSummaryData.totalinCategories[category]++;
      if (this.productList[i].active) {
        this.productSummaryData.totalActive++
      }
      if (this.productList[i].featured) {
        this.productSummaryData.totalFeatured++
      }
    }

  }

  // Needed for the category info popover to function properly. //

  category = new Category();
  category$ = new Observable<Category>();
  categoryAttributes = new CategoryAttributes();

  getCategory(id: number) {
    this.category$ = this.categoryService.get(id)
    this.category$.forEach(item => this.category = item);
  }

  // Needed for storing the current product. //

  product = new Product();

  // Stores which product to delete, pops confirmation modal and runs button animnation. //

  setProducttoDelete(product: Product): void {
    this.animateDeleteIcon(product);
    this.product = product;
    $('#confirmationDialog').on('shown.bs.modal', function () {
      $('#cancelButton').trigger('focus')
    })
    $('#confirmationDialog').on('hidden.bs.modal', function () {
      let deleteIcon = document.querySelector(".fa-spinner");
      if (deleteIcon !== null) {
        deleteIcon.classList.remove("fa-spinner", "fa-pulse");
        deleteIcon.classList.add("fa-trash");
      }
    })
  }

  // Takes care of delete button animation. //

  animateDeleteIcon(product: Product): void {
    let buttonID = '' + product.id;
    let deleteIcon = document.getElementById(buttonID);
    deleteIcon.classList.remove("fa-trash");
    deleteIcon.classList.add("fa-spinner", "fa-pulse");
  }

  // Calls delete when the delete button is pushed. //
  onDelete(product: Product): void {
    this.productService.remove(product);
  }

  // For displaying understandable columns. //

  attributes = new ProductAttributes();

  // Filter- sorter functionality //


  phrase: string = '';
  filterKey = 'name';
  sorterKey: string = '';

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    if (this.filterKey === "featured" || this.filterKey === "active") {
      this.phrase = "";
      (<HTMLInputElement>document.getElementById("phrase")).value = "";
    }
    this.filterKey = (event.target as HTMLInputElement).value;
    if (this.filterKey === "featured" || this.filterKey === "active") { this.phrase = "true" }
  }

  setDefault(key): boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  // Displaying the small arrow when sorting //

  onColumnSelect(key: string): void {
    this.sorterKey = key;
    let clicked = true;

    if (this.sortOrder[key] === "none" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
  }

  erasesortDirections(): void {
    for (let key in this.sortOrder) {
      this.sortOrder[key] = "none";
    }
  }

  sortDirection = "none";

  sortOrder = new ColumnSortOrder();

  // Scrolls page to last line //

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView(false);
  }
}
