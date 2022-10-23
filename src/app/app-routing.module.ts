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


const routes: Routes = [
  {path: "", redirectTo:'dashboard', pathMatch: "full"},
  {path: "products", component:ProductsComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "catalog", component: CatalogComponent},
  {path: "orders", component: OrdersComponent},
  {path: "userProfile", component: UserProfileComponent},
  {path: "wallet", component: WalletComponent},
  {path: "cart", component: CartComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
