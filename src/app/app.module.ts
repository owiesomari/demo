import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdredetailsComponent } from './components/ordredetails/ordredetails.component';
import { CatalogService } from './services/catalog.service';
import { OrderdetailsService } from './services/orderdetails/orderdetails.service';
import { OrdersService } from './services/orders/orders.service';
import { ProductService } from './services/producrs/product.service';
import { CartService } from './services/cart/cart.service';
import { UserService } from './services/user/user.service';
import { DashboardService } from './services/dashboard.service';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminOrderService } from './services/admin/order/admin-order.service';
import { AddProductComponent } from './components/admin/products/add-product/add-product.component';
import { AdminProductService } from './services/admin/product/admin-product.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { MaterialModule } from './material-module';
import { ManageProductsService } from './services/admin/manageproducts/manage-products.service';
import { EditProductService } from './services/admin/editProduct/edit-product.service';
import { LoginComponent } from './components/prelogin/login/login/login.component';
import { RegistrationComponent } from './components/prelogin/registration/registration/registration.component';
import { NavbarComponent } from './components/prelogin/navbar/navbar/navbar.component';
import { ManageMarketersComponent } from './components/admin/marketers/manage/manage-marketers/manage-marketers.component';
import { MarketersServiceService } from './services/admin/marketer/marketers-service.service';
import { MarketersDetailsComponent } from './components/admin/marketers/marketerDetails/marketers-details/marketers-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    CatalogComponent,
    ProductsComponent,
    OrdersComponent,
    UserProfileComponent,
    WalletComponent,
    CartComponent,
    OrdredetailsComponent,
    OrderConfirmationComponent,
    AdminOrdersComponent,
    AddProductComponent,
    ManageProductsComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    ManageMarketersComponent,
    MarketersDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MaterialModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CatalogService, OrderdetailsService, OrdersService, ProductService, CartService, UserService, DashboardService, AdminOrderService, AdminProductService, ManageProductsService, EditProductService, MarketersServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }