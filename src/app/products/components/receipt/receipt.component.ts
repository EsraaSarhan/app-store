import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import {ToastrService } from 'ngx-toastr'
import { IProduct } from '../../dataModels/product';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  public selectedItems: IProduct[] = [];
  public totalPrice: number = 0;
  constructor(public modal: NgbActiveModal, private productService: ProductsService,private toastr: ToastrService,
    ) { 
    this.getUserCart();
  }

  ngOnInit(): void {
  }

  getUserCart(){
    this.selectedItems = this.productService.getUserCart();
  }
  cancel(){
    this.modal.dismiss();
  }
  confirmOrder(){
    this.toastr.success("Your order placed successfully");

    this.selectedItems.forEach((element: IProduct) => {
      this.productService.updateCart(element, 'remove');
    });

    setTimeout(function(){
      window.location.href = "/shopping-cart";
    }, 1000);
  }
}
