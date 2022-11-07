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
    OrdredetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [CatalogService, OrderdetailsService, OrdersService, ProductService, CartService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
