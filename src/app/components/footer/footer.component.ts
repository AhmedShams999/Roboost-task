import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor() { }

  onSocialClick(platform: string) {
    console.log(`${platform} clicked`);
    // Implement social media navigation
  }

  onLinkClick(link: string) {
    console.log(`${link} clicked`);
    // Implement internal navigation
  }

}
