import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProductListComponent } from 'app/pages/product-list/product-list.component';
import { OrderListComponent } from 'app/pages/order-list/order-list.component';
import { BillListComponent } from 'app/pages/bill-list/bill-list.component';
import { CustomerListComponent } from 'app/pages/customer-list/customer-list.component';
import { EditCustomerComponent } from 'app/editors/edit-customer/edit-customer.component';
import { EditOrderComponent } from 'app/editors/edit-order/edit-order.component';
import { CategroyListComponent } from 'app/pages/categroy-list/categroy-list.component';
import { EditCategoryComponent } from 'app/editors/edit-category/edit-category.component';
import { AboutUsComponent } from 'app/pages/about-us/about-us.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: 'order/:id', component: EditOrderComponent },
    { path: 'bill-list', component: BillListComponent },
    { path: 'customer-list', component: CustomerListComponent },
    { path: 'customer/:id', component: EditCustomerComponent },
    { path: 'category-list', component: CategroyListComponent },
    { path: 'category/:id', component: EditCategoryComponent },
    { path: 'about', component: AboutUsComponent },
];
