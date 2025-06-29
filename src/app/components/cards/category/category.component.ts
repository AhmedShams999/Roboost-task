import { Component, Input, OnInit } from '@angular/core';
import { ICategoryItem } from '../../../models/product/products';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category!:ICategoryItem;
  constructor() { }

  ngOnInit() {
  }

}
