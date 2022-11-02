import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
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
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [CatalogService, OrderdetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
