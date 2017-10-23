var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/do';
var OrderComponent = (function () {
    function OrderComponent(orderService, router, formBiulder) {
        this.orderService = orderService;
        this.router = router;
        this.formBiulder = formBiulder;
        this.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.numberPattern = /^[0-9]*$/;
        this.paymentOptions = [
            { label: 'Dinheiro', value: 'MON' },
            { label: 'Cartão de Débito', value: 'DEB' },
            { label: 'Cartão de Alimentação', value: 'REF' }
        ];
        this.delivery = 8;
    }
    OrderComponent_1 = OrderComponent;
    OrderComponent.prototype.ngOnInit = function () {
        this.orderForm = this.formBiulder.group({
            name: this.formBiulder.control('', [Validators.required, Validators.minLength(5)]),
            email: this.formBiulder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            emailConfirmation: this.formBiulder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            address: this.formBiulder.control('', [Validators.required, Validators.minLength(5)]),
            number: this.formBiulder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
            optionalAdress: this.formBiulder.control(''),
            paymentOption: this.formBiulder.control('', [Validators.required])
        }, { validator: OrderComponent_1.equalsTo });
    };
    OrderComponent.equalsTo = function (group) {
        var email = group.get('email');
        var emailConfirmation = group.get('emailConfirmation');
        if (!email || !emailConfirmation) {
            return undefined;
        }
        if (email.value !== emailConfirmation.value) {
            return { emailsNotMatch: true };
        }
        return undefined;
    };
    OrderComponent.prototype.itemsValue = function () {
        return this.orderService.itemsValue();
    };
    OrderComponent.prototype.cartItems = function () {
        return this.orderService.cartItems();
    };
    OrderComponent.prototype.increaseQty = function (item) {
        this.orderService.increaseQty(item);
    };
    OrderComponent.prototype.decreaseQty = function (item) {
        this.orderService.decreaseQty(item);
    };
    OrderComponent.prototype.remove = function (item) {
        this.orderService.remove(item);
    };
    OrderComponent.prototype.isOrderCompleted = function () {
        return this.orderId !== undefined;
    };
    OrderComponent.prototype.checkOrder = function (order) {
        var _this = this;
        order.orderItems = this.cartItems().map(function (item) { return new OrderItem(item.quantity, item.menuItem.id); });
        this.orderService.checkOrder(order)
            .do(function (orderId) {
            _this.orderId = orderId;
        })
            .subscribe(function (orderId) {
            _this.router.navigate(['/order-summary']);
            console.log("Compra conclu\u00EDda: " + orderId);
            _this.orderService.clear();
        });
        console.log(order);
    };
    OrderComponent = OrderComponent_1 = __decorate([
        Component({
            selector: 'mt-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.css']
        }),
        __metadata("design:paramtypes", [OrderService,
            Router,
            FormBuilder])
    ], OrderComponent);
    return OrderComponent;
    var OrderComponent_1;
}());
export { OrderComponent };
//# sourceMappingURL=order.component.js.map