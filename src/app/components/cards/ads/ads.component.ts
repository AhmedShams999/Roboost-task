import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  imports:[NgStyle]
})
export class AdsComponent implements OnInit {
  @Input()  adsData:any;

  constructor() { }

  ngOnInit() {
  }

}
