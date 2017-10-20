import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MenuItemModel} from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItemModel;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  emitAddEvent() {
    this.add.emit(this.menuItem);
  }

}
