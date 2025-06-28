import { Component, OnInit } from '@angular/core';
import { AdsComponent } from '../../cards/ads/ads.component';

@Component({
  selector: 'app-ads-section',
  templateUrl: './ads-section.component.html',
  styleUrls: ['./ads-section.component.css'],
  imports:[AdsComponent]
})
export class AdsSectionComponent implements OnInit {
  adsData=[
    {
      img:'/images/img/ads-img1.png',
      header: $localize`:@@ads.title:Faster and richer processing`,
      subText: $localize`:@@ads.subtitle:Faster than EXPEED 4, EXPEED 5 processes 45.7 MP of data to reduce noise`,
      color:'#E0F6F0'
    },
    {
      img:'/images/img/ads-img2.png',
      header:$localize`:@@ads.title:Faster and richer processing`,
      subText:$localize`:@@ads.subtitle:Faster than EXPEED 4, EXPEED 5 processes 45.7 MP of data to reduce noise`,
      color:'#FFEFDA'
    },
    {
      img:'/images/img/ads-img3.png',
      header:$localize`:@@ads.title:Faster and richer processing`,
      subText:$localize`:@@ads.subtitle:Faster than EXPEED 4, EXPEED 5 processes 45.7 MP of data to reduce noise`,
      color:'#FDDCDD'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
