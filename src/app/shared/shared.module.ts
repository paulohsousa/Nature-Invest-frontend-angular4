import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { InputComponent } from './input/input.component';
import { RadioComponent} from './radio/radio.component';
import { RatingComponent} from './rating/rating.component';
import {ShoppingCartService} from '../restaurante-detail/shopping-cart/shopping-cart.service';
import {RestaurantesService} from '../restaurantes/restaurantes.service';
import {OrderService} from '../order/order.service';


@NgModule({
  declarations: [ InputComponent, RadioComponent, RatingComponent],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  exports: [InputComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule]
})

export class SharedModule {
  static  forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ShoppingCartService, RestaurantesService, OrderService]
    };
  }
}
