import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ILoginRes } from '../../models/auth/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink]
})
export class HeaderComponent implements OnInit {
  cartItemCount = 1;
  currency = $localize`SAR`
  currencyValue = '1,200';
  
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }
  
   get authUser(): ILoginRes | null {
    return this.authService.user();
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
