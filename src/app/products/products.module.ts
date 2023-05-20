import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PriceReducedPipe } from './pipes/price-reduced.pipe';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ReceiptComponent,
    PriceReducedPipe,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule  ]
})
export class ProductsModule { }
