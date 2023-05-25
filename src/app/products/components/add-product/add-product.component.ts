import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/_services/storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: any = {
    title: null,
    description: null,
    price: null,
    image: null,
    category: null,
    id: 0
  };

  public allCategories: any =  [];

  public inEditMode: boolean = false;
  loading:boolean = false;
  constructor(public modal: NgbActiveModal, private productService: ProductsService,private toastr: ToastrService, private storageService: StorageService
    ) { 
      this.getCategoriesList();
    }

  ngOnInit(): void {
   this.checkInEditMode();
  }

  checkInEditMode(){
    if(this.form.title){
      this.inEditMode = true;
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();

  }

  getCategoriesList(){
    this.productService.getAllCategories().subscribe(
      res=>{
        this.allCategories = res;
      },
      err=>{
        this.toastr.error("unable to get gategories")
      }
    )
  }
  cancel(){
    this.modal.dismiss();
  }

  saveProduct(){
    if(this.inEditMode){
      this.productService.updateProduct(this.form).subscribe(
        res=>{
          this.toastr.success("Product Updated successfully");
          this.cancel();
  
        },
        err=>{
          this.toastr.error("Unable to add product")
        }
      )
    }
    else{
      this.productService.addProduct(this.form).subscribe(
        res=>{
          this.toastr.success("Product added successfully");
          this.cancel();
        },
        err=>{
          this.toastr.error("Unable to add product");

        }
      )
    }
    
  }
}
