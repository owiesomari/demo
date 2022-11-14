import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdredetailsComponent } from './components/ordredetails/ordredetails.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: "", redirectTo: 'dashboard', pathMatch: "full" },
  { path: "products", component: ProductsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "orders", component: OrdersComponent },
  { path: "userProfile", component: UserProfileComponent },
  { path: "wallet", component: WalletComponent },
  { path: "cart", component: CartComponent },
  { path: "orderdeatils/:order_number", component: OrdredetailsComponent },
  { path: "orderConfirmation", component: OrderConfirmationComponent },
  { path: "adminorders", component: AdminOrdersComponent }


];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
