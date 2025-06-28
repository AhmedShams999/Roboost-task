import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  imports:[NgStyle]
})
export class LoadingComponent implements OnInit {
  @Input() dotColor:string|null=null;
  constructor() { }

  ngOnInit() {
  }

}
