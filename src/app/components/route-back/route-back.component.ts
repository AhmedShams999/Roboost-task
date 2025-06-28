import { Location, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IrouteBack } from '../../models/routeBack/IrouteBack';


@Component({
  selector: 'app-route-back',
  templateUrl: './route-back.component.html',
  imports: [RouterLink,NgClass],
  styleUrls: ['./route-back.component.css']
})
export class RouteBackComponent implements OnInit {

  @Input() routesBack!:IrouteBack[];

  constructor(
    private location: Location,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log(this.router.url);
  }

    // Method to go back to previous page
  goBack(): void {
    this.location.back();
  }

  // Alternative method to navigate to a specific route
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
