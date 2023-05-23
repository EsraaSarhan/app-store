import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import * as _ from 'underscore';
import { ProductsService } from '../../services/products.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptComponent } from '../receipt/receipt.component';
import { StorageService } from 'src/app/shared/_services/storage.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IProduct } from '../../dataModels/product';
import { AddProductComponent } from '../add-product/add-product.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public selectedCategory: string = 'All Categories';
  public allCategories: any =  [];
  public allProducts: any = [];
  public pageNumber: number = 0;
  public pageSize: number = 50;
  public totalPrice: number = 0;
  public isLoggedIn: boolean = false;
  public role: string = '';
  public ELEMENT_DATA: IProduct[] = [];

  public loading: boolean = false;

  public displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];

  public dataSource = new MatTableDataSource<IProduct>(this.ELEMENT_DATA);
    dataToDisplay = [...this.ELEMENT_DATA];



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private productService: ProductsService, private modalService: NgbModal, private storageService: StorageService, private toastrService: ToastrService, private translate: TranslateService) {
    translate.setDefaultLang('en');

    this.getCategoriesList();
    this.getAllProducats(0);
   }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().Role;
        const user = this.storageService.getUser();
       this.translate.use(user.PreferedLanguage);
  
    }
    else{
        window.location.href = '/Login';
    }
  }

  getCategoriesList(){
    this.productService.getAllCategories().subscribe(
      res=>{
        console.log(res);
        this.allCategories = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  getAllProducats(id: number){
    this.loading = true;
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe(
      res=>{
        this.loading = false;
console.log(res)
        if(this.role === 'admin'){
          //this.ELEMENT_DATA = res;
          if(id > 0){
let index = _.findIndex(res, {id: id});
res = res.slice(index, -1)//_.without(res, {id: 1})

          }
          this.dataSource = res;
        }
        else if(this.role === 'user'){
          this.checkIfProductInCart(res);
        }
      },
      err=>{
        console.log(err)
      }
    )
  }

  filterByCategory(cat: string){
    this.loading = true;
    if(cat){
      this.productService.filterByCategory(cat).subscribe(
        res=>{
         this.checkIfProductInCart(res);
         this.loading = false;
        },
        err=>{
          console.log(err)
        }
      )
    }
    else{
      this.getAllProducats(0);
    }
  }

  checkIfProductInCart(products: any){
    products.forEach((element: {
      discountPercentage: number;
      price: number; isAddedToCart: boolean; id: any; 
}) => {
      element.isAddedToCart = false;
      let selectedProducts = this.productService.getUserCart();
      if(selectedProducts && selectedProducts.length>0){
        let isExist = _.findWhere(selectedProducts, {id: element.id});
        if(isExist){
          element.isAddedToCart = true;
          this.onCartUpdated();
        }
      }
    });
    this.allProducts =products;
  }
  getUserCart(){
    console.log(this.productService.getUserCart());
  }

  onCartUpdated(){
    this.totalPrice = 0;
    let userProducts = this.productService.getUserCart();
    userProducts.forEach((element: {
      discountPercentage: number; price: number; 
}) => {
      this.totalPrice +=  element.price;
    });
    console.log(this.productService.getUserCart(), "sa");
  }

  placeOrder(){
    const addModalRef = this.modalService.open(ReceiptComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.totalPrice = this.totalPrice;

  }

  addProduct(){
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });
  }

  editProduct(product: IProduct){
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.form = product;

    


  }

  deleteProduct (product: any){
   this.productService.deleteProduct(product.id).subscribe(
    res=>{
      this.toastrService.success("Product deleted successfully");
      this.getAllProducats(product.id)
//console.log(this.dataSource.slice(0,-1))
     // this.dataSource = _.without(this.dataSource, {id: product.id});
        }
   )

  }
}
