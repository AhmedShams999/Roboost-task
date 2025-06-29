import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ILoginRes } from '../../models/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { LocalSwitcherService } from '../../services/localize/localSwitcher.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink]
})
export class HeaderComponent implements OnInit {
  currency = $localize`SAR`
  
  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
    private authService:AuthService,
    private router:Router,
    private cartService:CartService,
    private localizeSwitcher:LocalSwitcherService
  ) { }
  
   get authUser(): ILoginRes | null {
    return this.authService.user();
  }

  get cartItemCount(): number | null{
    return this.cartService.cartItems().length
  }

  get currencyValue():string | null{
    return this.cartService.cartTotal()
  }
  ngOnInit(): void {

    console.log(this.authUser);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
    // Implement search functionality here
  }

  onCurrencyChange() {
    // Implement currency change logic
    console.log('Currency changed');
  }

  onLanguageChange() {
    // Implement language change logic
    if(this.locale == 'ar'){
      this.localizeSwitcher.switchLocale('en-US');
    }else{
      this.localizeSwitcher.switchLocale('ar');
    }
    console.log('Language changed');
  }

  onLoginClick() {
    // Implement login logic
    this.router.navigate(['/login'])
  }
  onLogoClick(){
    this.router.navigate(['/'])
  }

  onCartClick() {
    // Implement cart logic
    console.log('Cart clicked');
  }

}
