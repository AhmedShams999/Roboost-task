import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Roboost-Task';

  currentLocale: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private router: Router
  ) {
    this.currentLocale = locale;
  }

  switchLanguage(locale: string) {
    // Redirect to the same route with the new locale prefix
    console.log(locale);
    const currentUrl = this.router.url.split('/').slice(2).join('/'); // Remove current locale prefix
    window.location.href = `/${locale}/${currentUrl || ''}`; // Force full page reload
  }
}
