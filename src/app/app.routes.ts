import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/Home/Home.component';
import { LoginComponent } from './pages/Login/Login.component';
import { RegisterComponent } from './pages/Register/Register.component';
import { ProductDetailsComponent } from './pages/Product-details/Product-details.component';
import { GuardService } from './services/auth/guard.service';
import { ProductListComponent } from './pages/Product-list/Product-list.component';
import { CartComponent } from './pages/Cart/Cart.component';

export const routes: Routes = [
 {
    path: '',
    component: HomeComponent,
    title: "Home",
    canActivate: [GuardService]
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
    title: "Product Details",
    canActivate: [GuardService]
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: "Products list",
    canActivate: [GuardService]
  },
  {
    path: 'cart',
    component: CartComponent,
    title: "Cart",
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login"
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: "Register"
  },
  { path: '**', redirectTo: '' }, // WildCard
];
