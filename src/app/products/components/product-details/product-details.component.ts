import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../dataModels/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() item: IProduct = {title: '', price: 0, category: '',description: '', image: '', id: 0};
  @Output() cartUpdated = new EventEmitter<any>();

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  addToCard(){
    this.item.isAddedToCart = true;
    this.productService.updateCart(this.item, "add");
    this.cartUpdated.emit(this.item);

  }

  removeFromCard(){
    this.item.isAddedToCart = false;
    this.productService.updateCart(this.item, "remove");
    this.cartUpdated.emit(this.item);
  }
}
