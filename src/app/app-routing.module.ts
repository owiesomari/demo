import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdredetailsComponent } from './components/ordredetails/ordredetails.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AddProductComponent } from './components/admin/products/add-product/add-product.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { EditProductComponent } from './components/admin/manage-products/editproduct/edit-product/edit-product.component';
import { LoginComponent } from './components/prelogin/login/login/login.component';
import { RegistrationComponent } from './components/prelogin/registration/registration/registration.component';
import { HomeComponent } from './components/prelogin/home/home/home.component';
import { ManageMarketersComponent } from './components/admin/marketers/manage/manage-marketers/manage-marketers.component';
import { MarketersDetailsComponent } from './components/admin/marketers/marketerDetails/marketers-details/marketers-details.component';
import { AdminWalletComponent } from './components/admin/wallet/admin-wallet/admin-wallet.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent, pathMatch: 'full' },
  { path: "registration", component: RegistrationComponent },
  { path: "products", component: ProductsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "orders", component: OrdersComponent },
  { path: "userProfile", component: UserProfileComponent },
  { path: "wallet", component: WalletComponent },
  { path: "cart", component: CartComponent },
  { path: "orderdeatils/:order_number", component: OrdredetailsComponent },
  { path: "orderConfirmation", component: OrderConfirmationComponent },
  { path: "adminorders", component: AdminOrdersComponent },
  { path: "addProduct", component: AddProductComponent },
  { path: "manageProducts", component: ManageProductsComponent },
  { path: "editProduct/:sku", component: EditProductComponent },
  { path: "marketers", component: ManageMarketersComponent }  ,
  { path: "marketerDetails", component: MarketersDetailsComponent } ,
  { path: "adminwallet", component: AdminWalletComponent }  

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
