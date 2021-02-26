import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { BillListComponent } from './pages/bill-list/bill-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { InfoCardComponent } from './common/info-card/info-card.component';
import { ChartComponent } from './common/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { EditProductComponent } from './editors/edit-product/edit-product.component';
import { EditCustomerComponent } from './editors/edit-customer/edit-customer.component';
import { EditOrderComponent } from './editors/edit-order/edit-order.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductListComponent,
    OrderListComponent,
    FilterPipe,
    SorterPipe,
    BillListComponent,
    CustomerListComponent,
    DashboardComponent,
    InfoCardComponent,
    EditOrderComponent,
    ChartComponent,
    EditProductComponent,
    //EditCustomerComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
